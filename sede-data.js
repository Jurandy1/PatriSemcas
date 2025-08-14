/**
 * =================================================================
 * ESTRUTURA DE DADOS DA SEDE - SEMCAS
 * =================================================================
 * Este arquivo centraliza os dados da organização das salas e setores na Sede.
 * Para atualizar, basta editar as informações neste arquivo.
 */
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
    { local: "TÉRREO", sala: "SALA 6", tipo: "DIVIDIDA POR GESSO", setores: [{ nome: "COORDENAÇÃO DE PROTEÇÃO PARA PESSOAS COM DEFICIÊNCIA E IDOSAS", registro: "140.99 - COORDENAÇÃO DE PROTEÇÃO PARA PESSOAS COM DEFICIÊNCIA E IDOSAS", observacao: "" }] },
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
        { nome: "ASSESSORIA TÉCNICA (ASTEC)", registro: "140.78 - ASSESSORIA TÉCNICA / COMUNICAÇÃO", observacao: "" },
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
    { local: "1º ANDAR", sala: "SALA 12", tipo: "SALA INDIVIDUAL", setores: [{ nome: "GABINETE DO SECRETÁRIO ADJUNTO DE ADMINISTRAÇÃO", registro: "140.74 - GABINETE DA SECRETÁRIA ADJUNTA DE GESTÃO", observacao: "" }] },
    { local: "1º ANDAR", sala: "SALA 13", tipo: "SALA INDIVIDUAL", setores: [{ nome: "COORDENAÇÃO DE CONTRATOS", registro: "140.2 - COORDENAÇÃO DE CONTRATOS E CONVÊNIOS / 140.86 - COORDENAÇÃO DE CONTRATOS", observacao: "Recomenda-se unificar no sistema (sugerido: manter 140.86)." }] },
    
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
