import { handleNotaFiscalTab } from './notas-fiscais.js';

// --- DADOS DA SEDE (INTEGRADO) ---
const sedeData = [
    // DADOS DA SEDE OMITIDOS PARA BREVIDADE
    { local: "SUBSOLO", sala: "SALA 1", tipo: "SALA INDIVIDUAL", setores: [{ nome: "DIRETORIA TÉCNICA DE ALMOXARIFADO E PATRIMÔNIO", registro: "140.32 - SUPERINTENDÊNCIA DE ADMINISTRAÇÃO", observacao: "" }] },
    { local: "PENDENTE", sala: "SETORES PENDENTES DE LOCALIZAÇÃO", tipo: "PENDENTE", setores: [{ nome: "COORDENAÇÃO DE INCLUSÃO SOCIOPRODUTIVA", registro: "140.47 - COORDENAÇÃO DE INCLUSÃO SOCIOPRODUTIVA", observacao: "Localização na sede não confirmada." }]}
];

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
        this.cacheKey = 'dashboard_cache_v4'; // Versão do cache
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutos
        this.loadingPromises = new Map();
    }

    async fetchWithCache(url, key, type = 'json') {
        const cached = this.getFromCache(key);
        if (cached && (Date.now() - cached.timestamp < this.cacheExpiry)) {
            console.log(`Loading ${key} from cache.`);
            return cached.data;
        }
        
        console.log(`Fetching ${key} from network.`);
        if (this.loadingPromises.has(key)) {
            return this.loadingPromises.get(key);
        }

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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (type === 'json') {
            const rawData = await response.json();
             if (rawData && rawData.error) throw new Error(`Erro do Apps Script: ${rawData.error}`);
            return Array.isArray(rawData) ? rawData : (rawData && Array.isArray(rawData.content)) ? rawData.content : null;
        }
        return response.text();
    }

    saveToCache(key, data) {
        try {
            const cache = this.getAllCache();
            cache[key] = { data, timestamp: Date.now() };
            localStorage.setItem(this.cacheKey, JSON.stringify(cache));
        } catch (e) {
            console.warn("Could not save to cache, it might be full. Clearing cache.");
            localStorage.removeItem(this.cacheKey);
        }
    }

    getFromCache(key) {
        const cache = this.getAllCache();
        return cache[key] || null;
    }

    getAllCache() {
        try {
            return JSON.parse(localStorage.getItem(this.cacheKey)) || {};
        } catch {
            return {};
        }
    }
}
const dataManager = new DataManager();

function parseCsvData(csvText) {
    const lines = csvText.trim().split(/\r\n|\n/);
    if (lines.length < 2) return [];
    const headerLine = lines[0];
    const delimiter = headerLine.includes(';') ? ';' : ',';
    const splitRegex = new RegExp(`${delimiter}(?=(?:(?:[^"]*"){2})*[^"]*$)`);
    const headers = headerLine.split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''));
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        const values = lines[i].split(splitRegex);
        const item = {};
        for (let j = 0; j < headers.length; j++) {
            let value = values[j] ? values[j].trim() : '';
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            item[headers[j]] = value;
        }
        data.push(item);
    }
    return data;
}

function normalizeItemDescriptionForChart(description) {
    if (!description) return 'N/D';
    let normalized = String(description).toLowerCase().replace(/\(.*?\)/g, '').trim();
    if (normalized.includes('cadeira') && (normalized.includes('plastico') || normalized.includes('plástica'))) {
        return 'Cadeira de Plástico';
    }
    const cleanDescription = description.replace(/\(.*?\)/g, '').trim();
    if (!cleanDescription) return 'N/D';
    return cleanDescription.charAt(0).toUpperCase() + cleanDescription.slice(1);
}

const capitalizeWords = (str) => {
    if (!str) return "";
    return str.toLowerCase().replace(/([^\s/]+)/g, word => word.charAt(0).toUpperCase() + word.slice(1));
};

function getServiceKey(serviceName) {
    const name = (serviceName || '').toLowerCase().trim();
    if (name === 'conselho' || name === 'ct') return 'conselho';
    if (name.includes('cras')) return 'cras';
    if (name.includes('creas')) return 'creas';
    if (name.includes('externa')) return 'externa';
    if (name.includes('centro pop') || name === 'centro pop') return 'centro_pop';
    if (name.includes('abrigo')) return 'abrigo';
    if (name.includes('sede')) return 'sede';
    return 'item';
}

function cleanDuplicatedString(str) {
    if (typeof str !== 'string' || str.length < 2 || str.length % 2 !== 0) {
        return str;
    }
    const half = str.length / 2;
    const firstHalf = str.substring(0, half);
    const secondHalf = str.substring(half);
    if (firstHalf.toLowerCase() === secondHalf.toLowerCase()) {
        return firstHalf;
    }
    return str;
}

function formatSheetData(sheetData) {
    return sheetData.map((row, index) => {
        const standardizedUnitName = capitalizeWords((row.Unidade || 'N/A').trim());
        let originalState = row.Estado || 'Regular';
        let finalState = originalState;
        const observationTextRaw = (row['Observação'] || '').toLowerCase();
        const isDamagedByObs = /avariado|defeito|danificado|não funciona|nao funciona/.test(observationTextRaw);
        const isDamagedByState = /defeito|avaria|danificado|nao funciona/.test(normalizeString(originalState));

        if (isDamagedByObs) finalState = 'Avariado';
        else if (isDamagedByState) finalState = 'Avariado';
        
        const serviceKey = getServiceKey(row.Tipo);
        const rawObservation = (row['Observação'] || '').trim();
        const cleanedObservation = cleanDuplicatedString(rawObservation);
        const processedObservation = (cleanedObservation === '-' || normalizeString(cleanedObservation) === 'n/a') ? '' : cleanedObservation;
        const rawDonationSource = (row['Origem da Doação'] || '').trim();
        const processedDonationSource = (rawDonationSource === '-' || normalizeString(rawDonationSource) === 'n/a' || rawDonationSource === '') ? '' : rawDonationSource;
        const rawSupplier = (row.Fornecedor || '').trim();
        const processedSupplier = (rawSupplier === '-' || normalizeString(rawSupplier) === 'n/a') ? '' : rawSupplier;
        const rawTombamento = (row['Tombamento'] || '').trim();
        let processedTombamento = 'S/T';
        if (rawTombamento) {
            processedTombamento = normalizeString(rawTombamento) === 'doacao do estado' ? 'Doação Estado' : rawTombamento;
        }

        return {
            id: `${serviceKey}_${index}`,
            tombamento: processedTombamento,
            type: row.Tipo || 'N/A',
            description: row['Descrição'] || 'N/A',
            unit_condition: standardizedUnitName,
            quantity: parseInt(row.Quantidade, 10) || 1,
            location: row['Localização'] || 'N/A',
            state: finalState,
            donation_source: processedDonationSource,
            observation: processedObservation,
            supplier: processedSupplier,
            originalStateWasNew: originalState === 'Novo'
        };
    });
}

