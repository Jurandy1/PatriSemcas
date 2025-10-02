// =================================================================
// ARQUIVO JAVASCRIPT CONSOLIDADO PARA O PAINEL DE PATRIMÔNIO
// Versão 3.1 - Otimizada e Responsiva
// =================================================================

// --- DADOS DA SEDE ---
const sedeData = [
    // SUBSOLO
    { local: "SUBSOLO", sala: "SALA 1", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE ALMOXARIFADO E PATRIMÔNIO", registro: "140.32 - SUPERINTENDÊNCIA DE ADMINISTRAÇÃO", observacao: "" }] },
    { local: "SUBSOLO", sala: "SALA 2", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE ARQUIVO E PROTOCOLO", registro: "140.88 - DIRETORIA TÉCNICA DE ARQUIVO E PROTOCOLO", observacao: "" }] },
    { local: "SUBSOLO", sala: "SALA 3", tipo: "SALA INDIVIDUAL", setores: [{ nome: "SERVIÇOS GERAIS (LSL)", registro: "140.101 - SERVIÇOS GERAIS", observacao: "" }] },
    { local: "SUBSOLO", sala: "SALA 4", tipo: "SALA INDIVIDUAL", setores: [{ nome: "COORDENAÇÃO DE ADMINISTRAÇÃO E PATRIMÔNIO", registro: "140.1 - COORDENAÇÃO DE MATERIAL E PATRIMÔNIO", observacao: "" }] },
    { local: "SUBSOLO", sala: "SALA 5", tipo: "SALA INDIVIDUAL", setores: [{ nome: "ALMOXARIFADO", registro: "", observacao: "Precisa criar identificação no sistema." }] },
    { local: "SUBSOLO", sala: "SALA 6", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE LOGÍSTICA E TRANSPORTE", registro: "140.73 - COORDENAÇÃO DE SUPORTE E LOGÍSTICA / 140.82 - SETOR DE TRANSPORTE", observacao: "Confirmado como mesmo setor. Recomenda-se unificar no sistema (sugerido: manter 140.73)." }] },
    { local: "SUBSOLO", sala: "SALA 7", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE MANUTENÇÃO", registro: "140.96 - DIREToria TÉCNICA DE MANUTENÇÃO", observacao: "" }] },
    
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
        { nome: "SUPERINTENDÊNCIA DE PROTEÇÃO SOCIAL ESPECIAL DE ALTA COMPLEXIDADE", registro: "140.26 - SUPERINTENDÊNCIA DE PROTEÇÃO SOCIAL ESPECIAL DE ALTA COMPLEXidade", observacao: "" },
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
    
    // SETORES PENDENTES
    { local: "PENDENTE", sala: "SETORES PENDENTES DE LOCALIZAÇÃO", tipo: "PENDENTE", setores: [
        { nome: "SUPERINTENDÊNCIA DE ENFRENTAMENTO À VIOLAÇÃO DE DIREITOS", registro: "140.30 - SUPERINTENDÊNCIA DE ENFRENTAMENTO À VIOLAÇÃO DE DIREITOS", observacao: "Localização na sede não confirmada." },
        { nome: "COORDENAÇÃO DE RESGATE E VIGILÂNCIA SOCIAL", registro: "140.45 - COORDENAÇÃO DE RESGATE E VIGILÂNCIA SOCIAL", observacao: "Localização na sede não confirmada." },
        { nome: "COORDENAÇÃO DE INCLUSÃO SOCIOPRODUTIVA", registro: "140.47 - COORDENAÇÃO DE INCLUSÃO SOCIOPRODUTIVA", observacao: "Localização na sede não confirmada." }
    ]}
];

// --- LÓGICA DA ABA NOTA FISCAL (Layout de Acordeão) ---
async function handleNotaFiscalTab(state, setState, dependencies) {
    const { parseCsvData } = dependencies;
    const accordionContainer = document.getElementById('nf-accordion-container');
    const googleSheetNfEstoqueUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtSzFDAc1vJ4oIKsHCCe2xnw2OmUBdLCMIP4lPS1JTT5b2cnIctkRVK_0qe5yklF1EiR56QZeiBSfE/pub?gid=0&output=csv';
    const googleSheetNfMovimentacoesUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTtSzFDAc1vJ4oIKsHCCe2xnw2OmUBdLCMIP4lPS1JTT5b2cnIctkRVK_0qe5yklF1EiR56QZeiBSfE/pub?gid=1261246825&output=csv';

    async function fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro HTTP ${response.status} ao buscar dados.`);
        return response.text();
    }

    function processNfData(rawData, parseCsvDataFunc) {
        const estoque = parseCsvDataFunc(rawData.estoque);
        const movimentacoes = parseCsvDataFunc(rawData.movimentacoes);
        const groupedByNf = estoque.reduce((acc, item) => {
            const nf = item.NF;
            if (nf) {
                if (!acc[nf]) acc[nf] = [];
                acc[nf].push(item);
            }
            return acc;
        }, {});

        return Object.entries(groupedByNf).map(([nfNum, itemsInNf]) => {
            const firstItem = itemsInNf[0];
            const nfObject = {
                numero: nfNum,
                fornecedor: firstItem['Nome Fornecedor'],
                data: firstItem['Data NF'],
                valorTotal: 0,
                totalItens: 0,
                itens: {}
            };

            const groupedByDesc = itemsInNf.reduce((acc, item) => {
                const desc = item.Descrição;
                if(desc) {
                    if (!acc[desc]) acc[desc] = [];
                    acc[desc].push(item);
                }
                return acc;
            }, {});

            for (const [desc, itemGroup] of Object.entries(groupedByDesc)) {
                const firstOfGroup = itemGroup[0];
                const quantidade = itemGroup.length;
                const valorUnitario = parseFloat(String(firstOfGroup['Valor NF'] || '0').replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
                
                nfObject.totalItens += quantidade;
                nfObject.valorTotal += quantidade * valorUnitario;
                
                const tombamentos = itemGroup.map(i => i.TOMBAMENTO).filter(Boolean);
                const unidades = tombamentos.reduce((acc, tomb) => {
                    const mov = movimentacoes.find(m => m.Tombamento === tomb);
                    if (mov) {
                        const unidade = mov.Unidade || 'Não especificada';
                        acc[unidade] = (acc[unidade] || 0) + 1;
                    }
                    return acc;
                }, {});

                nfObject.itens[desc] = { descricao: desc, quantidade, valorUnitario, tombamentos, unidades };
            }
            return nfObject;
        }).sort((a, b) => new Date(b.data) - new Date(a.data));
    }
    
    function renderAccordionItemContent(contentDiv, nf) {
        if (contentDiv.innerHTML !== '') return; // Previne re-renderização

        const itemsAgrupados = Object.values(nf.itens);
        const formatTombamentoRange = (tombamentos) => {
            if (!tombamentos || tombamentos.length === 0) return 'N/A';
            const sorted = tombamentos.map(t => parseInt(t, 10)).filter(n => !isNaN(n)).sort((a, b) => a - b);
            return sorted.length > 0 ? `${sorted[0]} ao ${sorted[sorted.length - 1]}` : 'N/A';
        };
        const tableRowsHTML = itemsAgrupados.map(item => `
            <tr class="border-b"><td class="p-2">${item.descricao}</td><td class="p-2 text-center">${item.quantidade}</td><td class="p-2">${formatTombamentoRange(item.tombamentos)}</td><td class="p-2">${Object.entries(item.unidades).map(([u, q]) => `${u} (${q})`).join('<br>')}</td></tr>
        `).join('');

        contentDiv.innerHTML = `
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div class="kpi-nf"><p class="value">${nf.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p><p class="label">Valor Total</p></div>
                <div class="kpi-nf"><p class="value">${nf.totalItens}</p><p class="label">Qtd. de Itens</p></div>
                <div class="kpi-nf col-span-2 lg:col-span-1"><p class="value">${itemsAgrupados.length}</p><p class="label">Tipos de Itens</p></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div><h4 class="font-semibold text-center mb-2">Itens por Unidade</h4><canvas id="nfUnidadesChart-${nf.numero}"></canvas></div>
                <div><h4 class="font-semibold text-center mb-2">Valor por Item</h4><canvas id="nfValorChart-${nf.numero}"></canvas></div>
            </div>
            <div><h4 class="font-semibold mb-2">Resumo dos Itens</h4><div class="overflow-x-auto border rounded-lg"><table class="w-full text-sm"><thead><tr class="bg-slate-100"><th class="p-2">Descrição</th><th class="p-2 text-center">Qtd</th><th class="p-2">Tombamento</th><th class="p-2">Destino</th></tr></thead><tbody>${tableRowsHTML}</tbody></table></div></div>
        `;
        
        // Renderiza Gráficos
        const unidadesData = itemsAgrupados.reduce((acc, item) => { Object.entries(item.unidades).forEach(([u, q]) => { acc[u] = (acc[u] || 0) + q; }); return acc; }, {});
        new Chart(document.getElementById(`nfUnidadesChart-${nf.numero}`), { type: 'doughnut', data: { labels: Object.keys(unidadesData), datasets: [{ data: Object.values(unidadesData) }] }, options: { responsive: true, plugins: { legend: { position: 'bottom' } } } });
        
        const valorData = itemsAgrupados.map(item => ({ label: item.descricao, value: item.quantidade * item.valorUnitario })).sort((a,b) => b.value - a.value);
        new Chart(document.getElementById(`nfValorChart-${nf.numero}`), { type: 'bar', data: { labels: valorData.map(d => d.label), datasets: [{ data: valorData.map(d => d.value), backgroundColor: '#667eea' }] }, options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } } } });
    }

    function renderNfView(nfData) {
        if (!accordionContainer) return;
        accordionContainer.innerHTML = nfData.map(nf => `
            <details class="nf-accordion-item bg-white rounded-lg shadow-sm mb-3" data-nf-numero="${nf.numero}">
                <summary>
                    <div class="flex flex-col md:flex-row md:items-center justify-between w-full">
                        <div>
                            <p class="font-bold text-slate-800">${nf.fornecedor}</p>
                            <p class="text-sm text-slate-500">NF: ${nf.numero} | Data: ${new Date(nf.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
                        </div>
                        <p class="font-semibold text-blue-600 mt-2 md:mt-0">${nf.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                </summary>
                <div class="nf-details-content"></div>
            </details>
        `).join('');

        accordionContainer.querySelectorAll('.nf-accordion-item').forEach(detailsEl => {
            detailsEl.addEventListener('toggle', (event) => {
                if (event.target.open) {
                    const nf = nfData.find(n => n.numero === event.target.dataset.nfNumero);
                    renderAccordionItemContent(event.target.querySelector('.nf-details-content'), nf);
                }
            });
        });
    }

    if (state.data.length > 0) { renderNfView(state.data); return; }
    if (document.body.classList.contains('nf-loading')) return;

    document.body.classList.add('nf-loading');
    accordionContainer.innerHTML = `<div class="card text-center p-10"><div class="loading-spinner"></div><p class="mt-4">Carregando dados...</p></div>`;
    
    try {
        const [estoqueCsv, movCsv] = await Promise.all([fetchData(googleSheetNfEstoqueUrl), fetchData(googleSheetNfMovimentacoesUrl)]);
        const newData = processNfData({ estoque: estoqueCsv, movimentacoes: movCsv }, parseCsvData);
        setState({ ...state, data: newData }); 
        renderNfView(newData);
    } catch (error) {
        accordionContainer.innerHTML = `<div class="card text-center p-10"><div class="alert alert-error"><strong>Erro:</strong> ${error.message}</div></div>`;
    } finally {
        document.body.classList.remove('nf-loading');
    }
}

// --- LÓGICA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', async () => {

    let googleSheetPatrimonioUrl = 'https://script.google.com/macros/s/AKfycbypxSVE9syiII4H4DumAfxWEgFm1AE7qLpuQgqHTNLMi4B7I8dWF0Het7V2Cd4_aL58Mg/exec';
    const googleSheetEstoqueUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRtgMcUrrMlaEW0BvLD1466J1geRMzLkv6iZ5QpdY53BH6bc38SMinDvC1C-iI9RKHIcWqTjRf4ccdk/pub?output=csv';

    let allItems = [], dadosOriginais = [], allEstoqueItems = [];
    let visaoAtiva = 'dashboard', tituloDaVisao = 'Dashboard', selectedUnidadeValue = '';
    let currentPage = 1, itemsPerPage = 20;
    let estadoChartInstance, estoqueChartInstance, dashboardEstadoChartInstance, dashboardTopItemsChartInstance;
    let nfState = { data: [], charts: {} };
    const setNfState = (newState) => { nfState = newState; };

    let filtroServicoEl, filtroEstadoEl, filtroBuscaEl, filtroDoacaoEl, mainContentAreaEl, verResumoGeralBtn, tableBodyEl, paginationControlsEl, navButtons, contentPanes, mainContentEstoqueEl, filtroEstoqueUnidadeEl, filtroEstoqueBuscaEl, filtroTotalCategoriaEl, filtroTotalItemEl, filtroTotalUnidadeEl, filtroTotalEstadoEl, openUnidadeModalBtn, unidadeModal, modalOverlay, closeModalBtn, unidadeSearchInput, unidadeListContainer, clearUnidadeSelectionBtn, connectionStatusEl;
    let toggleAdvancedFiltersBtn, advancedFiltersContainerEl, filtroTombamentoEl, filtroDescricaoEl, filtroLocalEl, filtroFornecedorEl, filtroObservacaoEl;

    class DataManager {
        constructor() { this.cacheKey = 'dashboard_cache_v6'; this.cacheExpiry = 5 * 60 * 1000; this.loadingPromises = new Map(); }
        async fetchWithCache(url, key, type = 'json') {
            const cached = this.getFromCache(key);
            if (cached && (Date.now() - cached.timestamp < this.cacheExpiry)) {
                console.log(`Loading ${key} from cache.`);
                updateLastUpdateTime(true);
                return cached.data;
            }
            console.log(`Fetching ${key} from network.`);
            updateLastUpdateTime(false);
            if (this.loadingPromises.has(key)) return this.loadingPromises.get(key);
            const promise = this.fetchData(url, type).then(data => { this.saveToCache(key, data); this.loadingPromises.delete(key); return data; }).catch(error => { this.loadingPromises.delete(key); throw error; });
            this.loadingPromises.set(key, promise);
            return promise;
        }
        async fetchData(url, type) { const response = await fetch(url); if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); if (type === 'json') { const rawData = await response.json(); if (rawData && rawData.error) throw new Error(`Erro do Apps Script: ${rawData.error}`); return Array.isArray(rawData) ? rawData : (rawData && Array.isArray(rawData.content)) ? rawData.content : null; } return response.text(); }
        saveToCache(key, data) { try { const cache = this.getAllCache(); cache[key] = { data, timestamp: Date.now() }; localStorage.setItem(this.cacheKey, JSON.stringify(cache)); } catch (e) { console.warn("Cache full, clearing."); localStorage.removeItem(this.cacheKey); } }
        getFromCache(key) { const cache = this.getAllCache(); return cache[key] || null; }
        getAllCache() { try { return JSON.parse(localStorage.getItem(this.cacheKey)) || {}; } catch { return {}; } }
    }
    const dataManager = new DataManager();

    function updateLastUpdateTime(isCached) {
        const timeEl = document.getElementById('last-update-time');
        if (timeEl) {
            const cacheText = isCached ? `<span class="font-normal text-slate-400">(dados em cache)</span>` : '';
            timeEl.innerHTML = `Dados de ${new Date().toLocaleDateString('pt-BR')} ${cacheText}`;
        }
    }

    function parseCsvData(csvText) {
        const lines = csvText.trim().split(/\r\n|\n/);
        if (lines.length < 2) return [];
        const headerLine = lines[0]; const delimiter = headerLine.includes(';') ? ';' : ',';
        const headers = headerLine.split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
        return lines.slice(1).map(line => {
            if (line.trim() === '') return null;
            const values = line.split(new RegExp(`${delimiter}(?=(?:(?:[^"]*"){2})*[^"]*$)`));
            const item = {};
            headers.forEach((header, i) => item[header] = values[i] ? values[i].trim().replace(/^"|"$/g, '') : '');
            return item;
        }).filter(Boolean);
    }

    const normalizeString = (str) => str ? String(str).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
    const debounce = (func, delay) => { let t; return function(...a) { clearTimeout(t); t = setTimeout(() => func.apply(this, a), delay); }; };
    const capitalizeWords = (str) => str ? str.toLowerCase().replace(/([^\s/]+)/g, w => w.charAt(0).toUpperCase() + w.slice(1)) : "";
    const getServiceKey = (s) => { const n = (s || '').toLowerCase().trim(); if (n === 'conselho' || n === 'ct') return 'conselho'; if (n.includes('cras')) return 'cras'; if (n.includes('creas')) return 'creas'; if (n.includes('externa')) return 'externa'; if (n.includes('centro pop')) return 'centro_pop'; if (n.includes('abrigo')) return 'abrigo'; if (n.includes('sede')) return 'sede'; return 'item'; };
    const stateColors = { 'Novo': { bg: 'badge-green', text: 'text-green-800', hex: '#16a34a' }, 'Bom': { bg: 'badge-blue', text: 'text-blue-800', hex: '#2563eb' }, 'Regular': { bg: 'badge-yellow', text: 'text-yellow-800', hex: '#facc15' }, 'Avariado': { bg: 'badge-red', text: 'text-red-800', hex: '#dc2626' } };
    
    function formatSheetData(sheetData) {
        return sheetData.map((row, index) => {
            let finalState = row.Estado || 'Regular';
            if (/(avariado|defeito|danificado|não funciona|nao funciona)/.test((row['Observação'] || '').toLowerCase()) || /(defeito|avaria|danificado|nao funciona)/.test(normalizeString(finalState))) finalState = 'Avariado';
            return { id: `${getServiceKey(row.Tipo)}_${index}`, tombamento: (row['Tombamento'] || '').trim() || 'S/T', type: row.Tipo || 'N/A', description: row['Descrição'] || 'N/A', unit_condition: capitalizeWords((row.Unidade || 'N/A').trim()), quantity: parseInt(row.Quantidade, 10) || 1, location: row['Localização'] || 'N/A', state: finalState, donation_source: (row['Origem da Doação'] || '').trim().replace(/^-$|N\/A/i, ''), observation: (row['Observação'] || '').trim().replace(/^-$|N\/A/i, ''), supplier: (row.Fornecedor || '').trim().replace(/^-$|N\/A/i, '') };
        });
    }

    function agruparItens(items) {
        return Object.values((items || []).reduce((acc, item) => {
            const key = `${normalizeString(item.description)}-${item.state}-${normalizeString(item.unit_condition)}-${normalizeString(item.location)}`;
            if (acc[key]) acc[key].quantity += item.quantity;
            else acc[key] = { ...item };
            return acc;
        }, {}));
    }

    function formatUnitName(item) {
        let name = item.unit_condition; const type = item.type.toUpperCase();
        if ((type === 'CRAS' || type === 'CREAS' || type === 'CT') && !name.toUpperCase().startsWith(type)) return `${type} ${name}`;
        return name;
    }

    function renderTable(itemsToDisplay, totalItemsCount) {
        if (!tableBodyEl) return;
        tableBodyEl.innerHTML = itemsToDisplay.length === 0 ? `<tr><td colspan="10" class="text-center py-10 text-slate-500">Nenhum item encontrado.</td></tr>` : itemsToDisplay.map(item => `<tr class="border-b border-slate-200"><td class="px-6 py-4 font-mono text-xs">${item.tombamento}</td><td class="px-6 py-4">${item.type}</td><td class="px-6 py-4 font-medium text-slate-900">${item.description}</td><td class="px-6 py-4">${formatUnitName(item)}</td><td class="px-6 py-4 text-center">${item.quantity}</td><td class="px-6 py-4">${item.location}</td><td class="px-6 py-4"><span class="badge ${stateColors[item.state]?.bg} ${stateColors[item.state]?.text}">${item.state}</span></td><td class="px-6 py-4">${item.donation_source || 'N/A'}</td><td class="px-6 py-4">${item.observation || 'N/A'}</td><td class="px-6 py-4">${item.supplier || 'N/A'}</td></tr>`).join('');
        renderPagination(totalItemsCount, Math.ceil(totalItemsCount / itemsPerPage));
    }

    function renderPagination(totalItems, totalPages) {
        if (!paginationControlsEl) return;
        paginationControlsEl.innerHTML = (totalPages <= 1) ? '' : `<span class="text-sm text-slate-600">Mostrando ${Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} a ${Math.min(currentPage * itemsPerPage, totalItems)} de ${totalItems}</span><div class="inline-flex"><button data-page="${currentPage - 1}" class="px-4 py-2 text-sm border rounded-l-lg hover:bg-slate-100 disabled:opacity-50" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button><button data-page="${currentPage + 1}" class="px-4 py-2 text-sm border rounded-r-lg hover:bg-slate-100 disabled:opacity-50" ${currentPage === totalPages ? 'disabled' : ''}>Próximo</button></div>`;
    }

    function getFilteredItems(sourceData) {
        const servico = filtroServicoEl.value;
        const unidade = selectedUnidadeValue;
        const estado = filtroEstadoEl.value;
        const doacao = filtroDoacaoEl.value;
        const busca = filtroBuscaEl.value.toLowerCase();
        const tombamento = filtroTombamentoEl.value.toLowerCase();
        const descricao = filtroDescricaoEl.value.toLowerCase();
        const local = filtroLocalEl.value.toLowerCase();
        const fornecedor = filtroFornecedorEl.value.toLowerCase();
        const observacao = filtroObservacaoEl.value.toLowerCase();
    
        const hasActiveFilter = servico || unidade || estado || doacao || busca || tombamento || descricao || local || fornecedor || observacao;
        if (!hasActiveFilter) return sourceData;
    
        return sourceData.filter(item => 
            (!servico || item.id.startsWith(`${servico}_`)) &&
            (!unidade || item.unit_condition === unidade) &&
            (!estado || item.state === estado) &&
            (!doacao || (doacao === 'sim' && item.donation_source) || (doacao === 'nao' && !item.donation_source)) &&
            (!tombamento || (item.tombamento || '').toLowerCase().includes(tombamento)) &&
            (!descricao || (item.description || '').toLowerCase().includes(descricao)) &&
            (!local || (item.location || '').toLowerCase().includes(local)) &&
            (!fornecedor || (item.supplier || '').toLowerCase().includes(fornecedor)) &&
            (!observacao || (item.observation || '').toLowerCase().includes(observacao)) &&
            (!busca || Object.values(item).some(val => String(val).toLowerCase().includes(busca)))
        );
    }
    
    function GerarRelatorioUnidade(dados) {
        if (!dados || dados.length === 0) return "Nenhum dado disponível.";
        const stateCounts = dados.reduce((acc, item) => { acc[item.state] = (acc[item.state] || 0) + item.quantity; return acc; }, {Novo:0, Bom:0, Regular:0, Avariado:0});
        const total = Object.values(stateCounts).reduce((s, c) => s + c, 0);
        return `A unidade possui <strong>${total}</strong> itens (filtro atual).<br>Situação: <strong>${stateCounts.Novo}</strong> novos, <strong>${stateCounts.Bom}</strong> bons, <strong>${stateCounts.Regular}</strong> regulares e <strong>${stateCounts.Avariado}</strong> avariados.`;
    }

    function renderApp() {
        if (estadoChartInstance) estadoChartInstance.destroy();
        const currentFilteredData = getFilteredItems(dadosOriginais);
        const filteredAndGroupedItems = agruparItens(currentFilteredData);
        if (visaoAtiva === 'boasVindas') mainContentAreaEl.innerHTML = `<div class="text-center p-10 card"><p class="text-xl">Selecione um <strong>Tipo de Unidade</strong> ou clique em <strong>Ver Inventário Completo</strong>.</p></div>`;
        else if (visaoAtiva === 'unidade' || visaoAtiva === 'resumo') {
            const reportContent = visaoAtiva === 'unidade' ? `<div class="lg:col-span-3 card"><h3 class="text-xl font-bold mb-4">Relatório Descritivo</h3><div class="text-slate-600 space-y-2">${GerarRelatorioUnidade(currentFilteredData)}</div></div>` : '';
            mainContentAreaEl.innerHTML = `<div><h2 class="text-3xl font-bold mb-6">${tituloDaVisao}</h2><div class="grid grid-cols-1 lg:grid-cols-5 gap-6"><div class="lg:col-span-2 card"><div class="chart-container"><canvas id="estadoChart"></canvas></div></div>${reportContent}</div><h2 class="text-2xl font-bold mt-8 mb-6">Inventário Detalhado</h2><div class="card p-0 overflow-x-auto"><table class="table w-full text-sm"><thead><tr><th>Tomb.</th><th>Tipo</th><th>Descrição</th><th>Unidade</th><th class="text-center">Qtd</th><th>Local</th><th>Estado</th><th>Doação</th><th>Obs.</th><th>Forn.</th></tr></thead><tbody id="inventory-table-body"></tbody></table></div><div id="pagination-controls" class="flex items-center justify-between mt-6"></div></div>`;
            updateDynamicDOMReferences();
            renderTable(filteredAndGroupedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), filteredAndGroupedItems.length);
            const chartData = ['Novo', 'Bom', 'Regular', 'Avariado'].map(state => currentFilteredData.filter(i => i.state === state).reduce((sum, i) => sum + i.quantity, 0));
            estadoChartInstance = new Chart(document.getElementById('estadoChart'), { type: 'bar', data: { labels: ['Novo', 'Bom', 'Regular', 'Avariado'], datasets: [{ label: 'Qtd.', data: chartData, backgroundColor: ['#16a34a', '#2563eb', '#facc15', '#dc2626'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
        }
    }
    
    function renderEstoque() {
        if (!mainContentEstoqueEl) return;
        mainContentEstoqueEl.innerHTML = '';
        if (allEstoqueItems.length === 0) { mainContentEstoqueEl.innerHTML = `<div class="card text-center p-10"><p>Nenhum item de estoque encontrado.</p></div>`; return; }
        const busca = filtroEstoqueBuscaEl.value.toLowerCase(), unidade = filtroEstoqueUnidadeEl.value;
        const filteredItems = allEstoqueItems.filter(item => (!unidade || item.Unidade === unidade) && (!busca || (item.Item || '').toLowerCase().includes(busca)));
        if (filteredItems.length === 0) { mainContentEstoqueEl.innerHTML = `<div class="card text-center p-10"><p>Nenhum item encontrado para os filtros.</p></div>`; return; }
        const headers = Object.keys(filteredItems[0] || {});
        mainContentEstoqueEl.innerHTML = `<div class="card p-0 overflow-x-auto"><table class="table w-full text-sm"><thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${filteredItems.map(item => `<tr>${headers.map(h => `<td>${item[h] || ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
        const estoqueData = filteredItems.reduce((acc, item) => { const desc = item.Item || 'N/D'; const qty = parseInt(item.Quantidade, 10) || 0; acc[desc] = (acc[desc] || 0) + qty; return acc; }, {});
        const top10 = Object.entries(estoqueData).sort((a, b) => b[1] - a[1]).slice(0, 10);
        if (estoqueChartInstance) estoqueChartInstance.destroy();
        estoqueChartInstance = new Chart(document.getElementById('estoqueBarChart'), { type: 'bar', data: { labels: top10.map(i => i[0]), datasets: [{ label: 'Qtd.', data: top10.map(i => i[1]), backgroundColor: '#36a2eb' }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
    }

    function renderDashboard() {
        if (!allItems || allItems.length === 0) return;
        const totalItens = allItems.reduce((s, i) => s + i.quantity, 0), totalUnidades = new Set(allItems.map(i => i.unit_condition)).size, totalAvariados = allItems.filter(i => i.state === 'Avariado').reduce((s, i) => s + i.quantity, 0);
        const unitsData = [...allItems.reduce((map, item) => { if (item.type !== 'Sede') { const name = formatUnitName(item); if (!map.has(name)) map.set(name, { name, avariados: 0, regulares: 0, totalItems: 0, items: [] }); const unit = map.get(name); unit.items.push(item); unit.totalItems += item.quantity; if (item.state === 'Avariado') unit.avariados += item.quantity; if (item.state === 'Regular') unit.regulares += item.quantity; } return map; }, new Map()).values()];
        unitsData.forEach(u => u.attentionScore = u.totalItems > 0 ? ((u.avariados * 3) + u.regulares) / u.totalItems : 0);
        const attention = unitsData.filter(u => u.attentionScore > 0).sort((a,b) => b.attentionScore - a.attentionScore).slice(0, 10);
        const noBebedouro = unitsData.filter(u => !u.items.some(i => normalizeString(i.description).includes('bebedouro') && i.state !== 'Avariado')).slice(0, 10);
        document.getElementById('kpi-total-itens').textContent = totalItens; document.getElementById('kpi-total-unidades').textContent = totalUnidades; document.getElementById('kpi-total-avariados').textContent = totalAvariados; document.getElementById('kpi-unidades-atencao').textContent = attention.length;
        if(dashboardEstadoChartInstance) dashboardEstadoChartInstance.destroy();
        dashboardEstadoChartInstance = new Chart(document.getElementById('dashboardEstadoChart'), { type: 'doughnut', data: { labels: ['Novo', 'Bom', 'Regular', 'Avariado'], datasets: [{ data: ['Novo','Bom','Regular','Avariado'].map(s=>allItems.filter(i=>i.state===s).reduce((sum,i)=>sum+i.quantity,0)), backgroundColor: Object.values(stateColors).map(c=>c.hex) }] }, options: { responsive: true, maintainAspectRatio: false } });
        document.getElementById('dashboard-attention-units-list').innerHTML = attention.length > 0 ? attention.map(u => `<p class="text-sm">${u.name} <span class="font-bold text-yellow-500">(${u.avariados} avariados, ${u.regulares} reg.)</span></p>`).join('') : '<p>Nenhuma unidade em atenção.</p>';
        document.getElementById('dashboard-no-bebedouro-units-list').innerHTML = noBebedouro.length > 0 ? noBebedouro.map(u => `<p class="text-sm">${u.name}</p>`).join('') : '<p>Todas as unidades têm bebedouro.</p>';
    }

    let currentSedeFilter = 'all', currentSedeFloor = 'Todos';
    function renderSedeReport() {
        const roomsContainer = document.getElementById('sede-rooms-container');
        const searchTerm = document.getElementById('searchBoxSede').value.toLowerCase();
        const filteredData = sedeData.filter(item => (currentSedeFloor === 'Todos' || item.local === currentSedeFloor) && (item.sala.toLowerCase().includes(searchTerm) || item.tipo.toLowerCase().includes(searchTerm) || item.local.toLowerCase().includes(searchTerm) || item.setores.some(s=>s.nome.toLowerCase().includes(searchTerm) || (s.registro && s.registro.toLowerCase().includes(searchTerm)))) && (currentSedeFilter !== 'no-registry' || item.setores.some(s => !s.registro || s.observacao)));
        document.getElementById('noResultsSede').style.display = filteredData.length === 0 ? 'block' : 'none';
        roomsContainer.innerHTML = filteredData.map(room => `<div class="room-card-sede ${room.setores.some(s => !s.registro || s.observacao) ? 'no-registry' : ''}"><div class="room-card-header"><p class="room-card-subtitle">${room.local} - ${room.tipo}</p><h3 class="room-card-title">${room.sala}</h3></div><div class="room-card-body">${room.setores.map(setor => `<div class="department-item-sede"><p class="department-name-sede">${setor.nome}</p><p class="department-registro-sede">Registro: ${setor.registro || 'N/A'}</p>${setor.observacao ? `<p class="department-observacao-sede">${setor.observacao}</p>` : ''}</div>`).join('')}</div></div>`).join('');
    }

    function populateTotalItensFilters() { if (!allItems || allItems.length === 0) return; const cats = [...new Set(allItems.map(i => i.type))].sort(); filtroTotalCategoriaEl.innerHTML = '<option value="">TODAS</option>' + cats.map(c => `<option value="${c}">${c.toUpperCase()}</option>`).join(''); populateTotalItensUnidades(); const states = [...new Set(allItems.map(i => i.state))]; filtroTotalEstadoEl.innerHTML = '<option value="">TODOS</option>' + ['Novo','Bom','Regular','Avariado'].filter(s=>states.includes(s)).map(s=>`<option value="${s}">${s.toUpperCase()}</option>`).join(''); }
    function populateTotalItensUnidades() { const cat = filtroTotalCategoriaEl.value; let items = cat ? allItems.filter(i => i.type === cat) : allItems; const unidades = [...new Set(items.map(formatUnitName))].sort(); filtroTotalUnidadeEl.innerHTML = '<option value="">TODAS</option>' + unidades.map(u => `<option value="${u}">${u.toUpperCase()}</option>`).join(''); }
    function renderTotalItens() {
        const list = document.getElementById('total-itens-list'), details = document.getElementById('total-itens-details-container'), countEl = document.getElementById('total-itens-list-count');
        if(!list || !details) return;
        const cat = filtroTotalCategoriaEl.value, search = filtroTotalItemEl.value.toLowerCase(), unidade = filtroTotalUnidadeEl.value, estado = filtroTotalEstadoEl.value;
        let data = allItems.filter(i => (!cat || i.type === cat) && (!unidade || formatUnitName(i) === unidade) && (!estado || i.state === estado) && (!search || i.description.toLowerCase().includes(search)));
        const grouped = data.reduce((acc, item) => { const d = item.description; if(!acc[d]) acc[d] = {total:0, type:item.type, items:[]}; acc[d].total+=item.quantity; acc[d].items.push(item); return acc; }, {});
        const sorted = Object.keys(grouped).sort();
        countEl.textContent = `${sorted.length} itens encontrados`;
        list.innerHTML = sorted.length === 0 ? `<div class="p-4 text-center">Nenhum item.</div>` : sorted.map(d => `<div class="total-item-entry" data-item-name="${d}"><div class="flex justify-between items-center"><span class="font-medium truncate pr-2">${d}</span><span class="text-sm font-bold bg-slate-200 rounded-full px-2 py-0.5">${grouped[d].total}</span></div><div class="text-xs text-slate-500">${grouped[d].type}</div></div>`).join('');
        list.querySelectorAll('.total-item-entry').forEach(el => el.addEventListener('click', e => { list.querySelector('.selected')?.classList.remove('selected'); const item = e.currentTarget; item.classList.add('selected'); renderTotalItemDetails(item.dataset.itemName, grouped[item.dataset.itemName]); }));
        if (sorted.length > 0) list.querySelector('.total-item-entry')?.click();
        else details.innerHTML = '';
    }
    function renderTotalItemDetails(name, data) {
        const details = document.getElementById('total-itens-details-container');
        if(!data) { details.innerHTML = ''; return; }
        const counts = data.items.reduce((acc, i) => { acc[i.state] = (acc[i.state] || 0) + i.quantity; return acc; }, {});
        const dist = data.items.reduce((acc, i) => { const key = `${formatUnitName(i)} >> ${i.location || 'N/D'}`; if(!acc[key]) acc[key] = {qty:0, states: new Set()}; acc[key].qty += i.quantity; acc[key].states.add(i.state); return acc; }, {});
        const statesHTML = Object.entries(stateColors).map(([s, c]) => (counts[s]||0) > 0 ? `<div class="flex items-center gap-2"><span class="h-2 w-2 rounded-full" style="background-color:${c.hex}"></span><span>${s}:</span><span class="font-bold">${counts[s]}</span></div>` : '').join('');
        const distHTML = Object.entries(dist).sort((a,b)=>a[0].localeCompare(b[0])).map(([k,v]) => `<tr class="border-b"><td class="px-4 py-2">${k.replace('>>', '<span class="text-slate-400 mx-2">›</span>')}</td><td class="px-4 py-2 text-center font-bold">${v.qty}</td><td class="px-4 py-2 text-center">${[...v.states].map(s=>`<span class="badge ${stateColors[s]?.bg}">${s}</span>`).join(' ')}</td></tr>`).join('');
        details.innerHTML = `<div class="card fade-in"><h2 class="text-2xl font-bold">${name}</h2><p class="text-sm text-slate-500 mb-4">Total de ${data.total} unidades</p><div class="card bg-slate-50 mb-6"><h4 class="font-semibold mb-2">Resumo por Estado</h4><div class="grid grid-cols-2 gap-2 text-sm">${statesHTML}</div></div><div><h4 class="font-semibold mb-2">Distribuição</h4><div class="max-h-96 overflow-y-auto border rounded-lg"><table class="table w-full text-sm"><thead class="sticky top-0 bg-slate-100"><tr><th>Unidade/Local</th><th class="text-center">Qtd.</th><th class="text-center">Estado</th></tr></thead><tbody>${distHTML}</tbody></table></div></div></div>`;
    }

    async function switchTab(tabName) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.nav-btn[data-tab="${tabName}"]`).classList.add('active');
        contentPanes.forEach(pane => pane.classList.add('hidden'));
        document.getElementById(`content-${tabName}`).classList.remove('hidden');
        visaoAtiva = tabName;
        if (tabName === 'dashboard') renderDashboard();
        else if (tabName === 'patrimonio') { if(!selectedUnidadeValue && !filtroServicoEl.value) { visaoAtiva = 'boasVindas'; renderApp(); } else { handleFilterChange(); } }
        else if (tabName === 'estoque') { if (allEstoqueItems.length === 0) { try { const csv = await dataManager.fetchWithCache(googleSheetEstoqueUrl, 'estoque', 'text'); allEstoqueItems = parseCsvData(csv); const unidades = [...new Set(allEstoqueItems.map(i => i.Unidade || 'N/A'))].sort(); filtroEstoqueUnidadeEl.innerHTML = '<option value="">TODAS</option>' + unidades.map(u => `<option value="${u}">${u.toUpperCase()}</option>`).join(''); } catch(e) { mainContentEstoqueEl.innerHTML = `<div class="card p-10 text-center text-red-600"><strong>Erro:</strong> Não foi possível carregar o estoque.</div>`; } } renderEstoque(); }
        else if (tabName === 'nota-fiscal') handleNotaFiscalTab(nfState, setNfState, { parseCsvData });
        else if (tabName === 'total-itens') { populateTotalItensFilters(); renderTotalItens(); }
        else if (tabName === 'sede') renderSedeReport();
    }

    function handleFilterChange() { currentPage = 1; if(visaoAtiva === 'unidade' || visaoAtiva === 'resumo') { renderApp(); } }

    function initApp() {
        filtroServicoEl = document.getElementById('filtro-servico'); filtroEstadoEl = document.getElementById('filtro-estado'); filtroBuscaEl = document.getElementById('filtro-busca'); filtroDoacaoEl = document.getElementById('filtro-doacao'); mainContentAreaEl = document.getElementById('main-content-area'); verResumoGeralBtn = document.getElementById('ver-resumo-geral-btn'); navButtons = document.querySelectorAll('.nav-btn'); contentPanes = document.querySelectorAll('main > div[id^="content-"]'); mainContentEstoqueEl = document.getElementById('main-content-estoque'); filtroEstoqueUnidadeEl = document.getElementById('filtro-estoque-unidade'); filtroEstoqueBuscaEl = document.getElementById('filtro-estoque-busca'); filtroTotalCategoriaEl = document.getElementById('filtro-total-categoria'); filtroTotalItemEl = document.getElementById('filtro-total-item'); filtroTotalUnidadeEl = document.getElementById('filtro-total-unidade'); filtroTotalEstadoEl = document.getElementById('filtro-total-estado'); connectionStatusEl = document.getElementById('connectionStatus'); openUnidadeModalBtn = document.getElementById('open-unidade-modal-btn'); unidadeModal = document.getElementById('unidade-modal'); modalOverlay = document.getElementById('modal-overlay'); closeModalBtn = document.getElementById('close-modal-btn'); unidadeSearchInput = document.getElementById('unidade-search-input'); unidadeListContainer = document.getElementById('unidade-list-container'); clearUnidadeSelectionBtn = document.getElementById('clear-unidade-selection-btn');
        
        // Elementos dos novos filtros avançados
        toggleAdvancedFiltersBtn = document.getElementById('toggle-advanced-filters-btn');
        advancedFiltersContainerEl = document.getElementById('advanced-filters-container');
        filtroTombamentoEl = document.getElementById('filtro-tombamento');
        filtroDescricaoEl = document.getElementById('filtro-descricao');
        filtroLocalEl = document.getElementById('filtro-local');
        filtroFornecedorEl = document.getElementById('filtro-fornecedor');
        filtroObservacaoEl = document.getElementById('filtro-observacao');

        filtroServicoEl.addEventListener('change', function() { selectedUnidadeValue = ''; openUnidadeModalBtn.textContent = 'Selecione uma Unidade...'; openUnidadeModalBtn.disabled = !this.value; if (!this.value) { visaoAtiva = 'boasVindas'; dadosOriginais = []; renderApp(); } else { visaoAtiva = 'unidade'; dadosOriginais = allItems.filter(item => item.id.startsWith(`${this.value}_`)); tituloDaVisao = `Inventário de Todas as Unidades (${this.options[this.selectedIndex].text})`; mainContentAreaEl.innerHTML = `<div class="card text-center p-10"><p>Selecione uma <strong>Unidade</strong> para ver detalhes ou veja o resumo de todas as unidades do tipo <strong>${this.options[this.selectedIndex].text}</strong> abaixo.</p></div>`; handleFilterChange(); } });
        [filtroEstadoEl, filtroDoacaoEl].forEach(el => el.addEventListener('change', handleFilterChange));
        filtroBuscaEl.addEventListener('input', debounce(handleFilterChange, 400));
        verResumoGeralBtn.addEventListener('click', () => { dadosOriginais = allItems; tituloDaVisao = 'Inventário Geral Completo'; visaoAtiva = 'resumo'; selectedUnidadeValue = ''; filtroServicoEl.value = ""; openUnidadeModalBtn.disabled = true; handleFilterChange(); });
        document.addEventListener('click', (e) => { if (e.target.dataset.page) { currentPage = parseInt(e.target.dataset.page); renderApp(); } });
        navButtons.forEach(button => button.addEventListener('click', () => switchTab(button.dataset.tab)));
        filtroEstoqueBuscaEl.addEventListener('input', debounce(renderEstoque, 400));
        filtroEstoqueUnidadeEl.addEventListener('change', renderEstoque);
        
        [filtroTotalCategoriaEl, filtroTotalUnidadeEl, filtroTotalEstadoEl].forEach(el => el.addEventListener('change', renderTotalItens));
        filtroTotalItemEl.addEventListener('input', debounce(renderTotalItens, 400));
        filtroTotalCategoriaEl.addEventListener('change', populateTotalItensUnidades);

        // Listeners dos filtros avançados
        toggleAdvancedFiltersBtn.addEventListener('click', () => {
            advancedFiltersContainerEl.classList.toggle('hidden');
            const isHidden = advancedFiltersContainerEl.classList.contains('hidden');
            toggleAdvancedFiltersBtn.textContent = isHidden ? 'Filtros Avançados' : 'Ocultar Filtros';
        });
        [filtroTombamentoEl, filtroDescricaoEl, filtroLocalEl, filtroFornecedorEl, filtroObservacaoEl].forEach(el => {
            el.addEventListener('input', debounce(handleFilterChange, 400));
        });

        openUnidadeModalBtn.addEventListener('click', () => { populateUnidadeModalList(); unidadeModal.classList.remove('hidden'); setTimeout(() => { modalOverlay.classList.remove('opacity-0'); unidadeModal.querySelector('.modal-container').classList.remove('scale-95', 'opacity-0'); }, 10); });
        const closeModal = () => { unidadeModal.querySelector('.modal-container').classList.add('scale-95', 'opacity-0'); modalOverlay.classList.add('opacity-0'); setTimeout(() => unidadeModal.classList.add('hidden'), 300); };
        closeModalBtn.addEventListener('click', closeModal); modalOverlay.addEventListener('click', closeModal);
        unidadeSearchInput.addEventListener('input', debounce((e) => populateUnidadeModalList(e.target.value), 300));
        unidadeListContainer.addEventListener('click', (e) => { const li = e.target.closest('li[data-value]'); if (li) { selectedUnidadeValue = li.dataset.value; openUnidadeModalBtn.textContent = li.dataset.text; dadosOriginais = allItems.filter(i => i.unit_condition === selectedUnidadeValue); tituloDaVisao = `Inventário de ${li.dataset.text}`; visaoAtiva = 'unidade'; closeModal(); handleFilterChange(); } });
        clearUnidadeSelectionBtn.addEventListener('click', () => { selectedUnidadeValue = ''; openUnidadeModalBtn.textContent = 'Selecione uma Unidade...'; dadosOriginais = allItems.filter(i => i.id.startsWith(`${filtroServicoEl.value}_`)); tituloDaVisao = `Todas as Unidades (${filtroServicoEl.options[filtroServicoEl.selectedIndex].text})`; visaoAtiva = 'unidade'; closeModal(); handleFilterChange(); });
        
        document.getElementById('searchBoxSede').addEventListener('input', debounce(renderSedeReport, 300));
        document.getElementById('filterAllSede').addEventListener('click', function() { currentSedeFilter = 'all'; document.querySelectorAll('#content-sede .filter-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); renderSedeReport(); });
        document.getElementById('filterNoRegistrySede').addEventListener('click', function() { currentSedeFilter = 'no-registry'; document.querySelectorAll('#content-sede .filter-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); renderSedeReport(); });
        const floorNav = document.getElementById('sede-floor-nav');
        floorNav.innerHTML = ['Todos', 'SUBSOLO', 'TÉRREO', 'MEZANINO', '1º ANDAR', '2º ANDAR', '3º ANDAR', 'PENDENTE'].map(f => `<button class="floor-nav-button ${f === 'Todos' ? 'active' : ''}" data-floor="${f}">${f}</button>`).join('');
        floorNav.querySelectorAll('.floor-nav-button').forEach(btn => btn.addEventListener('click', () => { currentSedeFloor = btn.dataset.floor; floorNav.querySelector('.active').classList.remove('active'); btn.classList.add('active'); renderSedeReport(); }));

        function populateUnidadeModalList(searchTerm = "") {
            const servico = filtroServicoEl.value;
            if(!servico) return;
            const unidades = [...new Set(allItems.filter(i => i.id.startsWith(`${servico}_`)).map(i => i.unit_condition))].map(u => ({value: u, text: formatUnitName(allItems.find(i=>i.unit_condition === u))})).sort((a,b) => a.text.localeCompare(b.text));
            const filtered = unidades.filter(u => normalizeString(u.text).includes(normalizeString(searchTerm)));
            unidadeListContainer.innerHTML = filtered.length > 0 ? filtered.map(u => `<li data-value="${u.value}" data-text="${u.text}" class="p-3 rounded-md hover:bg-slate-100 cursor-pointer">${u.text}</li>`).join('') : `<li class="p-3 text-center">Nenhuma unidade.</li>`;
        }
    }
    
    function updateDynamicDOMReferences() { tableBodyEl = document.getElementById('inventory-table-body'); paginationControlsEl = document.getElementById('pagination-controls'); }
    
    initApp();
    connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></span> <span>A conectar...</span>`;

    try {
        const patrimonioData = await dataManager.fetchWithCache(googleSheetPatrimonioUrl, 'patrimonio');
        if (!patrimonioData || !Array.isArray(patrimonioData) || patrimonioData.length === 0) throw new Error("A planilha de dados pode estar vazia ou com formato incorreto.");
        allItems = formatSheetData(patrimonioData);
        connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-green-500 rounded-full"></span> <span>Conectado</span>`;
        
        const allStates = [...new Set(allItems.map(item => item.state))];
        filtroEstadoEl.innerHTML = '<option value="">TODOS</option>' + ['Novo', 'Bom', 'Regular', 'Avariado'].filter(s => allStates.includes(s)).map(s => `<option value="${s}">${s.toUpperCase()}</option>`).join('');
        switchTab('dashboard');
    } catch (error) {
        console.error('Erro fatal ao inicializar:', error);
        connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-red-500 rounded-full"></span> <span class="text-red-500">Erro de Conexão</span>`;
        
        let userMessage = 'Não foi possível carregar os dados do patrimônio.';
        let suggestedAction = 'Verifique se a Planilha Google está "Publicada na web". O erro pode ser causado por falta de permissão, conexão de internet ou alterações na planilha.';

        if (error.message.includes("Failed to fetch")) {
            userMessage = 'Ocorreu um erro de rede que impediu a conexão com o servidor de dados do Google.';
            suggestedAction = `Isso pode ser causado por um problema de rede, firewall ou, mais provavelmente, um problema com a URL do Google Apps Script (erro de SSL/TLS). <strong>A solução mais comum é implantar novamente o projeto do Google Apps Script para obter uma nova URL e atualizá-la nesta linha do arquivo main.js: <code>const googleSheetPatrimonioUrl = '...'</code></strong>`;
        } else if (error.message.includes("formato incorreto")) {
            userMessage = 'A planilha de dados parece estar vazia ou com o formato incorreto.';
        }

        const errorContainer = document.getElementById('content-dashboard');
        navButtons.forEach(btn => btn.disabled = true);
        document.querySelector('.nav-btn[data-tab="dashboard"]').classList.add('active');
        errorContainer.classList.remove('hidden');
        errorContainer.innerHTML = `<div class="alert alert-error"><h2 class="font-bold text-lg">Falha Crítica ao Carregar Dados</h2><p class="mt-2">${userMessage}</p><p class="text-sm mt-4"><strong>Ação Sugerida:</strong> ${suggestedAction}</p><p class="text-xs mt-2 text-slate-500"><strong>Detalhe técnico:</strong> ${error.message}</p></div>`;
    }
});
