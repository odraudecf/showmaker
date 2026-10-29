// Dados fictícios do protótipo. Nada aqui é salvo: servem só para preencher as telas
// com um LabMaker coerente (mesmas pessoas, espaços e equipamentos em todo lugar).
(function () {
  var usuarios = [
    { id: "ar", nome: "Ana Ribeiro", email: "ana.ribeiro@labmaker.org", perfil: "Gestora", status: "Ativo", desde: "02/03/2026", cor: "" },
    { id: "cm", nome: "Carlos Menezes", email: "carlos.menezes@labmaker.org", perfil: "Professor", status: "Ativo", desde: "05/03/2026", cor: "avatar--azul" },
    { id: "bn", nome: "Beatriz Nunes", email: "beatriz.nunes@labmaker.org", perfil: "Professora", status: "Ativo", desde: "05/03/2026", cor: "avatar--lilas" },
    { id: "jp", nome: "Júlia Prates", email: "julia.prates@aluno.labmaker.org", perfil: "Aluna", status: "Ativo", desde: "18/03/2026", cor: "avatar--verde" },
    { id: "rl", nome: "Rafael Lima", email: "rafael.lima@aluno.labmaker.org", perfil: "Aluno", status: "Ativo", desde: "18/03/2026", cor: "avatar--mostarda" },
    { id: "mt", nome: "Marcos Teixeira", email: "marcos.teixeira@aluno.labmaker.org", perfil: "Aluno", status: "Inativo", desde: "18/03/2026", cor: "avatar--azul" },
  ];

  var espacos = [
    { nome: "Sala de Prototipagem", capacidade: 16, recursos: "2 impressoras 3D, cortadora a laser, bancada de montagem", status: "Disponível" },
    { nome: "Bancada de Eletrônica", capacidade: 8, recursos: "3 estações de solda, osciloscópio, fontes de bancada", status: "Disponível" },
    { nome: "Área de Marcenaria", capacidade: 6, recursos: "Serra tico-tico, furadeira de bancada, lixadeira", status: "Em manutenção" },
    { nome: "Sala de Reuniões", capacidade: 10, recursos: "TV, quadro branco", status: "Disponível" },
  ];

  var tiposEquipamento = [
    {
      nome: "Impressora 3D", marca: "Creality", modelo: "Ender-3 V2", categoria: "Fabricação digital",
      unidades: [
        { nome: "Impressora 3D Creality 1", status: "Disponível" },
        { nome: "Impressora 3D Creality 2", status: "Em manutenção" },
      ],
    },
    {
      nome: "Cortadora a laser", marca: "Visutec", modelo: "VS4040 40W", categoria: "Fabricação digital",
      unidades: [{ nome: "Cortadora a laser 1", status: "Disponível" }],
    },
    {
      nome: "Ferro de solda", marca: "Hikari", modelo: "SC-60", categoria: "Eletrônica",
      unidades: [
        { nome: "Ferro de solda 1", status: "Disponível" },
        { nome: "Ferro de solda 2", status: "Emprestado" },
        { nome: "Ferro de solda 3", status: "Disponível" },
      ],
    },
    {
      nome: "Kit de ferramentas", marca: "Tramontina", modelo: "Kit 44 peças", categoria: "Ferramentas manuais",
      unidades: [
        { nome: "Kit de ferramentas 1", status: "Disponível" },
        { nome: "Kit de ferramentas 2", status: "Disponível" },
        { nome: "Kit de ferramentas 3", status: "Emprestado" },
      ],
    },
    {
      nome: "Osciloscópio", marca: "Minipa", modelo: "MO-2061", categoria: "Eletrônica",
      unidades: [{ nome: "Osciloscópio 1", status: "Disponível" }],
    },
  ];

  var itens = [
    { nome: "Filamento PLA branco 1 kg", categoria: "Insumo de impressão", saldo: 3, minimo: 5, unidade: "rolo", local: "Armário A, prateleira 2" },
    { nome: "Filamento PETG preto 1 kg", categoria: "Insumo de impressão", saldo: 6, minimo: 3, unidade: "rolo", local: "Armário A, prateleira 2" },
    { nome: "Chapa de MDF 3 mm (60 × 40 cm)", categoria: "Material de corte", saldo: 18, minimo: 10, unidade: "chapa", local: "Rack de chapas" },
    { nome: "Placa Arduino Uno R3", categoria: "Componente eletrônico", saldo: 12, minimo: 6, unidade: "un", local: "Gaveteiro E, gaveta 3" },
    { nome: "Resistores 220 Ω (pacote c/ 100)", categoria: "Componente eletrônico", saldo: 2, minimo: 4, unidade: "pacote", local: "Gaveteiro E, gaveta 1" },
    { nome: "Sensor de umidade do solo", categoria: "Componente eletrônico", saldo: 9, minimo: 4, unidade: "un", local: "Gaveteiro E, gaveta 5" },
    { nome: "Estanho para solda 1 mm", categoria: "Consumível", saldo: 1, minimo: 2, unidade: "tubo", local: "Bancada de Eletrônica" },
    { nome: "Bastão de cola quente", categoria: "Consumível", saldo: 40, minimo: 20, unidade: "un", local: "Armário B, prateleira 1" },
  ];

  var demandas = [
    { cod: "D-021", titulo: "Comprar filamento PLA branco", categoria: "Compra de material", prioridade: "alta", resp: "ar", prazo: "31/10", status: "Em análise", projeto: "Manutenção do lab", comentarios: 2, anexos: 1 },
    { cod: "D-019", titulo: "Imprimir suportes dos sensores da horta", categoria: "Fabricação digital", prioridade: "alta", resp: "cm", prazo: "30/10", status: "Em andamento", projeto: "Horta automatizada", comentarios: 3, anexos: 2 },
    { cod: "D-018", titulo: "Trocar o bico da Creality 2", categoria: "Manutenção", prioridade: "urgente", resp: "rl", prazo: "25/10", status: "Em andamento", projeto: "Manutenção do lab", comentarios: 4, anexos: 0, atrasada: true },
    { cod: "D-017", titulo: "Sensores extras para a horta", categoria: "Compra de material", prioridade: "media", resp: "jp", prazo: "05/11", status: "Aberta", projeto: "Horta automatizada", comentarios: 0, anexos: 0 },
    { cod: "D-016", titulo: "Organizar o gaveteiro de componentes", categoria: "Organização", prioridade: "baixa", resp: "rl", prazo: "08/11", status: "Aberta", projeto: "Manutenção do lab", comentarios: 1, anexos: 0 },
    { cod: "D-020", titulo: "Cortar peças do braço robótico", categoria: "Fabricação digital", prioridade: "media", resp: "bn", prazo: "12/11", status: "Aberta", projeto: "Braço robótico didático", comentarios: 0, anexos: 1 },
    { cod: "D-015", titulo: "Treinamento na cortadora a laser", categoria: "Capacitação", prioridade: "media", resp: "bn", prazo: "22/10", status: "Concluída", projeto: "Manutenção do lab", comentarios: 2, anexos: 0 },
    { cod: "D-014", titulo: "Kit de solda para a oficina", categoria: "Compra de material", prioridade: "alta", resp: "cm", prazo: "27/10", status: "Concluída", projeto: "Estação meteorológica", comentarios: 1, anexos: 0 },
    { cod: "D-012", titulo: "Pintar a bancada de marcenaria", categoria: "Manutenção", prioridade: "baixa", resp: "rl", prazo: "15/10", status: "Cancelada", projeto: "Manutenção do lab", comentarios: 1, anexos: 0 },
  ];

  // Outubro de 2026 (dia 1 cai numa quinta-feira; hoje é 29/10)
  var eventos = [
    { dia: 6, ini: "14:00", fim: "17:00", nome: "Workshop de impressão 3D", tipo: "Workshop", espaco: "Sala de Prototipagem", status: "Realizado" },
    { dia: 9, ini: "10:00", fim: "11:00", nome: "Reunião de planejamento", tipo: "Reunião", espaco: "Sala de Reuniões", status: "Realizado" },
    { dia: 13, ini: "19:00", fim: "21:00", nome: "Aula: Arduino básico", tipo: "Aula", espaco: "Bancada de Eletrônica", status: "Realizado" },
    { dia: 15, ini: "08:00", fim: "12:00", nome: "Treinamento na cortadora a laser", tipo: "Workshop", espaco: "Sala de Prototipagem", status: "Realizado" },
    { dia: 20, ini: "19:00", fim: "21:00", nome: "Aula: sensores e atuadores", tipo: "Aula", espaco: "Bancada de Eletrônica", status: "Realizado" },
    { dia: 22, ini: "13:00", fim: "17:00", nome: "Manutenção da marcenaria", tipo: "Manutenção", espaco: "Área de Marcenaria", status: "Cancelado" },
    { dia: 27, ini: "14:00", fim: "17:00", nome: "Oficina de solda para iniciantes", tipo: "Workshop", espaco: "Bancada de Eletrônica", status: "Realizado" },
    { dia: 29, ini: "14:00", fim: "17:00", nome: "Workshop de modelagem 3D", tipo: "Workshop", espaco: "Sala de Prototipagem", status: "Em andamento" },
    { dia: 29, ini: "19:00", fim: "21:00", nome: "Aula: robótica com servomotores", tipo: "Aula", espaco: "Bancada de Eletrônica", status: "Agendado" },
    { dia: 30, ini: "08:00", fim: "12:00", nome: "Reserva: Creality 1 para a horta", tipo: "Reserva", espaco: "Sala de Prototipagem", status: "Agendado" },
    { dia: 30, ini: "15:00", fim: "16:00", nome: "Reunião do projeto braço robótico", tipo: "Reunião", espaco: "Sala de Reuniões", status: "Agendado" },
    { dia: 31, ini: "09:00", fim: "16:00", nome: "Feira maker aberta à comunidade", tipo: "Evento", espaco: "Sala de Prototipagem", status: "Agendado" },
  ];

  var movimentacoes = [
    { quando: "29/10 10:42", tipo: "Saída", item: "Filamento PLA branco 1 kg", qtd: 1, resp: "cm", origem: "Demanda D-019" },
    { quando: "28/10 16:05", tipo: "Entrada", item: "Sensor de umidade do solo", qtd: 6, resp: "ar", origem: "Nota fiscal 4471" },
    { quando: "27/10 13:50", tipo: "Saída", item: "Estanho para solda 1 mm", qtd: 2, resp: "cm", origem: "Evento: Oficina de solda" },
    { quando: "27/10 13:48", tipo: "Saída", item: "Placa Arduino Uno R3", qtd: 4, resp: "cm", origem: "Evento: Oficina de solda" },
    { quando: "24/10 09:15", tipo: "Ajuste", item: "Resistores 220 Ω (pacote c/ 100)", qtd: -1, resp: "ar", origem: "Inventário de 24/10" },
    { quando: "22/10 11:30", tipo: "Entrada", item: "Chapa de MDF 3 mm (60 × 40 cm)", qtd: 10, resp: "ar", origem: "Doação da marcenaria Alegre" },
    { quando: "20/10 18:40", tipo: "Saída", item: "Bastão de cola quente", qtd: 8, resp: "bn", origem: "Evento: Aula sensores e atuadores" },
  ];

  var atividade = [
    { quando: "hoje 10:42", quem: "cm", texto: "registrou a saída de 1 rolo de filamento PLA branco", modulo: "estoque" },
    { quando: "hoje 09:30", quem: "jp", texto: "comentou na demanda D-019", modulo: "demandas" },
    { quando: "hoje 08:10", quem: "ar", texto: "mudou a demanda D-021 para em análise", modulo: "demandas" },
    { quando: "ontem 16:05", quem: "ar", texto: "registrou a entrada de 6 sensores de umidade", modulo: "estoque" },
    { quando: "ontem 14:22", quem: "bn", texto: "agendou a reunião do projeto braço robótico", modulo: "agenda" },
    { quando: "ontem 11:00", quem: "rl", texto: "anexou fotos do bico na demanda D-018", modulo: "demandas" },
  ];

  function usuario(id) {
    for (var i = 0; i < usuarios.length; i++) if (usuarios[i].id === id) return usuarios[i];
    return usuarios[0];
  }

  function iniciais(nome) {
    var partes = nome.split(" ");
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }

  function avatar(id, extra) {
    var u = usuario(id);
    return '<span class="avatar ' + u.cor + " " + (extra || "") + '" title="' + u.nome + '">' + iniciais(u.nome) + "</span>";
  }

  // Cada status vira um carimbo com uma cor própria
  var corDoStatus = {
    "Agendado": "", "Em andamento": "carimbo--ocre", "Realizado": "carimbo--verde", "Cancelado": "carimbo--cinza",
    "Aberta": "", "Em análise": "carimbo--roxo", "Concluída": "carimbo--verde", "Cancelada": "carimbo--cinza",
    "Atrasada": "carimbo--vermelho", "Repor": "carimbo--vermelho",
    "Disponível": "carimbo--verde", "Em manutenção": "carimbo--ocre", "Emprestado": "", "Ativo": "carimbo--verde", "Inativo": "carimbo--cinza",
  };

  function carimbo(status, grande) {
    return '<span class="carimbo ' + (corDoStatus[status] || "") + (grande ? " carimbo--grande" : "") + '">' + status + "</span>";
  }

  var nomePrioridade = { baixa: "Baixa", media: "Média", alta: "Alta", urgente: "Urgente" };

  function fita(prioridade) {
    return '<span class="fita fita--' + prioridade + '">' + nomePrioridade[prioridade] + "</span>";
  }

  window.Dados = {
    usuarios: usuarios,
    espacos: espacos,
    tiposEquipamento: tiposEquipamento,
    itens: itens,
    demandas: demandas,
    eventos: eventos,
    movimentacoes: movimentacoes,
    atividade: atividade,
    usuario: usuario,
    iniciais: iniciais,
    avatar: avatar,
    carimbo: carimbo,
    fita: fita,
  };

  window.Screens = window.Screens || {};
  window.Fichas = window.Fichas || {};
})();