function normalizeString(str) {
    if (!str) return '';
    return String(str).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

const stateColors = {
    'Novo': { bg: 'badge-green', text: 'text-green-800', hex: '#16a34a' },
    'Bom': { bg: 'badge-blue', text: 'text-blue-800', hex: '#2563eb' },
    'Regular': { bg: 'badge-yellow', text: 'text-yellow-800', hex: '#facc15' },
    'Avariado': { bg: 'badge-red', text: 'text-red-800', hex: '#dc2626' }
};

function agruparItens(items) {
    if (!items || items.length === 0) return [];
    const agrupados = items.reduce((acc, item) => {
        const key = `${normalizeString(item.type)}-${normalizeString(item.description)}-${item.state}-${normalizeString(item.unit_condition)}-${normalizeString(item.location)}-${item.tombamento}`;
        if (acc[key]) {
            acc[key].quantity += parseInt(item.quantity, 10);
        } else {
            acc[key] = {...item, quantity: parseInt(item.quantity, 10) };
        }
        return acc;
    }, {});
    return Object.values(agrupados);
}

function formatUnitName(item) {
    let nomeUnidade = item.unit_condition;
    const type = item.type.toUpperCase();
    const lowerCaseName = nomeUnidade.toLowerCase();
    if (type === 'CRAS' && !lowerCaseName.startsWith('cras')) return `CRAS ${nomeUnidade}`;
    if (type === 'CREAS' && !lowerCaseName.startsWith('creas')) return `CREAS ${nomeUnidade}`;
    if (type === 'CT') return `CT ${nomeUnidade}`;
    const regex = new RegExp(`^${type}\\s*`, 'i');
    return nomeUnidade.replace(regex, `${type} `).trim().toUpperCase();
}

// --- FUNÇÕES DE RENDERIZAÇÃO ---
function GerarRelatorioUnidade(dados) {
    if (!dados || dados.length === 0) return "Nenhum dado disponível para gerar o relatório.";
    const stateCounts = dados.reduce((acc, item) => {
        acc[item.state] = (acc[item.state] || 0) + parseInt(item.quantity, 10);
        return acc;
    }, {Novo: 0, Bom: 0, Regular: 0, Avariado: 0});
    const totalUnitItems = Object.values(stateCounts).reduce((sum, count) => sum + count, 0);
    let reportLines = [];
    reportLines.push(`A unidade possui um total de <strong>${totalUnitItems}</strong> itens (considerando o filtro atual).`);
    reportLines.push(`A situação geral é: <strong>${stateCounts.Novo || 0}</strong> novos, <strong>${stateCounts.Bom || 0}</strong> bons, <strong>${stateCounts.Regular || 0}</strong> regulares e <strong>${stateCounts.Avariado || 0}</strong> avariados.`);
    const avariadosDetalhes = dados.filter(item => item.state === 'Avariado');
    if (avariadosDetalhes.length > 0) {
        const totalAvariados = avariadosDetalhes.reduce((sum, item) => sum + item.quantity, 0);
        reportLines.push(`<br><strong>Ponto de Atenção:</strong> Total de ${totalAvariados} itens que precisam de atenção:`);
        const listaAvariados = agruparItens(avariadosDetalhes).map(item => `<li>${item.quantity}x ${item.description} (Local: ${item.location})</li>`).join('');
        reportLines.push(`<ul class="list-disc list-inside">${listaAvariados}</ul>`);
    } else {
        reportLines.push(`<br><strong>Ponto de Atenção:</strong> Nenhum item avariado foi registrado (considerando o filtro atual).`);
    }
    return reportLines.join('<br>');
}

function renderTable(itemsToDisplay, totalItemsCount, enablePagination = true) {
    if (!tableBodyEl) return;
    if (itemsToDisplay.length === 0) {
        tableBodyEl.innerHTML = `<tr><td colspan="10" class="text-center py-10 text-slate-500">Nenhum item encontrado com os filtros aplicados.</td></tr>`;
        renderPagination(0, 0, enablePagination);
        return;
    }
    let tableHTML = '';
    itemsToDisplay.forEach(item => {
        const colorInfo = stateColors[item.state] || stateColors['Regular'];
        const unitDisplayName = formatUnitName(item);
        const observationText = item.observation || '';
        const supplierText = item.supplier || '';
        const finalSupplierText = (observationText && supplierText && normalizeString(observationText) === normalizeString(supplierText)) ? 'N/A' : (supplierText || 'N/A');
        tableHTML += `
            <tr class="border-b border-slate-200">
                <td class="px-6 py-4 font-mono text-xs">${item.tombamento}</td>
                <td class="px-6 py-4">${item.type}</td>
                <td class="px-6 py-4 font-medium text-slate-900">${item.description}</td>
                <td class="px-6 py-4">${unitDisplayName}</td>
                <td class="px-6 py-4 text-center">${item.quantity}</td>
                <td class="px-6 py-4">${item.location}</td>
                <td class="px-6 py-4"><span class="badge ${colorInfo.bg} ${colorInfo.text}">${item.state}</span></td>
                <td class="px-6 py-4">${item.donation_source || 'N/A'}</td>
                <td class="px-6 py-4">${observationText ? `<div class="tooltip">${String(observationText).substring(0, 30)}${String(observationText).length > 30 ? '...' : ''}<span class="tooltip-text">${observationText}</span></div>` : 'N/A'}</td>
                <td class="px-6 py-4">${finalSupplierText}</td>
            </tr>`;
    });
    tableBodyEl.innerHTML = tableHTML;
    renderPagination(totalItemsCount, Math.ceil(totalItemsCount / itemsPerPage), enablePagination);
}

function renderPagination(totalItems, totalPages, enablePagination) {
    if (!paginationControlsEl) return;
    paginationControlsEl.innerHTML = '';
    if (!enablePagination || totalPages <= 1) return;
    paginationControlsEl.innerHTML = `
        <span class="text-sm text-slate-600">Mostrando ${Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} a ${Math.min(currentPage * itemsPerPage, totalItems)} de ${totalItems} itens</span>
        <div class="inline-flex rounded-md shadow-sm" role="group">
            <button type="button" data-page="${currentPage - 1}" class="px-4 py-2 text-sm font-medium border border-slate-300 rounded-l-lg hover:bg-slate-100 disabled:opacity-50" ${currentPage === 1 ? 'disabled' : ''}>Anterior</button>
            <button type="button" data-page="${currentPage + 1}" class="px-4 py-2 text-sm font-medium border border-slate-300 rounded-r-lg hover:bg-slate-100 disabled:opacity-50" ${currentPage === totalPages ? 'disabled' : ''}>Próximo</button>
        </div>`;
}

function getFilteredItems(sourceData) {
    const servico = filtroServicoEl.value;
    const unidade = selectedUnidadeValue;
    const estado = filtroEstadoEl.value;
    const doacao = filtroDoacaoEl.value;
    const busca = filtroBuscaEl.value.toLowerCase();
    if (!servico && !unidade && !estado && !busca && !doacao) return sourceData;
    return sourceData.filter(item => {
        const matchServico = !servico || item.id.startsWith(`${servico}_`);
        const matchUnidade = !unidade || item.unit_condition === unidade;
        const matchEstado = !estado || item.state === estado;
        const source = normalizeString(item.donation_source);
        const matchDoacao = !doacao || (doacao === 'sim' && item.donation_source && !['proprio', 'proprios'].includes(source)) || (doacao === 'nao' && (!item.donation_source || ['proprio', 'proprios'].includes(source)));
        const matchBusca = !busca || item.description.toLowerCase().includes(busca) || item.type.toLowerCase().includes(busca) || item.location.toLowerCase().includes(busca) || (item.observation && item.observation.toLowerCase().includes(busca)) || (item.tombamento && item.tombamento.toLowerCase().includes(busca));
        return matchServico && matchUnidade && matchEstado && matchDoacao && matchBusca;
    });
}

function updateFilterOptions() {
    if (!allItems || allItems.length === 0) return;
    const allStates = [...new Set(allItems.map(item => item.state))];
    const sortedStates = ['Novo', 'Bom', 'Regular', 'Avariado'].filter(s => allStates.includes(s));
    filtroEstadoEl.innerHTML = '<option value="">TODOS</option>';
    sortedStates.forEach(s => {
        const option = document.createElement('option');
        option.value = s;
        option.textContent = s.toUpperCase();
        filtroEstadoEl.appendChild(option);
    });
}

function generateRanking(data, states) {
    const counts = data.filter(item => states.includes(item.state)).reduce((acc, item) => {
        const unitName = formatUnitName(item);
        acc[unitName] = (acc[unitName] || 0) + item.quantity;
        return acc;
    }, {});
    return Object.entries(counts).map(([nome, quantidade]) => ({ nome, quantidade })).sort((a, b) => b.quantidade - a.quantidade).slice(0, 5);
}

function renderRanking(data, title, colorClass, rankingListEl) {
    const rankingCardTitle = rankingListEl.previousElementSibling;
    if (!rankingListEl || !rankingCardTitle) return;
    rankingCardTitle.textContent = title;
    if (data.length === 0) {
        rankingListEl.innerHTML = `<li class="text-center text-slate-500 py-4">Nenhum item encontrado.</li>`;
    } else {
        rankingListEl.innerHTML = data.map((unidade, index) => `
            <li class="flex justify-between items-center p-3 rounded-lg ${index === 0 ? 'bg-slate-200' : 'bg-slate-100'}">
                <span class="font-medium text-slate-700">${index + 1}. ${unidade.nome}</span>
                <span class="font-bold ${colorClass}">${unidade.quantidade} itens</span>
            </li>`).join('');
    }
}

function renderApp() {
    if (estadoChartInstance) { estadoChartInstance.destroy(); estadoChartInstance = null; }
    const currentFilteredData = getFilteredItems(dadosOriginais);
    const filteredAndGroupedItems = agruparItens(currentFilteredData);
    const tableHeadersHTML = `<thead class="text-xs uppercase"><tr><th scope="col" class="px-6 py-3">Tombamento</th><th scope="col" class="px-6 py-3">Tipo</th><th scope="col" class="px-6 py-3">Descrição</th><th scope="col" class="px-6 py-3">Unidade</th><th scope="col" class="px-6 py-3 text-center">Qtd</th><th scope="col" class="px-6 py-3">Localização</th><th scope="col" class="px-6 py-3">Estado</th><th scope="col" class="px-6 py-3">Origem da Doação</th><th scope="col" class="px-6 py-3">Observação</th><th scope="col" class="px-6 py-3">Fornecedor</th></tr></thead>`;
    
    if (visaoAtiva === 'boasVindas') {
        mainContentAreaEl.innerHTML = `<div class="text-center p-10 sm:p-20 card"><p class="text-xl text-slate-600">Selecione um <strong>Tipo de Unidade</strong> para ver os detalhes, ou clique em <strong>Ver Inventário Completo</strong> para uma visão geral.</p></div>`;
    } else if (visaoAtiva === 'unidade') {
        const totalDoacoes = currentFilteredData.filter(item => { const source = normalizeString(item.donation_source); return item.donation_source && !['proprio', 'proprios'].includes(source); }).reduce((sum, item) => sum + parseInt(item.quantity, 10), 0);
        const descriptiveReportContent = GerarRelatorioUnidade(currentFilteredData);
        mainContentAreaEl.innerHTML = `<div><h2 class="text-3xl font-bold text-slate-800 mb-6">${tituloDaVisao}</h2><div class="grid grid-cols-1 lg:grid-cols-5 gap-6"><div class="lg:col-span-2 flex flex-col gap-6"><div class="card h-full"><div class="chart-container"><canvas id="estadoChart"></canvas></div></div><div class="card text-center"><h3 class="text-lg font-semibold text-purple-800">Itens de Doação</h3><p class="text-3xl font-bold text-purple-700 mt-2">${totalDoacoes}</p></div></div><div class="lg:col-span-3 card"><h3 class="text-xl font-bold text-slate-700 mb-4">Relatório Descritivo da Unidade</h3><div class="text-slate-600 space-y-2">${descriptiveReportContent}</div></div></div><h2 class="text-2xl font-bold text-slate-800 mb-6 mt-8">Inventário Detalhado da Unidade</h2><div class="card p-0 overflow-x-auto"><table class="table w-full text-sm text-left">${tableHeadersHTML}<tbody id="inventory-table-body"></tbody></table></div><div id="pagination-controls" class="flex items-center justify-between mt-6"></div></div>`;
        updateDynamicDOMReferences();
        renderTable(filteredAndGroupedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), filteredAndGroupedItems.length, true);
        const chartCanvas = document.getElementById('estadoChart');
        if (chartCanvas) {
            const chartData = {
                 type: 'bar',
                 data: { 
                    labels: ['Novo', 'Bom', 'Regular', 'Avariado'], 
                    datasets: [{ 
                        label: 'Quantidade', 
                        data: ['Novo', 'Bom', 'Regular', 'Avariado'].map(state => currentFilteredData.filter(i => i.state === state).reduce((sum, i) => sum + i.quantity, 0)), 
                        backgroundColor: ['#16a34a', '#2563eb', '#facc15', '#dc2626'] 
                    }] 
                 },
                 options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { text: 'Distribuição por Estado', display: true, font: { size: 16 }, color: '#334155' },
                        legend: { display: false }
                    }
                 }
            };
            if (estadoChartInstance) estadoChartInstance.destroy();
            estadoChartInstance = new Chart(chartCanvas, chartData);
        }
    } else if (visaoAtiva === 'resumo') {
        mainContentAreaEl.innerHTML = `<div><div class="flex justify-between items-start flex-wrap gap-4"><h2 class="text-3xl font-bold text-slate-800">${tituloDaVisao}</h2></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"><div class="card"><div class="chart-container"><canvas id="estadoChart"></canvas></div></div><div class="card"><h3 class="text-xl font-bold text-slate-700 mb-4"></h3><ul class="space-y-3"></ul></div></div><h2 class="text-2xl font-bold text-slate-800 mb-6 mt-8">Inventário Detalhado (Resumo Geral)</h2><div class="card p-0 overflow-x-auto"><table class="table w-full text-sm text-left">${tableHeadersHTML}<tbody id="inventory-table-body"></tbody></table></div><div id="pagination-controls" class="flex items-center justify-between mt-6"></div></div>`;
        updateDynamicDOMReferences();
        const filteredAllItems = getFilteredItems(allItems);
        const groupedAllItems = agruparItens(filteredAllItems);
        renderTable(groupedAllItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), groupedAllItems.length, true);
        const chartCanvas = document.getElementById('estadoChart');
        if (chartCanvas) {
            const chartData = {
                 type: 'bar',
                 data: { 
                    labels: ['Novo', 'Bom', 'Regular', 'Avariado'], 
                    datasets: [{ 
                        label: 'Quantidade', 
                        data: ['Novo', 'Bom', 'Regular', 'Avariado'].map(state => filteredAllItems.filter(i => i.state === state).reduce((sum, i) => sum + i.quantity, 0)), 
                        backgroundColor: ['#16a34a', '#2563eb', '#facc15', '#dc2626'] 
                    }] 
                 },
                 options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: { text: 'Distribuição por Estado', display: true, font: { size: 16 }, color: '#334155' },
                        legend: { display: false }
                    }
                 }
            };
            if (estadoChartInstance) estadoChartInstance.destroy();
            estadoChartInstance = new Chart(chartCanvas, chartData);
        }
        const rankingListEl = mainContentAreaEl.querySelector('ul');
        if (filtroEstadoEl.value === 'Novo') {
            const rankingData = generateRanking(filteredAllItems, ['Novo']);
            renderRanking(rankingData, 'Top 5 - Unidades com itens novos', 'text-green-600', rankingListEl);
        } else {
            const rankingData = generateRanking(filteredAllItems, ['Regular', 'Avariado']);
            renderRanking(rankingData, 'Top 5 - Unidades para atenção', 'text-red-600', rankingListEl);
        }
    }
}

