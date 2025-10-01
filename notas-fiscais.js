/**
 * =================================================================
 * MÓDULO DE DADOS E RENDERIZAÇÃO DA ABA NOTA FISCAL
 * =================================================================
 * Este arquivo centraliza toda a lógica para a aba "Nota Fiscal".
 * Ele é responsável por:
 * 1. Buscar os dados das planilhas de Estoque e Movimentações.
 * 2. Processar e agrupar os dados por Nota Fiscal com cálculos corretos.
 * 3. Renderizar a lista de NFs e os detalhes (tabelas, gráficos) no HTML.
 *
 * Para editar, altere as URLs ou as funções de processamento de dados abaixo.
 */

// URLs das planilhas de Nota Fiscal
const googleSheetNfEstoqueUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtSzFDAc1vJ4oIKsHCCe2xnw2OmUBdLCMIP4lPS1JTT5b2cnIctkRVK_0qe5yklF1EiR56QZeiBSfE/pub?gid=0&output=csv';
const googleSheetNfMovimentacoesUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtSzFDAc1vJ4oIKsHCCe2xnw2OmUBdLCMIP4lPS1JTT5b2cnIctkRVK_0qe5yklF1EiR56QZeiBSfE/pub?gid=1261246825&output=csv';

// Função auxiliar para buscar os dados da planilha
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status} ao buscar dados.`);
    }
    return response.text();
}

// Lógica de processamento dos dados da NF (com cálculo de quantidade corrigido)
function processNfData(rawData, parseCsvData) {
    const estoque = parseCsvData(rawData.estoque);
    const movimentacoes = parseCsvData(rawData.movimentacoes);

    const groupedByNfRaw = estoque.reduce((acc, item) => {
        const nf = item.NF;
        if (!nf) return acc;
        if (!acc[nf]) acc[nf] = [];
        acc[nf].push(item);
        return acc;
    }, {});

    const finalNfData = [];

    for (const nfNum in groupedByNfRaw) {
        const itemsInNf = groupedByNfRaw[nfNum];
        
        const groupedByDesc = itemsInNf.reduce((acc, item) => {
            const desc = item.Descrição;
            if (!acc[desc]) acc[desc] = [];
            acc[desc].push(item);
            return acc;
        }, {});

        const firstItem = itemsInNf[0];
        const nfObject = {
            numero: nfNum,
            fornecedor: firstItem['Nome Fornecedor'],
            data: firstItem['Data NF'],
            valorTotal: 0,
            totalItens: 0,
            itens: {}
        };

        for (const desc in groupedByDesc) {
            const itemGroup = groupedByDesc[desc];
            const firstOfGroup = itemGroup[0];
            
            // CORREÇÃO: A quantidade correta é o número de linhas (tombamentos) para este item na NF
            const quantidade = itemGroup.length;
            
            const valorString = String(firstOfGroup['Valor NF'] || '0');
            const valorUnitario = parseFloat(valorString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;

            nfObject.totalItens += quantidade;
            nfObject.valorTotal += quantidade * valorUnitario;

            nfObject.itens[desc] = {
                descricao: desc,
                quantidade: quantidade,
                valorUnitario: valorUnitario,
                tombamentos: itemGroup.map(i => i.TOMBAMENTO).filter(t => t)
            };
        }

        Object.values(nfObject.itens).forEach(itemAgrupado => {
            itemAgrupado.unidades = {};
            itemAgrupado.tombamentos.forEach(tomb => {
                const mov = movimentacoes.find(m => m.Tombamento === tomb);
                if (mov) {
                    const unidade = mov.Unidade || 'Não especificada';
                    itemAgrupado.unidades[unidade] = (itemAgrupado.unidades[unidade] || 0) + 1;
                }
            });
        });

        finalNfData.push(nfObject);
    }

    return finalNfData.sort((a, b) => new Date(b.data) - new Date(a.data));
}


// Funções de Renderização (internas ao módulo)
function renderNfTab(state, setState) {
    const listContainer = document.getElementById('nf-list');
    const detailsContainer = document.getElementById('nf-details-container');
    if (!listContainer || !detailsContainer) return;
    
    if (state.data.length === 0) {
        if (!document.body.classList.contains('nf-loading')) {
            detailsContainer.innerHTML = `<div class="card text-center p-10"><p class="text-lg text-slate-600">Nenhuma nota fiscal foi carregada ainda.</p></div>`;
        }
        return;
    }

    listContainer.innerHTML = state.data.map(nf => `
        <button class="nf-button" data-nf-numero="${nf.numero}">
            <p class="fornecedor">${nf.fornecedor}</p>
            <p class="details">NF: ${nf.numero} | Data: ${new Date(nf.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
            <p class="details font-bold">Valor: ${nf.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </button>
    `).join('');

    listContainer.querySelectorAll('.nf-button').forEach(btn => {
        btn.addEventListener('click', () => {
            listContainer.querySelector('.active')?.classList.remove('active');
            btn.classList.add('active');
            const nfNumero = btn.dataset.nfNumero;
            const nf = state.data.find(n => n.numero === nfNumero);
            renderNfDetails(nf, state.charts);
        });
    });

     if (!listContainer.querySelector('.active')) {
        listContainer.querySelector('.nf-button')?.click();
    }
}

function renderNfDetails(nf, nfChartInstances) {
    const detailsContainer = document.getElementById('nf-details-container');
    if (!nf) {
        detailsContainer.innerHTML = '';
        return;
    }

    Object.values(nfChartInstances).forEach(chart => chart.destroy());
    nfChartInstances = {};

    const itemsAgrupados = Object.values(nf.itens);
    
    const formatTombamentoRange = (tombamentos) => {
        if (tombamentos.length === 0) return 'N/A';
        if (tombamentos.length === 1) return tombamentos[0];
        const sorted = tombamentos.map(t => parseInt(t, 10)).filter(n => !isNaN(n)).sort((a, b) => a - b);
        if (sorted.length === 0) return 'N/A';
        return `${sorted[0]} ao ${sorted[sorted.length - 1]}`;
    };
    
    const tableRowsHTML = itemsAgrupados.map(item => `
        <tr class="border-b border-slate-200">
            <td class="px-4 py-3 font-medium">${item.descricao}</td>
            <td class="px-4 py-3 text-center">${item.quantidade}</td>
            <td class="px-4 py-3">${formatTombamentoRange(item.tombamentos)}</td>
            <td class="px-4 py-3">${Object.entries(item.unidades).map(([unidade, qtd]) => `${unidade} (${qtd})`).join('<br>')}</td>
        </tr>
    `).join('');

    detailsContainer.innerHTML = `
        <div class="card fade-in">
            <h2 class="text-2xl font-bold text-slate-800">${nf.fornecedor}</h2>
            <p class="text-sm text-slate-500 mb-6">Nota Fiscal: ${nf.numero} | Data: ${new Date(nf.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
            
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div class="kpi-nf">
                    <p class="value">${nf.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <p class="label">Valor Total</p>
                </div>
                <div class="kpi-nf">
                    <p class="value">${nf.totalItens}</p>
                    <p class="label">Qtd. de Itens</p>
                </div>
                <div class="kpi-nf col-span-2 lg:col-span-1">
                     <p class="value">${itemsAgrupados.length}</p>
                     <p class="label">Tipos de Itens</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                 <div class="card bg-slate-50/50">
                    <h4 class="font-semibold text-slate-700 mb-3 text-center">Distribuição de Itens por Unidade</h4>
                    <div class="chart-container" style="height: 300px;"><canvas id="nfUnidadesChart"></canvas></div>
                 </div>
                 <div class="card bg-slate-50/50">
                    <h4 class="font-semibold text-slate-700 mb-3 text-center">Distribuição do Valor por Item</h4>
                    <div class="chart-container" style="height: 300px;"><canvas id="nfValorChart"></canvas></div>
                 </div>
            </div>

            <div>
                <h4 class="font-semibold text-slate-700 mb-2">Resumo dos Itens</h4>
                <div class="overflow-x-auto border border-slate-200 rounded-lg">
                    <table class="table w-full text-sm">
                        <thead class="bg-slate-100">
                            <tr>
                                <th class="px-4 py-2">Descrição</th>
                                <th class="px-4 py-2 text-center">Quantidade</th>
                                <th class="px-4 py-2">Tombamento (Intervalo)</th>
                                <th class="px-4 py-2">Unidades de Destino</th>
                            </tr>
                        </thead>
                        <tbody>${tableRowsHTML}</tbody>
                    </table>
                </div>
            </div>
        </div>`;

    const unidadesData = itemsAgrupados.reduce((acc, item) => {
        Object.entries(item.unidades).forEach(([unidade, qtd]) => {
            acc[unidade] = (acc[unidade] || 0) + qtd;
        });
        return acc;
    }, {});
    const unidadesChartCanvas = document.getElementById('nfUnidadesChart');
    if (unidadesChartCanvas) {
        nfChartInstances.unidades = new Chart(unidadesChartCanvas, {
            type: 'doughnut',
            data: {
                labels: Object.keys(unidadesData),
                datasets: [{ data: Object.values(unidadesData), borderWidth: 2 }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }}}
        });
    }

    const valorData = itemsAgrupados.map(item => ({
        label: item.descricao,
        value: item.quantidade * item.valorUnitario
    })).sort((a,b) => b.value - a.value);
    const valorChartCanvas = document.getElementById('nfValorChart');
    if (valorChartCanvas) {
        nfChartInstances.valor = new Chart(valorChartCanvas, {
            type: 'bar',
            data: {
                labels: valorData.map(d => d.label),
                datasets: [{ label: 'Valor Total', data: valorData.map(d => d.value), backgroundColor: '#667eea' }]
            },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}}
        });
    }
}


// Função principal exportada, que será chamada pelo index.html
export async function handleNotaFiscalTab(state, setState, dependencies) {
    const { parseCsvData } = dependencies;
    const listContainer = document.getElementById('nf-list');
    const detailsContainer = document.getElementById('nf-details-container');
    
    if (state.data.length > 0) {
        renderNfTab(state, setState);
        return;
    }
    
    if (document.body.classList.contains('nf-loading')) return;

    document.body.classList.add('nf-loading');
    listContainer.innerHTML = '';
    detailsContainer.innerHTML = `<div class="card text-center p-10"><div class="loading-spinner"></div><p class="mt-4 text-slate-600">Carregando dados da planilha...</p></div>`;

    try {
        const [estoqueCsv, movCsv] = await Promise.all([
            fetchData(googleSheetNfEstoqueUrl),
            fetchData(googleSheetNfMovimentacoesUrl)
        ]);
        
        const rawData = { estoque: estoqueCsv, movimentacoes: movCsv };
        
        const newData = processNfData(rawData, parseCsvData);
        setState({ ...state, data: newData }); 
        renderNfTab({ ...state, data: newData }, setState);

    } catch (error) {
        console.error('Erro ao carregar ou processar dados da NF:', error);
        detailsContainer.innerHTML = `<div class="card text-center p-10"><div class="alert alert-error"><strong>Erro ao carregar dados:</strong> ${error.message}</div></div>`;
    } finally {
        document.body.classList.remove('nf-loading');
    }
}
