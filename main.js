// =================================================================
// ARQUIVO JAVASCRIPT CONSOLIDADO PARA O PAINEL DE PATRIMÔNIO
// Este arquivo combina a lógica de:
// - main.js (lógica principal, abas, filtros)
// - sede-data.js (dados estáticos da Sede)
// - notas-fiscais.js (lógica da aba de Notas Fiscais)
// =================================================================


// --- DADOS DA SEDE (Antes em sede-data.js) ---
const sedeData = [
    // SUBSOLO
    { local: "SUBSOLO", sala: "SALA 1", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE ALMOXARIFADO E PATRIMÔNIO", registro: "140.32 - SUPERINTENDÊNCIA DE ADMINISTRAÇÃO", observacao: "" }] },
    { local: "SUBSOLO", sala: "SALA 2", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE ARQUIVO E PROTOCOLO", registro: "140.88 - DIRETORIA TÉCNICA DE ARQUIVO E PROTOCOLO", observacao: "" }] },
    { local: "SUBSOLO", sala: "SALA 3", tipo: "SALA INDIVIDUAL", setores: [{ nome: "SERVIÇOS GERAIS (LSL)", registro: "140.101 - SERVIÇOS GERAIS", observacao: "" }] },
    { local: "SUBSOLO", sala: "SALA 4", tipo: "SALA INDIVIDUAL", setores: [{ nome: "COORDENAÇÃO DE ADMINISTRAÇÃO E PATRIMÔNIO", registro: "140.1 - COORDENAÇÃO DE MATERIAL E PATRIMÔNIO", observacao: "" }] },
    { local: "SUBSOLO", sala: "SALA 5", tipo: "SALA INDIVIDUAL", setores: [{ nome: "ALMOXARIFADO", registro: "", observacao: "Precisa criar identificação no sistema." }] },
    { local: "SUBSOLO", sala: "SALA 6", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE LOGÍSTICA E TRANSPORTE", registro: "140.73 - COORDENAÇÃO DE SUPORTE E LOGÍSTICA / 140.82 - SETOR DE TRANSPORTE", observacao: "Confirmado como mesmo setor. Recomenda-se unificar no sistema (sugerido: manter 140.73)." }] },
    { local: "SUBSOLO", sala: "SALA 7", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE MANUTENÇÃO", registro: "140.96 - DIRETORIA TÉCNICA DE MANUTENÇÃO", observacao: "" }] },
    
    // TÉRREO
    { local: "TÉRREO", sala: "SALA 1", tipo: "SALA INDIVIDUAL", setores: [{ nome: "RECEPÇÃO", registro: "140.94 - RECEPÇÃO", observacao: "" }] },
    { local: "TÉRREO", sala: "SALA 2", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE CADASTRO ÚNICO E TRANSFERÊNCIA DE RENDA", registro: "140.29 - SUPERINTENDÊNCIA DE GESTÃO DE BENEFÍCIOS", observacao: "" }] },
    { local: "TÉRREO", sala: "SALA 3", tipo: "SALA CONJUNTA", setores: [
        { nome: "SUPERINTENDÊNCIA DE GESTÃO DE BENEFÍCIOS SOCIOASSISTENCIAIS E TRANSFERÊNCIA DE RENDA", registro: "140.29 - SUPERINTENDÊNCIA DE GESTÃO DE BENEFÍCIOS", observacao: "" },
        { nome: "COORDENAÇÃO DE CADASTRO ÚNICO E TRANSFERÊNCIA DE RENDA", registro: "140.29 - SUPERINTENDÊNCIA DE GESTÃO DE BENEFÍCIOS", observacao: "" }
    ]},
    { local: "TÉRREO", sala: "SALA 4", tipo: "SALA CONJUNTA", setores: [
        { nome: "COORDENAÇÃO DO SERVIÇO DE PROTEÇÃO E ATENDIMENTO ESPECIALIZADO À FAMÍLIA (PAEFI)", registro: "140.48 - COORDENAÇÃO DO PAEFI", observacao: "" },
        { nome: "SUPERINTENDÊNCIA DE PROTEÇÃO SOCIAL DE MÉDIA COMPLEXIDADE", registro: "140.76 - SUPERINTENDÊNCIA DE PROTEÇÃO SOCIAL DE MÉDIA COMPLEXIDADE", observacao: "" }
    ]},
    { local: "TÉRREO", sala: "SALA 5", tipo: "DIVIDIDA POR GESSO", setores: [{ nome: "COORDENAÇÃO DO SERVIÇO ESPECIALIZADO EM ABORDAGEM SOCIAL", registro: "140.93 - SERVIÇO ESPECIALIZADO EM ABORDAGEM SOCIAL", observacao: "" }] },
    { local: "TÉRREO", sala: "SALA 6", tipo: "DIVIDIDA POR GESSO", setores: [{ nome: "COORDENAÇÃO DE PROTEÇÃO PARA PESSOAS COM DEFICIÊNCIA E IDOSAS", registro: "140.99 - COORDENAÇÃO DE PROTEÇÃO PARA PESSOAS COM DEFICIÊncia E IDOSAS", observacao: "" }] },
    { local: "TÉRREO", sala: "SALA 7", tipo: "DIVIDIDA POR GESSO", setores: [{ nome: "AÇÕES ESTRATÉGICAS DO PROGRAMA DE ERRADICAÇÃO DO TRABALHO INFANTIL (AEPETI)", registro: "140.89 - AÇÕES ESTRATÉGICAS DO PROGRAMA DE ERRADICAÇÃO DO TRABALHO INFANTIL", observacao: "" }] },
    { local: "TÉRREO", sala: "SALA 8", tipo: "DIVIDIDA POR GESSO", setores: [{ nome: "COORDENAÇÃO DE PESSOAS EM SITUAÇÃO DE RUA", registro: "140.40 - COORDENAÇÃO DE PESSOAS EM SITUAÇÃO DE RUA", observacao: "" }] },
    { local: "TÉRREO", sala: "SALA 9", tipo: "DIVIDIDA POR GESSO", setores: [{ nome: "COORDENAÇÃO DO SERVIÇO DE PROTEÇÃO SOCIAL A ADOLESCENTES EM CUMPRIMENTO DE MEDIDAS SOCIOEDUCATIVAS", registro: "140.33 - COORDENAÇÃO DE MEDIDAS SOCIOEDUCATIVAS", observacao: "" }] },
    { local: "TÉRREO", sala: "SALA 10", tipo: "DIVIDIDA POR GESSO", setores: [{ nome: "MEDIDA SOCIOEDUCATIVA", registro: "140.33 - COORDENAÇÃO DE MEDIDAS SOCIOEDUCATIVAS", observacao: "" }] },

    // MEZANINO
    { local: "MEZANINO", sala: "SALA 1", tipo: "SALA INDIVIDUAL", setores: [{ nome: "COORDENAÇÃO DE BENEFÍCIOS SOCIOASSISTENCIAIS", registro: "140.44 - COORDENAÇÃO DE BENEFÍCIOS E AÇÕES SOCIOASSISTENCIAIS", observacao: "" }] },
    { local: "MEZANINO", sala: "SALA 2", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE INFORMÁTICA", registro: "140.79 - TECNOLOGIA DA INFORMAÇÃO", observacao: "" }] },
    { local: "MEZANINO", sala: "SALA 3", tipo: "SALA CONJUNTA", setores: [
        { nome: "SUPERINTENDÊNCIA DE ARTICULAÇÃO INSTITUCIONAL", registro: "140.31 / 140.77 - SUPERINTENDÊNCIA DE ARTICULAÇÃO INSTITUCIONAL", observacao: "Recomenda-se unificar no sistema (sugerido: manter 140.31)." },
        { nome: "COORDENAÇÃO E DIRETORIA DE AÇÕES AFIRMATIVAS E DIREITOS HUMANOS", registro: "140.41 - COORDENAÇÃO DE PROTEÇÃO E ARTICULAÇÃO DE POLÍTICA DE INCLUSÃO", observacao: "" }
    ]},
    { local: "MEZANINO", sala: "SALA 4", tipo: "SALA INDIVIDUAL", setores: [{ nome: "SECRETÁRIA ADJUNTA DE PROTEÇÃO SOCIAL", registro: "", observacao: "Precisa criar identificação no sistema." }] },
    { local: "MEZANINO", sala: "SALA 5", tipo: "SALA CONJUNTA", setores: [
        { nome: "PROGRAMA DE CAPACITAÇÃO DE DIRIGENTES (PROCAD)", registro: "140.36 - COORDENAÇÃO DE CAPACITAÇÃO", observacao: "" },
        { nome: "PROGRAMA CRIANÇA FELIZ (PCF)", registro: "", observacao: "Precisa criar identificação no sistema." }
    ]},
    
    // 1º ANDAR
    { local: "1º ANDAR", sala: "SALA 1", tipo: "SALA CONJUNTA", setores: [
        { nome: "SUPERINTENDÊNCIA DE GESTÃO DO SUAS", registro: "140.27 - SUPERINTENDÊNCIA DE GESTÃO DO SISTEMA ÚNICO DE ASSISTÊNCIA SOCIAL", observacao: "" },
        { nome: "COORDENAÇÃO DE REGULAÇÃO DO SUAS", registro: "140.27 - SUPERINTENDÊNCIA DE GESTÃO DO SISTEMA ÚNICO DE ASSISTÊNCIA SOCIAL", observacao: "" },
        { nome: "COORDENAÇÃO DA REDE SOCIOASSISTENCIAL PRIVADA", registro: "140.49 - COORDENAÇÃO DE ARTICULAÇÃO DA REDE DE PROTEÇÃO", observacao: "" }
    ]},
    { local: "1º ANDAR", sala: "SALA 2", tipo: "SALA CONJUNTA", setores: [
        { nome: "SUPERINTENDÊNCIA DE PROTEÇÃO SOCIAL ESPECIAL DE ALTA COMPLEXIDADE", registro: "140.26 - SUPERINTENDÊNCIA DE PROTEÇÃO SOCIAL ESPECIAL DE ALTA COMPLEXIDADE", observacao: "" },
        { nome: "COORDENAÇÃO DOS SERVIÇOS FAMILIAR E INSTITUCIONAL DE ACOLHIMENTO", registro: "140.46 - COORDENAÇÃO ACOLHIMENTO INSTITUCIONAL", observacao: "" }
    ]},
    { local: "1º ANDAR", sala: "SALA 3", tipo: "SALA CONJUNTA", setores: [
        { nome: "DIRETORIA TÉCNICA DE ACOLHIMENTO INSTITUCIONAL", registro: "140.46 - COORDENAÇÃO ACOLHIMENTO INSTITUCIONAL", observacao: "" },
        { nome: "DIRETORIA TÉCNICA DA CENTRAL DE ACOLHIMENTO", registro: "140.46 - COORDENAÇÃO ACOLHIMENTO INSTITUCIONAL", observacao: "" },
        { nome: "DIRETORIA TÉCNICA DE ACOLHIMENTO EM FAMÍLIA ACOLHEDORA", registro: "140.46 - COORDENAÇÃO ACOLHIMENTO INSTITUCIONAL", observacao: "Recomenda-se avaliar códigos separados para maior clareza." }
    ]},
    { local: "1º ANDAR", sala: "SALA 4", tipo: "SALA CONJUNTA", setores: [
        { nome: "PAIF - COORDENAÇÃO DO SERVIÇO DE PROTEÇÃO E ATENDIMENTO INTEGRAL À FAMÍLIA", registro: "140.4 - COORDENAÇÃO DO PAIF", observacao: "" },
        { nome: "SCFV - COORDENAÇÃO DO SERVIÇO DE CONVIVÊNCIA E FORTALECIMENTO DE VÍNCULOS", registro: "140.43 - COORDENAÇÃO DE CONVIVÊNCIA E FORTALECIMENTO", observacao: "" },
        { nome: "COORDENAÇÃO DO SERVIÇO DE PROTEÇÃO SOCIAL BÁSICA NO DOMICÍLIO", registro: "", observacao: "Precisa criar identificação no sistema." }
    ]},
    { local: "1º ANDAR", sala: "SALA 5", tipo: "SALA INDIVIDUAL", setores: [{ nome: "SUPERINTENDÊNCIA DE PROTEÇÃO SOCIAL BÁSICA", registro: "140.25 - SUPERINTENDÊNCIA DE PROTEÇÃO SOCIAL BÁSICA", observacao: "" }] },
    { local: "1º ANDAR", sala: "SALA 6", tipo: "SALA INDIVIDUAL", setores: [{ nome: "COORDENAÇÃO DE GESTÃO DO TRABALHO E EDUCAÇÃO PERMANENTE (COGETEP)", registro: "140.95 - COORDENAÇÃO DE GESTÃO DO TRABALHO E EDUCAÇÃO PERMANENTE", observacao: "" }] },
    { local: "1º ANDAR", sala: "SALA 7", tipo: "SALA INDIVIDUAL", setores: [{ nome: "COORDENAÇÃO DE RECURSOS HUMANOS", registro: "140.34 - COORDENAÇÃO DE RECURSOS HUMANOS", observacao: "Recomenda-se criar código separado para DIRETORIA TÉCNICA DE FOLHA DE PAGAMENTO." }] },
    { local: "1º ANDAR", sala: "SALA 8", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE FOLHA DE PAGAMENTO", registro: "140.34 - COORDENAÇÃO DE RECURSOS HUMANOS", observacao: "Recomenda-se criar código separado para evitar confusão com COORDENAÇÃO DE RECURSOS HUMANOS." }] },
    { local: "1º ANDAR", sala: "SALA 9", tipo: "SALA INDIVIDUAL", setores: [{ nome: "ASSESSORIA JURÍDICA", registro: "140.84 - SEMCAS - ASSESSORIA JURÍDICA", observacao: "" }] },
    { local: "1º ANDAR", sala: "SALA 10", tipo: "SALA CONJUNTA", setores: [
        { nome: "COORDENAÇÃO DE PLANEJAMENTO E VIGILÂNCIA SOCIOASSISTENCIAL", registro: "140.87 - COORDENAÇÃO DE PLANEJAMENTO E VIGILÂNCIA", observacao: "" },
        { nome: "SUPERINTENDÊNCIA E COORDENAÇÕES DE EXECUÇÃO ORÇAMENTÁRIA, FINANCEIRA E CONTABILIDADE", registro: "140.81 - COORDENAÇÃO DE EXECUÇÃO ORÇAMENTÁRIA E FINANCEIRA", observacao: "Recomenda-se avaliar código separado para PRESTAÇÃO DE CONTAS." },
        { nome: "DIRETORIA TÉCNICA DE GESTÃO DOS FUNDOS MUNICIPAIS", registro: "140.90 - FUNDO MUNICIPAL DE ASSISTÊNCIA SOCIAL / 140.91 - FUNDO MUNICIPAL DE DIREITO DA CRIANÇA E DO ADOLESCENTE / 140.92 - FUNDO MUNICIPAL DE DIREITO DO IDOSO", observacao: "" },
        { nome: "DIRETORIA TÉCNICA DE PRESTAÇÃO DE CONTAS", registro: "140.81 - COORDENAÇÃO DE EXECUÇÃO ORÇAMENTÁRIA E FINANCEIRA", observacao: "Recomenda-se avaliar código separado para evitar confusão." }
    ]},
    { local: "1º ANDAR", sala: "SALA 11", tipo: "SALA CONJUNTA", setores: [
        { nome: "GABINETE", registro: "140.85 - GABINETE", observacao: "" },
        { nome: "COMUNICAÇÃO", registro: "140.42 - COORDENAÇÃO E ASSESSORIA DE COMUNICAÇÃO", observacao: "" }
    ]},
    { local: "1º ANDAR", sala: "SALA 12", tipo: "SALA INDIVIDUAL", setores: [{ nome: "ASSESSORIA TÉCNICA (ASTEC)", registro: "140.78 - ASSESSORIA TÉCNICA / COMUNICAÇÃO", observacao: "" }] },
    { local: "1º ANDAR", sala: "SALA 13", tipo: "SALA INDIVIDUAL", setores: [{ nome: "GABINETE DO SECRETÁRIO ADJUNTO DE ADMINISTRAÇÃO", registro: "140.74 - GABINETE DA SECRETÁRIA ADJUNTA DE GESTÃO", observacao: "" }] },
    { local: "1º ANDAR", sala: "SALA 14", tipo: "SALA INDIVIDUAL", setores: [{ nome: "COORDENAÇÃO DE CONTRATOS", registro: "140.2 - COORDENAÇÃO DE CONTRATOS E CONVÊNIOS / 140.86 - COORDENAÇÃO DE CONTRATOS", observacao: "Recomenda-se unificar no sistema (sugerido: manter 140.86)." }] },
    
    // 2º ANDAR
    { local: "2º ANDAR", sala: "SALA 1", tipo: "SALA INDIVIDUAL", setores: [{ nome: "CONSELHO MUNICIPAL DOS DIREITOS DA CRIANÇA E DO ADOLESCENTE (CMDCA)", registro: "140.70 - CONSELHO MUNICIPAL DOS DIREITOS DA CRIANÇA E DO ADOLESCENTE DE SÃO LUÍS", observacao: "" }] },
    { local: "2º ANDAR", sala: "SALA 2", tipo: "SALA INDIVIDUAL", setores: [{ nome: "CONSELHO MUNICIPAL DO IDOSO (CMDI)", registro: "140.71 - CONSELHO MUNICIPAL DO IDOSO", observacao: "" }] },
    { local: "2º ANDAR", sala: "SALA 3", tipo: "SALA INDIVIDUAL", setores: [{ nome: "CONSELHO MUNICIPAL DE ASSISTÊNCIA SOCIAL (CMAS)", registro: "140.69 - CONSELHO MUNICIPAL ASSISTÊNCIA SOCIAL", observacao: "" }] },
    { local: "2º ANDAR", sala: "SALA 4", tipo: "SALA INDIVIDUAL", setores: [{ nome: "CONSELHO MUNICIPAL DOS DIREITOS DA PESSOA COM DEFICIÊNCIA (CMDEF)", registro: "", observacao: "Precisa criar identificação no sistema." }] },
    { local: "2º ANDAR", sala: "SALA 6", tipo: "SALA INDIVIDUAL", setores: [{ nome: "AUDITÓRIO", registro: "140.97 - AUDITÓRIO", observacao: "" }] },
    
    // 3º ANDAR
    { local: "3º ANDAR", sala: "SALA 1", tipo: "SALA INDIVIDUAL", setores: [{ nome: "AUDITÓRIO", registro: "140.97 - AUDITÓRIO", observacao: "Repetido no 2º andar, sala 6. Verificar se é o mesmo espaço." }] },
    
    // SETORES PENDENTES DE LOCALIZAÇÃO
    { local: "PENDENTE", sala: "SETORES PENDENTES DE LOCALIZAÇÃO", tipo: "PENDENTE", setores: [
        { nome: "SUPERINTENDÊNCIA DE ENFRENTAMENTO À VIOLAÇÃO DE DIREITOS", registro: "140.30 - SUPERINTENDÊNCIA DE ENFRENTAMENTO À VIOLAÇÃO DE DIREITOS", observacao: "Localização na sede não confirmada." },
        { nome: "COORDENAÇÃO DE RESGATE E VIGILÂNCIA SOCIAL", registro: "140.45 - COORDENAÇÃO DE RESGATE E VIGILÂNCIA SOCIAL", observacao: "Localização na sede não confirmada." },
        { nome: "COORDENAÇÃO DE INCLUSÃO SOCIOPRODUTIVA", registro: "140.47 - COORDENAÇÃO DE INCLUSÃO SOCIOPRODUTIVA", observacao: "Localização na sede não confirmada." }
        
    ]}
];


// --- LÓGICA DA ABA NOTA FISCAL (Antes em notas-fiscais.js) ---

// URLs das planilhas de Nota Fiscal
const googleSheetNfEstoqueUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtSzFDAc1vJ4oIKsHCCe2xnw2OmUBdLCMIP4lPS1JTT5b2cnIctkRVK_0qe5yklF1EiR56QZeiBSfE/pub?gid=0&output=csv';
const googleSheetNfMovimentacoesUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtSzFDAc1vJ4oIKsHCCe2xnw2OmUBdLCMIP4lPS1JTT5b2cnIctkRVK_0qe5yklF1EiR56QZeiBSfE/pub?gid=1261246825&output=csv';

async function handleNotaFiscalTab(state, setState, dependencies) {
    const { parseCsvData } = dependencies;
    const listContainer = document.getElementById('nf-list');
    const detailsContainer = document.getElementById('nf-details-container');
    
    // Função auxiliar para buscar os dados da planilha
    async function fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status} ao buscar dados.`);
        }
        return response.text();
    }

    // Lógica de processamento dos dados da NF
    function processNfData(rawData, parseCsvDataFunc) {
        const estoque = parseCsvDataFunc(rawData.estoque);
        const movimentacoes = parseCsvDataFunc(rawData.movimentacoes);

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

    // Funções de Renderização
    function renderNfTab() {
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
                    <div class="kpi-nf"><p class="value">${nf.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p><p class="label">Valor Total</p></div>
                    <div class="kpi-nf"><p class="value">${nf.totalItens}</p><p class="label">Qtd. de Itens</p></div>
                    <div class="kpi-nf col-span-2 lg:col-span-1"><p class="value">${itemsAgrupados.length}</p><p class="label">Tipos de Itens</p></div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                     <div class="card bg-slate-50/50"><h4 class="font-semibold text-slate-700 mb-3 text-center">Distribuição de Itens por Unidade</h4><div class="chart-container" style="height: 300px;"><canvas id="nfUnidadesChart"></canvas></div></div>
                     <div class="card bg-slate-50/50"><h4 class="font-semibold text-slate-700 mb-3 text-center">Distribuição do Valor por Item</h4><div class="chart-container" style="height: 300px;"><canvas id="nfValorChart"></canvas></div></div>
                </div>

                <div>
                    <h4 class="font-semibold text-slate-700 mb-2">Resumo dos Itens</h4>
                    <div class="overflow-x-auto border border-slate-200 rounded-lg"><table class="table w-full text-sm"><thead class="bg-slate-100"><tr><th class="px-4 py-2">Descrição</th><th class="px-4 py-2 text-center">Quantidade</th><th class="px-4 py-2">Tombamento (Intervalo)</th><th class="px-4 py-2">Unidades de Destino</th></tr></thead><tbody>${tableRowsHTML}</tbody></table></div>
                </div>
            </div>`;

        const unidadesData = itemsAgrupados.reduce((acc, item) => {
            Object.entries(item.unidades).forEach(([unidade, qtd]) => { acc[unidade] = (acc[unidade] || 0) + qtd; });
            return acc;
        }, {});
        if (document.getElementById('nfUnidadesChart')) {
            nfChartInstances.unidades = new Chart(document.getElementById('nfUnidadesChart'), { type: 'doughnut', data: { labels: Object.keys(unidadesData), datasets: [{ data: Object.values(unidadesData), borderWidth: 2 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }}} });
        }
        const valorData = itemsAgrupados.map(item => ({ label: item.descricao, value: item.quantidade * item.valorUnitario })).sort((a,b) => b.value - a.value);
        if (document.getElementById('nfValorChart')) {
            nfChartInstances.valor = new Chart(document.getElementById('nfValorChart'), { type: 'bar', data: { labels: valorData.map(d => d.label), datasets: [{ label: 'Valor Total', data: valorData.map(d => d.value), backgroundColor: '#667eea' }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}} });
        }
    }

    // --- Execução Principal da Aba ---
    if (state.data.length > 0) {
        renderNfTab();
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
        renderNfTab();
    } catch (error) {
        console.error('Erro ao carregar ou processar dados da NF:', error);
        detailsContainer.innerHTML = `<div class="card text-center p-10"><div class="alert alert-error"><strong>Erro ao carregar dados:</strong> ${error.message}</div></div>`;
    } finally {
        document.body.classList.remove('nf-loading');
    }
}


// --- LÓGICA PRINCIPAL (Antes em main.js) ---

document.addEventListener('DOMContentLoaded', async () => {

    // --- CONFIGURAÇÃO E VARIÁVEIS GLOBAIS ---
    const googleSheetPatrimonioUrl = 'https://script.google.com/macros/s/AKfycbypxSVE9syiII4H4DumAfxWEgFm1AE7qLpuQgqHTNLMi4B7I8dWF0Het7V2Cd4_aL58Mg/exec';
    const googleSheetEstoqueUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtgMcUrrMlaEW0BvLD1466J1geRMzLkv6iZ5QpdY53BH6bc38SMinDvC1C-iI9RKHIcWqTjRf4ccdk/pub?output=csv';

    let allItems = [];
    let dadosOriginais = [];
    let visaoAtiva = 'dashboard';
    let tituloDaVisao = 'Dashboard';
    let currentPage = 1;
    const itemsPerPage = 20;
    let estadoChartInstance, dashboardChartInstance, estoqueChartInstance;
    let allEstoqueItems = [];
    let selectedUnidadeValue = '';
    let dashboardEstadoChartInstance, dashboardTopItemsChartInstance;

    // Estado da Aba Nota Fiscal
    let nfState = {
        data: [],
        charts: {}
    };
    const setNfState = (newState) => {
        nfState = newState;
    };

    // --- Referências de Elementos ---
    let filtroServicoEl, filtroEstadoEl, filtroBuscaEl, filtroDoacaoEl;
    let mainContentAreaEl, verResumoGeralBtn;
    let tableBodyEl, paginationControlsEl;
    let navButtons;
    let contentPanes;
    let mainContentEstoqueEl, filtroEstoqueUnidadeEl, filtroEstoqueBuscaEl;
    let filtroTotalCategoriaEl, filtroTotalItemEl, filtroTotalUnidadeEl, filtroTotalEstadoEl;
    let openUnidadeModalBtn, unidadeModal, modalOverlay, closeModalBtn, unidadeSearchInput, unidadeListContainer, clearUnidadeSelectionBtn;
    let connectionStatusEl;

    // --- FUNÇÕES DE BUSCA E PROCESSAMENTO DE DADOS ---
    class DataManager {
        constructor() {
            this.cacheKey = 'dashboard_cache_v4';
            this.cacheExpiry = 5 * 60 * 1000;
            this.loadingPromises = new Map();
        }

        async fetchWithCache(url, key, type = 'json') {
            const cached = this.getFromCache(key);
            if (cached && (Date.now() - cached.timestamp < this.cacheExpiry)) {
                console.log(`Loading ${key} from cache.`);
                return cached.data;
            }
            console.log(`Fetching ${key} from network.`);
            if (this.loadingPromises.has(key)) return this.loadingPromises.get(key);

            const promise = this.fetchData(url, type).then(data => {
                this.saveToCache(key, data);
                this.loadingPromises.delete(key);
                return data;
            }).catch(error => {
                this.loadingPromises.delete(key);
                throw error;
            });
            this.loadingPromises.set(key, promise);
            return promise;
        }

        async fetchData(url, type) {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            if (type === 'json') {
                const rawData = await response.json();
                if (rawData && rawData.error) throw new Error(`Erro do Apps Script: ${rawData.error}`);
                return Array.isArray(rawData) ? rawData : (rawData && Array.isArray(rawData.content)) ? rawData.content : null;
            }
            return response.text();
        }
        saveToCache(key, data) { try { const cache = this.getAllCache(); cache[key] = { data, timestamp: Date.now() }; localStorage.setItem(this.cacheKey, JSON.stringify(cache)); } catch (e) { console.warn("Could not save to cache, it might be full. Clearing cache."); localStorage.removeItem(this.cacheKey); } }
        getFromCache(key) { const cache = this.getAllCache(); return cache[key] || null; }
        getAllCache() { try { return JSON.parse(localStorage.getItem(this.cacheKey)) || {}; } catch { return {}; } }
    }
    const dataManager = new DataManager();

    function parseCsvData(csvText) {
        const lines = csvText.trim().split(/\r\n|\n/);
        if (lines.length < 2) return [];
        const headerLine = lines[0];
        const delimiter = headerLine.includes(';') ? ';' : ',';
        const headers = headerLine.split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            const values = lines[i].split(new RegExp(`${delimiter}(?=(?:(?:[^"]*"){2})*[^"]*$)`));
            const item = {};
            for (let j = 0; j < headers.length; j++) {
                let value = values[j] ? values[j].trim().replace(/^"|"$/g, '') : '';
                item[headers[j]] = value;
            }
            data.push(item);
        }
        return data;
    }

    // Funções de formatação, normalização e utilitários
    const normalizeString = (str) => str ? String(str).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
    const debounce = (func, delay) => { let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), delay); }; };
    const capitalizeWords = (str) => str ? str.toLowerCase().replace(/([^\s/]+)/g, word => word.charAt(0).toUpperCase() + word.slice(1)) : "";
    const getServiceKey = (serviceName) => { const name = (serviceName || '').toLowerCase().trim(); if (name === 'conselho' || name === 'ct') return 'conselho'; if (name.includes('cras')) return 'cras'; if (name.includes('creas')) return 'creas'; if (name.includes('externa')) return 'externa'; if (name.includes('centro pop')) return 'centro_pop'; if (name.includes('abrigo')) return 'abrigo'; if (name.includes('sede')) return 'sede'; return 'item'; };
    const stateColors = { 'Novo': { bg: 'badge-green', hex: '#16a34a' }, 'Bom': { bg: 'badge-blue', hex: '#2563eb' }, 'Regular': { bg: 'badge-yellow', hex: '#facc15' }, 'Avariado': { bg: 'badge-red', hex: '#dc2626' } };
    
    function formatSheetData(sheetData) {
        return sheetData.map((row, index) => {
            let finalState = row.Estado || 'Regular';
            if (/(avariado|defeito|danificado|não funciona|nao funciona)/.test((row['Observação'] || '').toLowerCase()) || /(defeito|avaria|danificado|nao funciona)/.test(normalizeString(finalState))) {
                finalState = 'Avariado';
            }
            return {
                id: `${getServiceKey(row.Tipo)}_${index}`,
                tombamento: (row['Tombamento'] || '').trim() || 'S/T',
                type: row.Tipo || 'N/A',
                description: row['Descrição'] || 'N/A',
                unit_condition: capitalizeWords((row.Unidade || 'N/A').trim()),
                quantity: parseInt(row.Quantidade, 10) || 1,
                location: row['Localização'] || 'N/A',
                state: finalState,
                donation_source: (row['Origem da Doação'] || '').trim().replace(/(-|N\/A)/i, ''),
                observation: (row['Observação'] || '').trim().replace(/(-|N\/A)/i, ''),
                supplier: (row.Fornecedor || '').trim().replace(/(-|N\/A)/i, ''),
            };
        });
    }

    function agruparItens(items) {
        if (!items || items.length === 0) return [];
        const agrupados = items.reduce((acc, item) => {
            const key = `${normalizeString(item.description)}-${item.state}-${normalizeString(item.unit_condition)}-${normalizeString(item.location)}`;
            if (acc[key]) {
                acc[key].quantity += item.quantity;
            } else {
                acc[key] = { ...item, quantity: item.quantity };
            }
            return acc;
        }, {});
        return Object.values(agrupados);
    }

    function formatUnitName(item) {
        let nomeUnidade = item.unit_condition;
        const type = item.type.toUpperCase();
        if ((type === 'CRAS' || type === 'CREAS' || type === 'CT') && !nomeUnidade.toUpperCase().startsWith(type)) {
            return `${type} ${nomeUnidade}`;
        }
        return nomeUnidade;
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
    function renderTable(itemsToDisplay, totalItemsCount) {
        if (!tableBodyEl) return;
        tableBodyEl.innerHTML = itemsToDisplay.length === 0 
            ? `<tr><td colspan="10" class="text-center py-10 text-slate-500">Nenhum item encontrado.</td></tr>`
            : itemsToDisplay.map(item => `
                <tr class="border-b border-slate-200">
                    <td class="px-6 py-4 font-mono text-xs">${item.tombamento}</td>
                    <td class="px-6 py-4">${item.type}</td>
                    <td class="px-6 py-4 font-medium text-slate-900">${item.description}</td>
                    <td class="px-6 py-4">${formatUnitName(item)}</td>
                    <td class="px-6 py-4 text-center">${item.quantity}</td>
                    <td class="px-6 py-4">${item.location}</td>
                    <td class="px-6 py-4"><span class="badge ${stateColors[item.state]?.bg}">${item.state}</span></td>
                    <td class="px-6 py-4">${item.donation_source || 'N/A'}</td>
                    <td class="px-6 py-4">${item.observation || 'N/A'}</td>
                    <td class="px-6 py-4">${item.supplier || 'N/A'}</td>
                </tr>`).join('');
        renderPagination(totalItemsCount, Math.ceil(totalItemsCount / itemsPerPage));
    }

    function renderPagination(totalItems, totalPages) {
        if (!paginationControlsEl || totalPages <= 1) {
             if(paginationControlsEl) paginationControlsEl.innerHTML = '';
             return;
        };
        paginationControlsEl.innerHTML = `
            <span class="text-sm text-slate-600">Mostrando ${Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} a ${Math.min(currentPage * itemsPerPage, totalItems)} de ${totalItems}</span>
            <div class="inline-flex"><button data-page="${currentPage - 1}" class="px-4 py-2 text-sm border rounded-l-lg hover:bg-slate-100 disabled:opacity-50" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button><button data-page="${currentPage + 1}" class="px-4 py-2 text-sm border rounded-r-lg hover:bg-slate-100 disabled:opacity-50" ${currentPage === totalPages ? 'disabled' : ''}>Próximo</button></div>`;
    }

    function getFilteredItems(sourceData) {
        const servico = filtroServicoEl.value, unidade = selectedUnidadeValue, estado = filtroEstadoEl.value, doacao = filtroDoacaoEl.value, busca = filtroBuscaEl.value.toLowerCase();
        if (!servico && !unidade && !estado && !busca && !doacao) return sourceData;
        return sourceData.filter(item => 
            (!servico || item.id.startsWith(`${servico}_`)) &&
            (!unidade || item.unit_condition === unidade) &&
            (!estado || item.state === estado) &&
            (!doacao || (doacao === 'sim' && item.donation_source) || (doacao === 'nao' && !item.donation_source)) &&
            (!busca || Object.values(item).some(val => String(val).toLowerCase().includes(busca)))
        );
    }
    
    function renderApp() {
        if (estadoChartInstance) estadoChartInstance.destroy();
        const currentFilteredData = getFilteredItems(dadosOriginais);
        const filteredAndGroupedItems = agruparItens(currentFilteredData);
        
        if (visaoAtiva === 'boasVindas') {
             mainContentAreaEl.innerHTML = `<div class="text-center p-10 card"><p class="text-xl">Selecione um <strong>Tipo de Unidade</strong> ou clique em <strong>Ver Inventário Completo</strong>.</p></div>`;
        } else if (visaoAtiva === 'unidade' || visaoAtiva === 'resumo') {
            const reportContent = visaoAtiva === 'unidade' ? `<div class="lg:col-span-3 card"><h3 class="text-xl font-bold mb-4">Relatório Descritivo</h3><div class="text-slate-600 space-y-2">${GerarRelatorioUnidade(currentFilteredData)}</div></div>` : '';
            mainContentAreaEl.innerHTML = `<div><h2 class="text-3xl font-bold mb-6">${tituloDaVisao}</h2><div class="grid grid-cols-1 lg:grid-cols-5 gap-6"><div class="lg:col-span-2 card"><div class="chart-container"><canvas id="estadoChart"></canvas></div></div>${reportContent}</div><h2 class="text-2xl font-bold mt-8 mb-6">Inventário Detalhado</h2><div class="card p-0 overflow-x-auto"><table class="table w-full text-sm"><thead><tr><th>Tomb.</th><th>Tipo</th><th>Descrição</th><th>Unidade</th><th class="text-center">Qtd</th><th>Local</th><th>Estado</th><th>Doação</th><th>Obs.</th><th>Forn.</th></tr></thead><tbody id="inventory-table-body"></tbody></table></div><div id="pagination-controls" class="flex items-center justify-between mt-6"></div></div>`;
            updateDynamicDOMReferences();
            renderTable(filteredAndGroupedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), filteredAndGroupedItems.length);
            const chartData = ['Novo', 'Bom', 'Regular', 'Avariado'].map(state => currentFilteredData.filter(i => i.state === state).reduce((sum, i) => sum + i.quantity, 0));
            new Chart(document.getElementById('estadoChart'), { type: 'bar', data: { labels: ['Novo', 'Bom', 'Regular', 'Avariado'], datasets: [{ label: 'Qtd.', data: chartData, backgroundColor: ['#16a34a', '#2563eb', '#facc15', '#dc2626'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
        }
    }
    
    function GerarRelatorioUnidade(dados) {
        if (!dados || dados.length === 0) return "Nenhum dado disponível.";
        const stateCounts = dados.reduce((acc, item) => { acc[item.state] = (acc[item.state] || 0) + item.quantity; return acc; }, {});
        const total = Object.values(stateCounts).reduce((s, c) => s + c, 0);
        return `A unidade possui <strong>${total}</strong> itens. Situação: <strong>${stateCounts.Novo || 0}</strong> novos, <strong>${stateCounts.Bom || 0}</strong> bons, <strong>${stateCounts.Regular || 0}</strong> regulares e <strong>${stateCounts.Avariado || 0}</strong> avariados.`;
    }

    function renderEstoque(items) {
        mainContentEstoqueEl.innerHTML = '';
        if (items.length === 0) {
            mainContentEstoqueEl.innerHTML = `<div class="card text-center p-10"><p>Nenhum item de estoque encontrado.</p></div>`;
            return;
        }
        const busca = filtroEstoqueBuscaEl.value.toLowerCase(), unidade = filtroEstoqueUnidadeEl.value;
        const filteredItems = items.filter(item => (!unidade || item.Unidade === unidade) && (!busca || (item.Item || '').toLowerCase().includes(busca)));
        if (filteredItems.length === 0) {
            mainContentEstoqueEl.innerHTML = `<div class="card text-center p-10"><p>Nenhum item de estoque encontrado para os filtros aplicados.</p></div>`;
            return;
        }
        const headers = Object.keys(filteredItems[0] || {});
        mainContentEstoqueEl.innerHTML = `<div class="card p-0 overflow-x-auto"><table class="table w-full text-sm"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${filteredItems.map(item => `<tr>${headers.map(h => `<td>${item[h] || ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }

    function renderDashboard() {
        if (!allItems || allItems.length === 0) return;
        const totalItens = allItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalUnidades = new Set(allItems.map(item => item.unit_condition)).size;
        const totalAvariados = allItems.filter(i => i.state === 'Avariado').reduce((sum, i) => sum + i.quantity, 0);
        
        const unitsData = [...allItems.reduce((map, item) => {
            if (item.type !== 'Sede') {
                const name = formatUnitName(item);
                if (!map.has(name)) map.set(name, { name, avariados: 0, regulares: 0, totalItems: 0, items: [] });
                const unit = map.get(name);
                unit.items.push(item);
                unit.totalItems += item.quantity;
                if (item.state === 'Avariado') unit.avariados += item.quantity;
                if (item.state === 'Regular') unit.regulares += item.quantity;
            }
            return map;
        }, new Map()).values()];

        unitsData.forEach(u => u.attentionScore = u.totalItems > 0 ? ((u.avariados * 3) + u.regulares) / u.totalItems : 0);
        const attention = unitsData.filter(u => u.attentionScore > 0).sort((a,b) => b.attentionScore - a.attentionScore).slice(0, 10);
        const noBebedouro = unitsData.filter(u => !u.items.some(i => normalizeString(i.description).includes('bebedouro') && i.state !== 'Avariado')).slice(0, 10);

        document.getElementById('kpi-total-itens').textContent = totalItens;
        document.getElementById('kpi-total-unidades').textContent = totalUnidades;
        document.getElementById('kpi-total-avariados').textContent = totalAvariados;
        document.getElementById('kpi-unidades-atencao').textContent = attention.length;

        if(dashboardEstadoChartInstance) dashboardEstadoChartInstance.destroy();
        dashboardEstadoChartInstance = new Chart(document.getElementById('dashboardEstadoChart'), { type: 'doughnut', data: { labels: ['Novo', 'Bom', 'Regular', 'Avariado'], datasets: [{ data: [allItems.filter(i=>i.state==='Novo').length, allItems.filter(i=>i.state==='Bom').length, allItems.filter(i=>i.state==='Regular').length, totalAvariados], backgroundColor: Object.values(stateColors).map(c=>c.hex) }] }, options: { responsive: true, maintainAspectRatio: false } });
        
        document.getElementById('dashboard-attention-units-list').innerHTML = attention.length > 0 ? attention.map(u => `<p class="text-sm">${u.name} <span class="font-bold text-yellow-500">(${u.avariados} avariados)</span></p>`).join('') : '<p>Nenhuma unidade em atenção.</p>';
        document.getElementById('dashboard-no-bebedouro-units-list').innerHTML = noBebedouro.length > 0 ? noBebedouro.map(u => `<p class="text-sm">${u.name}</p>`).join('') : '<p>Todas as unidades têm bebedouro.</p>';
    }

    function renderSedeReport() {
        const roomsContainer = document.getElementById('sede-rooms-container');
        const searchTerm = document.getElementById('searchBoxSede').value.toLowerCase();
        const filteredData = sedeData.filter(item => (currentSedeFloor === 'Todos' || item.local === currentSedeFloor) && (JSON.stringify(item).toLowerCase().includes(searchTerm)) && (currentSedeFilter !== 'no-registry' || item.setores.some(s => !s.registro)));
        document.getElementById('noResultsSede').style.display = filteredData.length === 0 ? 'block' : 'none';
        roomsContainer.innerHTML = filteredData.map(room => `
            <div class="room-card-sede ${room.setores.some(s => !s.registro) ? 'no-registry' : ''}">
                <div class="room-card-header"><p class="room-card-subtitle">${room.local} - ${room.tipo}</p><h3 class="room-card-title">${room.sala}</h3></div>
                <div class="room-card-body">${room.setores.map(setor => `<div class="department-item-sede"><p class="department-name-sede">${setor.nome}</p><p class="department-registro-sede">Registro: ${setor.registro || 'N/A'}</p>${setor.observacao ? `<p class="department-observacao-sede">${setor.observacao}</p>` : ''}</div>`).join('')}</div>
            </div>`).join('');
    }

    // --- HANDLERS DE EVENTOS E INICIALIZAÇÃO ---
    async function switchTab(tabName) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.nav-btn[data-tab="${tabName}"]`).classList.add('active');
        contentPanes.forEach(pane => pane.classList.add('hidden'));
        document.getElementById(`content-${tabName}`).classList.remove('hidden');
        visaoAtiva = tabName;

        if (tabName === 'dashboard') renderDashboard();
        else if (tabName === 'estoque' && allEstoqueItems.length === 0) {
            try {
                const csvText = await dataManager.fetchWithCache(googleSheetEstoqueUrl, 'estoque', 'text');
                allEstoqueItems = parseCsvData(csvText);
                const unidadesEstoque = [...new Set(allEstoqueItems.map(item => item.Unidade || 'N/A'))].sort();
                filtroEstoqueUnidadeEl.innerHTML = '<option value="">TODAS</option>' + unidadesEstoque.map(u => `<option value="${u}">${u.toUpperCase()}</option>`).join('');
                renderEstoque(allEstoqueItems);
            } catch(e) { mainContentEstoqueEl.innerHTML = `<div class="card p-10 text-center text-red-600"><strong>Erro:</strong> Não foi possível carregar o estoque.</div>`; }
        } else if (tabName === 'estoque') renderEstoque(allEstoqueItems);
        else if (tabName === 'nota-fiscal') handleNotaFiscalTab(nfState, setNfState, { parseCsvData });
        else if (tabName === 'sede') renderSedeReport();
    }

    function initApp() {
        // Obter referências
        filtroServicoEl = document.getElementById('filtro-servico');
        filtroEstadoEl = document.getElementById('filtro-estado');
        filtroBuscaEl = document.getElementById('filtro-busca');
        filtroDoacaoEl = document.getElementById('filtro-doacao');
        mainContentAreaEl = document.getElementById('main-content-area');
        verResumoGeralBtn = document.getElementById('ver-resumo-geral-btn');
        navButtons = document.querySelectorAll('.nav-btn');
        contentPanes = document.querySelectorAll('main > div[id^="content-"]');
        mainContentEstoqueEl = document.getElementById('main-content-estoque');
        filtroEstoqueUnidadeEl = document.getElementById('filtro-estoque-unidade');
        filtroEstoqueBuscaEl = document.getElementById('filtro-estoque-busca');
        connectionStatusEl = document.getElementById('connectionStatus');
        openUnidadeModalBtn = document.getElementById('open-unidade-modal-btn');
        unidadeModal = document.getElementById('unidade-modal');
        modalOverlay = document.getElementById('modal-overlay');
        closeModalBtn = document.getElementById('close-modal-btn');
        unidadeSearchInput = document.getElementById('unidade-search-input');
        unidadeListContainer = document.getElementById('unidade-list-container');
        clearUnidadeSelectionBtn = document.getElementById('clear-unidade-selection-btn');

        // Adicionar Listeners
        [filtroEstadoEl, filtroDoacaoEl].forEach(el => el.addEventListener('change', () => {currentPage = 1; renderApp();}));
        filtroBuscaEl.addEventListener('input', debounce(() => {currentPage = 1; renderApp();}, 400));
        filtroServicoEl.addEventListener('change', function() {
            selectedUnidadeValue = '';
            openUnidadeModalBtn.textContent = 'Selecione uma Unidade...';
            openUnidadeModalBtn.disabled = !this.value;
            if (!this.value) { visaoAtiva = 'boasVindas'; renderApp(); }
            else { mainContentAreaEl.innerHTML = `<div class="card text-center p-10"><p>Agora, por favor, <strong>selecione uma Unidade</strong>.</p></div>`; }
        });
        verResumoGeralBtn.addEventListener('click', () => { dadosOriginais = allItems; tituloDaVisao = 'Inventário Geral Completo'; visaoAtiva = 'resumo'; currentPage = 1; filtroServicoEl.value = ""; openUnidadeModalBtn.disabled = true; renderApp(); });
        document.addEventListener('click', (e) => { if (e.target.dataset.page) { currentPage = parseInt(e.target.dataset.page); renderApp(); } });
        navButtons.forEach(button => button.addEventListener('click', () => switchTab(button.dataset.tab)));
        filtroEstoqueBuscaEl.addEventListener('input', debounce(() => renderEstoque(allEstoqueItems), 400));
        filtroEstoqueUnidadeEl.addEventListener('change', () => renderEstoque(allEstoqueItems));
        
        // Modal Listeners
        openUnidadeModalBtn.addEventListener('click', () => { populateUnidadeModalList(); unidadeModal.classList.remove('hidden'); });
        closeModalBtn.addEventListener('click', () => unidadeModal.classList.add('hidden'));
        modalOverlay.addEventListener('click', () => unidadeModal.classList.add('hidden'));
        unidadeSearchInput.addEventListener('input', debounce((e) => populateUnidadeModalList(e.target.value), 300));
        unidadeListContainer.addEventListener('click', (e) => {
            const li = e.target.closest('li[data-value]');
            if (li) {
                selectedUnidadeValue = li.dataset.value;
                openUnidadeModalBtn.textContent = li.dataset.text;
                unidadeModal.classList.add('hidden');
                currentPage=1;
                dadosOriginais = allItems.filter(item => item.unit_condition === selectedUnidadeValue && item.id.startsWith(`${filtroServicoEl.value}_`));
                tituloDaVisao = `Inventário de ${openUnidadeModalBtn.textContent}`;
                visaoAtiva = 'unidade';
                renderApp();
            }
        });
        clearUnidadeSelectionBtn.addEventListener('click', () => { selectedUnidadeValue = ''; openUnidadeModalBtn.textContent = 'Selecione uma Unidade...'; unidadeModal.classList.add('hidden'); });
        
        // Sede Tab Listeners
        let currentSedeFilter = 'all', currentSedeFloor = 'Todos';
        document.getElementById('searchBoxSede').addEventListener('input', debounce(renderSedeReport, 300));
        document.getElementById('filterAllSede').addEventListener('click', function() { currentSedeFilter = 'all'; document.querySelectorAll('#content-sede .filter-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); renderSedeReport(); });
        document.getElementById('filterNoRegistrySede').addEventListener('click', function() { currentSedeFilter = 'no-registry'; document.querySelectorAll('#content-sede .filter-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); renderSedeReport(); });
        const floorNavContainer = document.getElementById('sede-floor-nav');
        floorNavContainer.innerHTML = ['Todos', 'SUBSOLO', 'TÉRREO', 'MEZANINO', '1º ANDAR', '2º ANDAR', '3º ANDAR', 'PENDENTE'].map(f => `<button class="floor-nav-button ${f === 'Todos' ? 'active' : ''}" data-floor="${f}">${f}</button>`).join('');
        floorNavContainer.querySelectorAll('.floor-nav-button').forEach(btn => btn.addEventListener('click', () => { currentSedeFloor = btn.dataset.floor; floorNavContainer.querySelector('.active').classList.remove('active'); btn.classList.add('active'); renderSedeReport(); }));

        function populateUnidadeModalList(searchTerm = "") {
            const servico = filtroServicoEl.value;
            const unidades = [...new Set(allItems.filter(i => i.id.startsWith(`${servico}_`)).map(i => i.unit_condition))].map(u => ({value: u, text: formatUnitName(allItems.find(i=>i.unit_condition === u))})).sort((a,b) => a.text.localeCompare(b.text));
            const filtered = unidades.filter(u => normalizeString(u.text).includes(normalizeString(searchTerm)));
            unidadeListContainer.innerHTML = filtered.length > 0 ? filtered.map(u => `<li data-value="${u.value}" data-text="${u.text}" class="p-3 rounded-md hover:bg-slate-100 cursor-pointer">${u.text}</li>`).join('') : `<li class="p-3 text-center">Nenhuma unidade.</li>`;
        }
    }
    
    function updateDynamicDOMReferences() {
        tableBodyEl = document.getElementById('inventory-table-body');
        paginationControlsEl = document.getElementById('pagination-controls');
    }
    
    // --- CARGA INICIAL DOS DADOS ---
    initApp();
    connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></span> <span>A conectar...</span>`;

    try {
        const patrimonioData = await dataManager.fetchWithCache(googleSheetPatrimonioUrl, 'patrimonio');
        if (!patrimonioData || !Array.isArray(patrimonioData)) {
            throw new Error("Nenhum dado de patrimônio foi retornado. Verifique a planilha e o script.");
        }
        allItems = formatSheetData(patrimonioData);
        connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-green-500 rounded-full"></span> <span>Conectado</span>`;
        document.getElementById('last-update-time').textContent = `Dados de ${new Date().toLocaleDateString('pt-BR')}`;
        
        // Popular filtros com base nos dados carregados
        const allStates = [...new Set(allItems.map(item => item.state))];
        filtroEstadoEl.innerHTML = '<option value="">TODOS</option>' + ['Novo', 'Bom', 'Regular', 'Avariado'].filter(s => allStates.includes(s)).map(s => `<option value="${s}">${s.toUpperCase()}</option>`).join('');

        switchTab('dashboard');
    } catch (error) {
        console.error('Erro fatal ao inicializar o painel:', error);
        connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-red-500 rounded-full"></span> <span class="text-red-500">Erro de Conexão</span>`;
        
        let userMessage = 'Não foi possível carregar os dados do patrimônio.';
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            userMessage = 'Ocorreu um erro de rede. Verifique sua conexão com a internet e se o acesso às Planilhas Google não está bloqueado.';
        } else if (error.message.includes('Nenhum dado de patrimônio foi retornado')) {
            userMessage = 'A planilha de dados parece estar vazia ou com o formato incorreto.';
        }

        const errorContainer = document.getElementById('content-dashboard');
        if (errorContainer) {
            navButtons.forEach(btn => btn.disabled = true);
            document.querySelector('.nav-btn[data-tab="dashboard"]').classList.add('active');
            errorContainer.classList.remove('hidden');
            errorContainer.innerHTML = `
                <div class="alert alert-error">
                    <h2 class="font-bold text-lg">Falha ao Carregar os Dados</h2>
                    <p class="mt-2">${userMessage}</p>
                    <p class="text-sm mt-4">
                        <strong>Ação Sugerida:</strong> Verifique se a Planilha Google está "Publicada na web". Se o erro persistir, a planilha pode estar offline ou suas permissões foram alteradas.
                    </p>
                    <p class="text-xs mt-2 text-slate-500">
                        <strong>Detalhe técnico:</strong> ${error.message}
                    </p>
                </div>`;
        }
    }
});