function renderEstoque(items) {
    mainContentEstoqueEl.innerHTML = '';
    if (items.length === 0) {
        mainContentEstoqueEl.innerHTML = `<div class="card text-center p-10"><p class="text-xl text-slate-600">Nenhum item de estoque encontrado.</p></div>`;
        return;
    }
    const unidadesEstoque = [...new Set(items.map(item => item.Unidade || 'N/A'))].sort();
    filtroEstoqueUnidadeEl.innerHTML = '<option value="">TODAS AS UNIDADES</option>';
    unidadesEstoque.forEach(u => {
        const option = document.createElement('option');
        option.value = u; option.textContent = u.toUpperCase();
        filtroEstoqueUnidadeEl.appendChild(option);
    });
    const busca = filtroEstoqueBuscaEl.value.toLowerCase();
    const unidade = filtroEstoqueUnidadeEl.value;
    const filteredItems = items.filter(item => {
        const matchUnidade = !unidade || item.Unidade === unidade;
        const matchBusca = !busca || (item.Item || '').toLowerCase().includes(busca) || (item.Fornecedor || '').toLowerCase().includes(busca);
        return matchUnidade && matchBusca;
    });
    const headers = Object.keys(filteredItems[0] || {});
    const tableHTML = `<div class="card p-0 overflow-x-auto"><table class="table w-full text-sm text-left"><thead class="text-xs uppercase"><tr>${headers.map(h => `<th scope="col" class="px-6 py-3">${h.toUpperCase()}</th>`).join('')}</tr></thead><tbody>${filteredItems.map(item => `<tr class="border-b border-slate-200">${headers.map(h => `<td class="px-6 py-4">${item[h] || ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    mainContentEstoqueEl.innerHTML = tableHTML;
    const estoqueData = filteredItems.reduce((acc, item) => {
        const desc = item.Item || 'N/D';
        const qty = parseInt(item.Quantidade, 10) || 0;
        acc[desc] = (acc[desc] || 0) + qty;
        return acc;
    }, {});
    const top10 = Object.entries(estoqueData).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const chartCanvas = document.getElementById('estoqueBarChart');
    if (chartCanvas) {
        const chartData = {
            type: 'bar',
            data: { 
                labels: top10.map(item => item[0]), 
                datasets: [{ 
                    label: 'Quantidade', 
                    data: top10.map(item => item[1]), 
                    backgroundColor: '#36a2eb' 
                }] 
            },
            options: { 
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    title: { text: 'TOP 10 ITENS EM ESTOQUE', display: true },
                    legend: { display: false }
                } 
            }
        };
        if (estoqueChartInstance) estoqueChartInstance.destroy();
        estoqueChartInstance = new Chart(chartCanvas, chartData);
    }
}

function populateTotalItensUnidades() {
    const selectedCategoria = filtroTotalCategoriaEl.value;
    let itemsToConsider = allItems;

    if (selectedCategoria) {
        itemsToConsider = allItems.filter(item => item.type === selectedCategoria);
    }

    const unidades = [...new Set(itemsToConsider.map(item => formatUnitName(item)))].sort((a, b) => a.localeCompare(b));
    
    const currentUnidadeValue = filtroTotalUnidadeEl.value;
    filtroTotalUnidadeEl.innerHTML = '<option value="">TODAS</option>';
    
    unidades.forEach(u => {
        const option = document.createElement('option');
        option.value = u;
        option.textContent = u.toUpperCase();
        filtroTotalUnidadeEl.appendChild(option);
    });

    if (unidades.includes(currentUnidadeValue)) {
        filtroTotalUnidadeEl.value = currentUnidadeValue;
    }
}


function populateTotalItensFilters() {
    if (!filtroTotalCategoriaEl || !filtroTotalUnidadeEl || !filtroTotalEstadoEl || !allItems || allItems.length === 0) return;
    
    const categorias = [...new Set(allItems.map(item => item.type))].filter(type => type && type !== 'N/A').sort((a, b) => a.localeCompare(b));
    const currentCategoria = filtroTotalCategoriaEl.value;
    filtroTotalCategoriaEl.innerHTML = '<option value="">TODAS</option>';
    categorias.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.toUpperCase();
        filtroTotalCategoriaEl.appendChild(option);
    });
    if (currentCategoria) filtroTotalCategoriaEl.value = currentCategoria;

    populateTotalItensUnidades();

    const allStates = [...new Set(allItems.map(item => item.state))];
    const sortedStates = ['Novo', 'Bom', 'Regular', 'Avariado'].filter(s => allStates.includes(s));
    const currentState = filtroTotalEstadoEl.value;
    filtroTotalEstadoEl.innerHTML = '<option value="">TODOS</option>';
    sortedStates.forEach(s => {
        const option = document.createElement('option');
        option.value = s;
        option.textContent = s.toUpperCase();
        filtroTotalEstadoEl.appendChild(option);
    });
    if (currentState) filtroTotalEstadoEl.value = currentState;
}

function renderTotalItens() {
    const listContainer = document.getElementById('total-itens-list');
    const detailsContainer = document.getElementById('total-itens-details-container');
    const listCountEl = document.getElementById('total-itens-list-count');
    if (!listContainer || !detailsContainer) return;

    const selectedCategoria = filtroTotalCategoriaEl.value;
    const searchTerm = filtroTotalItemEl.value.toLowerCase();
    const selectedUnidade = filtroTotalUnidadeEl.value;
    const selectedEstado = filtroTotalEstadoEl.value;

    let filteredData = allItems;
    if (selectedCategoria) filteredData = filteredData.filter(item => item.type === selectedCategoria);
    if (selectedUnidade) filteredData = filteredData.filter(item => formatUnitName(item) === selectedUnidade);
    if (selectedEstado) filteredData = filteredData.filter(item => item.state === selectedEstado);
    if (searchTerm) filteredData = filteredData.filter(item => item.description.toLowerCase().includes(searchTerm));

    const groupedItems = {};
    filteredData.forEach(item => {
        const desc = item.description;
        if (!desc || desc === 'N/A') return;
        if (!groupedItems[desc]) {
            groupedItems[desc] = { total: 0, type: item.type, items: [] };
        }
        groupedItems[desc].total += item.quantity;
        groupedItems[desc].items.push(item);
    });

    const sortedItemNames = Object.keys(groupedItems).sort((a, b) => a.localeCompare(b));
    listCountEl.textContent = `${sortedItemNames.length} itens encontrados`;

    if (sortedItemNames.length === 0) {
        listContainer.innerHTML = `<div class="p-4 text-center text-slate-500">Nenhum item encontrado.</div>`;
        detailsContainer.innerHTML = '';
        return;
    }

    listContainer.innerHTML = sortedItemNames.map(desc => `
        <div class="total-item-entry" data-item-name="${desc}">
            <div class="flex justify-between items-center">
                <span class="font-medium text-slate-800 truncate pr-2">${desc}</span>
                <span class="text-sm font-bold bg-slate-200 text-slate-700 rounded-full px-2 py-0.5">${groupedItems[desc].total}</span>
            </div>
            <div class="text-xs text-slate-500">${groupedItems[desc].type}</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.total-item-entry').forEach(el => {
        el.addEventListener('click', (e) => {
            const selectedItem = e.currentTarget;
            const itemName = selectedItem.dataset.itemName;
            
            document.querySelectorAll('.total-item-entry.selected').forEach(prev => prev.classList.remove('selected'));
            selectedItem.classList.add('selected');

            renderTotalItemDetails(itemName, groupedItems[itemName]);
        });
    });

    if (sortedItemNames.length > 0) {
        const firstItemName = sortedItemNames[0];
        listContainer.querySelector('.total-item-entry').classList.add('selected');
        renderTotalItemDetails(firstItemName, groupedItems[firstItemName]);
    } else {
         detailsContainer.innerHTML = `<div class="card text-center p-10"><p class="text-lg text-slate-600">Selecione um item da lista para ver os detalhes.</p></div>`;
    }
}

function renderTotalItemDetails(itemName, data) {
    const detailsContainer = document.getElementById('total-itens-details-container');
    if (!data) {
        detailsContainer.innerHTML = '';
        return;
    }

    const stateCounts = data.items.reduce((acc, item) => {
        acc[item.state] = (acc[item.state] || 0) + item.quantity;
        return acc;
    }, {});

    const distribution = {};
    data.items.forEach(item => {
        const unitName = formatUnitName(item);
        const location = item.location || 'N/D';
        const key = `${unitName} >> ${location}`;
        if (!distribution[key]) {
            distribution[key] = { quantity: 0, state: item.state, tombamento: item.tombamento };
        }
        distribution[key].quantity += item.quantity;
    });

    const statesHTML = Object.entries(stateColors).map(([state, colorInfo]) => {
        const count = stateCounts[state] || 0;
        if (count === 0) return '';
        return `<div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full" style="background-color: ${colorInfo.hex}"></span>
                    <span>${state}:</span>
                    <span class="font-bold">${count}</span>
                </div>`;
    }).join('');

    const distributionHTML = Object.entries(distribution).sort((a, b) => a[0].localeCompare(b[0])).map(([key, value]) => `
        <tr class="border-b border-slate-200">
            <td class="px-4 py-2">${key.replace(' >> ', '<span class="text-slate-400 mx-2">›</span>')}</td>
            <td class="px-4 py-2 font-mono text-xs">${value.tombamento}</td>
            <td class="px-4 py-2 text-center font-bold">${value.quantity}</td>
            <td class="px-4 py-2 text-center"><span class="badge ${stateColors[value.state]?.bg}">${value.state}</span></td>
        </tr>
    `).join('');

    detailsContainer.innerHTML = `
        <div class="card fade-in">
            <h2 class="text-2xl font-bold text-slate-800">${itemName}</h2>
            <p class="text-sm text-slate-500 mb-4">Total de ${data.total} unidades</p>
            
            <div class="card bg-slate-50 mb-6">
                <h4 class="font-semibold text-slate-700 mb-2">Resumo por Estado</h4>
                <div class="grid grid-cols-2 gap-2 text-sm">
                    ${statesHTML}
                </div>
            </div>

            <div>
                <h4 class="font-semibold text-slate-700 mb-2">Distribuição por Local</h4>
                <div class="max-h-96 overflow-y-auto border border-slate-200 rounded-lg">
                    <table class="table w-full text-sm">
                        <thead class="sticky top-0 bg-slate-100">
                            <tr>
                                <th class="px-4 py-2">Unidade / Localização</th>
                                <th class="px-4 py-2">Tombamento</th>
                                <th class="px-4 py-2 text-center">Qtd.</th>
                                <th class="px-4 py-2 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${distributionHTML}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}


// --- LÓGICA DA MODAL ---
function openUnidadeModal() {
    unidadeModal.classList.remove('hidden');
    setTimeout(() => {
        modalOverlay.classList.remove('opacity-0');
        unidadeModal.querySelector('.modal-container').classList.remove('scale-95', 'opacity-0');
    }, 10);
}

function closeUnidadeModal() {
    unidadeModal.querySelector('.modal-container').classList.add('scale-95', 'opacity-0');
    modalOverlay.classList.add('opacity-0');
    setTimeout(() => {
        unidadeModal.classList.add('hidden');
    }, 300);
}

function populateUnidadeModalList(searchTerm = "") {
    const selectedServico = filtroServicoEl.value;
    let unidades = [];
    if (selectedServico) {
        const unidadesDoServico = [...new Set(allItems.filter(item => item.id.startsWith(`${selectedServico}_`)).map(item => item.unit_condition))];
        unidades = unidadesDoServico.map(u => {
            const itemExemplo = allItems.find(item => item.unit_condition === u && item.id.startsWith(`${selectedServico}_`));
            return {
                value: u,
                text: itemExemplo ? formatUnitName(itemExemplo) : u.toUpperCase()
            };
        }).sort((a, b) => a.text.localeCompare(b.text));
    }

    const filteredUnidades = unidades.filter(u => normalizeString(u.text).includes(normalizeString(searchTerm)));

    if (filteredUnidades.length > 0) {
        unidadeListContainer.innerHTML = filteredUnidades.map(u =>
            `<li data-value="${u.value}" data-text="${u.text}" class="p-3 rounded-md hover:bg-slate-100 cursor-pointer break-words">${u.text}</li>`
        ).join('');
    } else {
        unidadeListContainer.innerHTML = `<li class="p-3 text-center text-slate-500">Nenhuma unidade encontrada.</li>`;
    }
}

// --- HANDLERS DE EVENTOS ---
function handleFilterChange() {
    currentPage = 1;
    renderApp();
}

function handleServicoChange() {
    const selectedService = this.value;
    selectedUnidadeValue = '';
    openUnidadeModalBtn.textContent = 'Selecione uma Unidade...';
    openUnidadeModalBtn.disabled = !selectedService;

    if (!selectedService) {
        visaoAtiva = 'boasVindas';
        dadosOriginais = [];
        renderApp();
    } else {
         mainContentAreaEl.innerHTML = `<div class="card text-center p-10 sm:p-20"><p class="text-xl text-slate-600">Agora, por favor, <strong>selecione uma Unidade</strong> para ver os detalhes.</p></div>`;
    }
}

function handleUnidadeChange() {
    const servicoSelecionado = filtroServicoEl.value;
    currentPage = 1;
    if (!servicoSelecionado) return;

    if (selectedUnidadeValue) {
        dadosOriginais = allItems.filter(item => item.id.startsWith(`${servicoSelecionado}_`) && item.unit_condition === selectedUnidadeValue);
        tituloDaVisao = `Inventário de ${openUnidadeModalBtn.textContent}`;
    } else {
        dadosOriginais = allItems.filter(item => item.id.startsWith(`${servicoSelecionado}_`));
        tituloDaVisao = `Inventário de Todas as Unidades (${filtroServicoEl.options[filtroServicoEl.selectedIndex].text})`;
    }
    visaoAtiva = 'unidade';
    renderApp();
}

function handleResumoClick() {
    mainContentAreaEl.innerHTML = `<div class="text-center p-20"><div class="loading-spinner"></div><p class="mt-4 text-xl text-slate-600">A carregar inventário completo...</p></div>`;
    setTimeout(() => {
        dadosOriginais = allItems;
        tituloDaVisao = 'Inventário Geral Completo';
        visaoAtiva = 'resumo';
        currentPage = 1;
        filtroServicoEl.value = "";
        handleServicoChange.call(filtroServicoEl);
        renderApp();
    }, 50);
}

function handlePageChange(event) {
    const page = parseInt(event.target.dataset.page);
    if (page) {
        currentPage = page;
        renderApp();
    }
}

// --- CONTROLE DE ABAS E INICIALIZAÇÃO ---
async function switchTab(tabName) {
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.nav-btn[data-tab="${tabName}"]`).classList.add('active');
    
    contentPanes.forEach(pane => pane.classList.add('hidden'));
    document.getElementById(`content-${tabName}`).classList.remove('hidden');
    
    visaoAtiva = tabName;

    if (tabName === 'dashboard') {
        if (allItems.length > 0) renderDashboard();
    } else if (tabName === 'patrimonio') {
        visaoAtiva = 'boasVindas';
        renderApp();
    } else if (tabName === 'estoque') {
        if (allEstoqueItems.length === 0) {
            mainContentEstoqueEl.innerHTML = `<div class="card text-center p-20"><div class="loading-spinner"></div><p class="mt-4 text-xl">A carregar dados do estoque...</p></div>`;
            try {
                const csvText = await dataManager.fetchWithCache(googleSheetEstoqueUrl, 'estoque', 'text');
                allEstoqueItems = parseCsvData(csvText);
                renderEstoque(allEstoqueItems);
            } catch (error) {
                console.error('Erro ao carregar dados do estoque:', error);
                mainContentEstoqueEl.innerHTML = `<div class="card text-center p-20"><p class="text-xl text-red-600"><strong>Erro:</strong> Não foi possível carregar o estoque.</p><p class="text-sm mt-2">${error.message}</p></div>`;
            }
        } else {
            renderEstoque(allEstoqueItems);
        }
    } else if (tabName === 'nota-fiscal') {
        handleNotaFiscalTab(nfState, setNfState, { parseCsvData });
    } else if (tabName === 'total-itens') {
        populateTotalItensFilters();
        renderTotalItens();
    } else if (tabName === 'sede') {
        renderSedeReport();
    }
}

function updateDynamicDOMReferences() {
    tableBodyEl = document.getElementById('inventory-table-body');
    paginationControlsEl = document.getElementById('pagination-controls');
}

function initApp() {
    // Referências de elementos
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
    filtroTotalCategoriaEl = document.getElementById('filtro-total-categoria');
    filtroTotalItemEl = document.getElementById('filtro-total-item');
    filtroTotalUnidadeEl = document.getElementById('filtro-total-unidade');
    filtroTotalEstadoEl = document.getElementById('filtro-total-estado');
    openUnidadeModalBtn = document.getElementById('open-unidade-modal-btn');
    unidadeModal = document.getElementById('unidade-modal');
    modalOverlay = document.getElementById('modal-overlay');
    closeModalBtn = document.getElementById('close-modal-btn');
    unidadeSearchInput = document.getElementById('unidade-search-input');
    unidadeListContainer = document.getElementById('unidade-list-container');
    clearUnidadeSelectionBtn = document.getElementById('clear-unidade-selection-btn');
    connectionStatusEl = document.getElementById('connectionStatus');
    
    openUnidadeModalBtn.disabled = true;

    // Event Listeners
    filtroServicoEl.addEventListener('change', handleServicoChange);
    filtroEstadoEl.addEventListener('change', handleFilterChange);
    filtroDoacaoEl.addEventListener('change', handleFilterChange);
    filtroBuscaEl.addEventListener('input', debounce(handleFilterChange, 400));
    verResumoGeralBtn.addEventListener('click', handleResumoClick);
    document.addEventListener('click', (event) => { if (event.target && event.target.dataset.page) { handlePageChange(event); } });
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });

    filtroEstoqueUnidadeEl.addEventListener('input', () => renderEstoque(allEstoqueItems));
    filtroEstoqueBuscaEl.addEventListener('input', debounce(() => renderEstoque(allEstoqueItems), 400));
    
    filtroTotalCategoriaEl.addEventListener('change', () => {
        populateTotalItensUnidades();
        renderTotalItens();
    });
    filtroTotalUnidadeEl.addEventListener('change', renderTotalItens);
    filtroTotalEstadoEl.addEventListener('change', renderTotalItens);
    filtroTotalItemEl.addEventListener('input', debounce(renderTotalItens, 400));
    
    openUnidadeModalBtn.addEventListener('click', () => { populateUnidadeModalList(); openUnidadeModal(); });
    closeModalBtn.addEventListener('click', closeUnidadeModal);
    modalOverlay.addEventListener('click', closeUnidadeModal);
    unidadeSearchInput.addEventListener('input', debounce((e) => populateUnidadeModalList(e.target.value), 300));
    unidadeListContainer.addEventListener('click', (e) => {
        const targetLi = e.target.closest('li');
        if (targetLi && targetLi.dataset.value) {
            selectedUnidadeValue = targetLi.dataset.value;
            openUnidadeModalBtn.textContent = targetLi.dataset.text;
            closeUnidadeModal();
            handleUnidadeChange();
        }
    });
    clearUnidadeSelectionBtn.addEventListener('click', () => {
        selectedUnidadeValue = '';
        openUnidadeModalBtn.textContent = 'Selecione uma Unidade...';
        closeUnidadeModal();
        handleUnidadeChange();
    });
}

// --- LÓGICA DO PAINEL DE PRIORIDADES (DASHBOARD) ---
class PriorityAnalyzer {
    analyze(items) {
        const unitsData = new Map();
        const itemsForAnalysis = items.filter(item => {
            const type = normalizeString(item.type);
            const unitCondition = normalizeString(item.unit_condition);
            return type !== 'sede' && !unitCondition.includes('circo escola');
        });

        itemsForAnalysis.forEach(item => {
            const unitKey = item.unit_condition;
            if (!unitsData.has(unitKey)) {
                unitsData.set(unitKey, {
                    name: formatUnitName(item),
                    items: [],
                    avariados: 0,
                    regulares: 0,
                    totalItems: 0
                });
            }
            const unit = unitsData.get(unitKey);
            unit.items.push(item);
            unit.totalItems += item.quantity;
            if (item.state === 'Avariado') unit.avariados += item.quantity;
            if (item.state === 'Regular') unit.regulares += item.quantity;
        });

        const allUnits = Array.from(unitsData.values());

        allUnits.forEach(u => {
            if (u.totalItems > 0) {
                u.attentionScore = ((u.avariados * 3) + u.regulares) / u.totalItems;
            } else {
                u.attentionScore = 0;
            }
        });
        const attention = allUnits.filter(u => u.attentionScore > 0).sort((a,b) => b.attentionScore - a.attentionScore).slice(0, 10);
        
        const noBebedouro = allUnits.filter(unit => {
            const bebedouros = unit.items.filter(item => normalizeString(item.description).includes('bebedouro'));
            if (bebedouros.length === 0) return true; 
            return !bebedouros.some(b => b.state !== 'Avariado');
        }).slice(0, 10);
        
        return { attention, noBebedouro };
    }
}
const priorityAnalyzer = new PriorityAnalyzer();

function renderDashboard() {
    if (!allItems || allItems.length === 0) {
        document.getElementById('content-dashboard').innerHTML = `<div class="card text-center p-10"><p>Nenhum dado para exibir no dashboard.</p></div>`;
        return;
    }

    if (dashboardEstadoChartInstance) dashboardEstadoChartInstance.destroy();
    if (dashboardTopItemsChartInstance) dashboardTopItemsChartInstance.destroy();

    const totalItens = allItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalUnidades = new Set(allItems.map(item => item.unit_condition)).size;
    const totalAvariados = allItems.filter(i => i.state === 'Avariado').reduce((sum, item) => sum + item.quantity, 0);
    
    const analysis = priorityAnalyzer.analyze(allItems);
    const unidadesAtencao = analysis.attention.length;

    document.getElementById('kpi-total-itens').textContent = totalItens.toLocaleString('pt-BR');
    document.getElementById('kpi-total-unidades').textContent = totalUnidades.toLocaleString('pt-BR');
    document.getElementById('kpi-total-avariados').textContent = totalAvariados.toLocaleString('pt-BR');
    document.getElementById('kpi-unidades-atencao').textContent = unidadesAtencao.toLocaleString('pt-BR');

    const estadoChartCanvas = document.getElementById('dashboardEstadoChart');
    if (estadoChartCanvas) {
        const estadoData = {
            labels: ['Novo', 'Bom', 'Regular', 'Avariado'],
            datasets: [{
                label: 'Quantidade de Itens',
                data: [
                    allItems.filter(i => i.state === 'Novo').reduce((s, i) => s + i.quantity, 0),
                    allItems.filter(i => i.state === 'Bom').reduce((s, i) => s + i.quantity, 0),
                    allItems.filter(i => i.state === 'Regular').reduce((s, i) => s + i.quantity, 0),
                    totalAvariados
                ],
                backgroundColor: [ stateColors['Novo'].hex, stateColors['Bom'].hex, stateColors['Regular'].hex, stateColors['Avariado'].hex ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        };
        dashboardEstadoChartInstance = new Chart(estadoChartCanvas, { type: 'doughnut', data: estadoData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#334155' }}}}});
    }

    const topItemsChartCanvas = document.getElementById('dashboardTopItemsChart');
    if (topItemsChartCanvas) {
        const newItems = allItems.filter(item => item.state === 'Novo');
        const itemCounts = newItems.reduce((acc, item) => {
            const normalizedDescription = normalizeItemDescriptionForChart(item.description);
            if (normalizedDescription !== 'N/D') {
               acc[normalizedDescription] = (acc[normalizedDescription] || 0) + item.quantity;
            }
            return acc;
        }, {});
        const topItems = Object.entries(itemCounts).sort(([, a], [, b]) => b - a).slice(0, 10);
        const topItemsData = {
            labels: topItems.map(item => item[0]),
            datasets: [{ label: 'Quantidade Total', data: topItems.map(item => item[1]), backgroundColor: '#667eea', borderColor: '#4338ca', borderWidth: 1 }]
        };
        dashboardTopItemsChartInstance = new Chart(topItemsChartCanvas, { type: 'bar', data: topItemsData, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }}, scales: { x: { beginAtZero: true, ticks: { precision: 0, color: '#64748b' }, grid: { color: 'rgba(0, 0, 0, 0.1)' }}, y: { ticks: { color: '#64748b' }, grid: { display: false }}}}});
    }

    const attentionContainer = document.getElementById('dashboard-attention-units-list');
    if(attentionContainer) attentionContainer.innerHTML = analysis.attention.length > 0 ? analysis.attention.map(u => `<p class="text-sm text-slate-600">${u.name} <span class="font-bold text-yellow-500">(${u.avariados} avariados, ${u.regulares} regulares)</span></p>`).join('') : '<p class="text-sm text-slate-500">Nenhuma unidade em atenção.</p>';
    
    const noBebedouroContainer = document.getElementById('dashboard-no-bebedouro-units-list');
    if(noBebedouroContainer) noBebedouroContainer.innerHTML = analysis.noBebedouro.length > 0 ? analysis.noBebedouro.map(u => `<p class="text-sm text-slate-600">${u.name}</p>`).join('') : '<p class="text-sm text-slate-500">Todas as unidades têm bebedouro funcional.</p>';
}

// --- LÓGICA DA ABA SEDE (NOVO LAYOUT) ---
let currentSedeFilter = 'all';
let currentSedeFloor = 'Todos';

function renderSedeReport() {
    const floorNavContainer = document.getElementById('sede-floor-nav');
    const roomsContainer = document.getElementById('sede-rooms-container');
    const noResults = document.getElementById('noResultsSede');
    const searchBox = document.getElementById('searchBoxSede');
    const searchTerm = searchBox.value.toLowerCase();

    if (floorNavContainer.children.length === 0) {
        const floorOrder = ['Todos', 'SUBSOLO', 'TÉRREO', 'MEZANINO', '1º ANDAR', '2º ANDAR', '3º ANDAR', 'PENDENTE'];
        floorNavContainer.innerHTML = floorOrder.map(floor => {
            const floorName = floor === 'PENDENTE' ? 'Pendentes' : floor;
            return `<button class="floor-nav-button ${floor === 'Todos' ? 'active' : ''}" data-floor="${floor}">${floorName}</button>`;
        }).join('');
        floorNavContainer.querySelectorAll('.floor-nav-button').forEach(btn => {
            btn.addEventListener('click', () => {
                currentSedeFloor = btn.dataset.floor;
                floorNavContainer.querySelector('.active').classList.remove('active');
                btn.classList.add('active');
                renderSedeReport();
            });
        });
    }
    
    let filteredData = sedeData.filter(item => {
        const matchFloor = currentSedeFloor === 'Todos' || item.local === currentSedeFloor;
        const hasMatchingSector = item.setores.some(setor => setor.nome.toLowerCase().includes(searchTerm) || (setor.registro && setor.registro.toLowerCase().includes(searchTerm)));
        const matchSearch = searchTerm === '' || item.sala.toLowerCase().includes(searchTerm) || item.tipo.toLowerCase().includes(searchTerm) || item.local.toLowerCase().includes(searchTerm) || hasMatchingSector;
        const matchRegistry = currentSedeFilter !== 'no-registry' || item.setores.some(s => !s.registro || s.observacao);
        return matchFloor && matchSearch && matchRegistry;
    });
    
    if (filteredData.length === 0) {
        roomsContainer.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    roomsContainer.innerHTML = filteredData.map(room => {
        const hasNoRegistry = room.setores.some(s => !s.registro || s.observacao);
        const cardClass = hasNoRegistry ? 'room-card-sede no-registry fade-in' : 'room-card-sede fade-in';
        const setoresHTML = room.setores.map(setor => `
            <div class="department-item-sede">
                <p class="department-name-sede">${setor.nome}</p>
                <p class="department-registro-sede">Registro: ${setor.registro || 'N/A'}</p>
                ${setor.observacao ? `<p class="department-observacao-sede">${setor.observacao}</p>` : ''}
            </div>
        `).join('');

        return `
            <div class="${cardClass}">
                <div class="room-card-header">
                    <p class="room-card-subtitle">${room.local} - ${room.tipo}</p>
                    <h3 class="room-card-title">${room.sala}</h3>
                </div>
                <div class="room-card-body">${setoresHTML}</div>
            </div>`;
    }).join('');
}

function initSedeTab() {
    document.getElementById('searchBoxSede').addEventListener('input', debounce(renderSedeReport, 300));
    document.getElementById('filterAllSede').addEventListener('click', function() {
        currentSedeFilter = 'all';
        document.querySelectorAll('#content-sede .filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        renderSedeReport();
    });
    document.getElementById('filterNoRegistrySede').addEventListener('click', function() {
        currentSedeFilter = 'no-registry';
        document.querySelectorAll('#content-sede .filter-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        renderSedeReport();
    });
}

// --- INICIALIZAÇÃO GERAL ---
document.addEventListener('DOMContentLoaded', async () => {
    initApp(); 
    initSedeTab();
    
    const intelligentDashboard = document.getElementById('intelligent-dashboard');
    const loaderHTML = `<div class="card text-center p-10 col-span-full"><div class="loading-spinner"></div><p class="mt-4 text-slate-600">A carregar dados...</p></div>`;
    if(intelligentDashboard) intelligentDashboard.innerHTML = loaderHTML;

    connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></span> <span>A conectar...</span>`;
    
    try {
        const patrimonioData = await dataManager.fetchWithCache(googleSheetPatrimonioUrl, 'patrimonio');
        if (!patrimonioData || !Array.isArray(patrimonioData)) {
            throw new Error("Nenhum dado de patrimônio foi retornado. Verifique a planilha e o script.");
        }
        allItems = formatSheetData(patrimonioData);
        connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-green-500 rounded-full"></span> <span>Conectado</span>`;
        
        updateFilterOptions();
        switchTab('dashboard');
        const now = new Date();
        const formattedDate = now.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        document.getElementById('last-update-time').textContent = `Dados de ${formattedDate}`;
    } catch (error) {
        console.error('Erro fatal ao inicializar o painel:', error);
        connectionStatusEl.innerHTML = `<span class="h-3 w-3 bg-red-500 rounded-full"></span> <span class="text-red-500">Erro</span>`;
        const errorHTML = `<div class="alert alert-error col-span-full"><h2 class="font-bold">Erro ao Carregar Painel</h2><p class="mt-2">Não foi possível carregar os dados do patrimônio.</p><p class="text-sm mt-4"><strong>Detalhes:</strong> ${error.message}</p></div>`;
        if(intelligentDashboard) intelligentDashboard.innerHTML = errorHTML;
    }
});
    </script>
</body>
</html>
