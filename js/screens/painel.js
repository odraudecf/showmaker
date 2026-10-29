// Painel (RF04, RF39, RF44): resumo de agenda, estoque e demandas.
(function () {
  var D = window.Dados;

  function proximosEventos() {
    return D.eventos
      .filter(function (e) { return e.dia >= 29 && e.status !== "Cancelado"; })
      .slice(0, 4)
      .map(function (e) {
        var quando = e.dia === 29 ? "Hoje" : e.dia === 30 ? "Amanhã" : "Sáb., 31";
        return (
          '<li class="evento-linha" data-ficha="evento">' +
          '<span class="evento-linha__hora mao">' + quando + ", " + e.ini + "</span>" +
          '<span class="evento-linha__nome">' + e.nome + "<small>" + e.espaco + "</small></span>" +
          D.carimbo(e.status) +
          "</li>"
        );
      })
      .join("");
  }

  function itensParaRepor() {
    return D.itens
      .filter(function (i) { return i.saldo < i.minimo; })
      .map(function (i) {
        return (
          '<li class="repor-linha" data-ficha="item">' +
          '<span class="repor-linha__nome">' + i.nome + "</span>" +
          '<span class="repor-linha__saldo"><b>' + i.saldo + "</b> de mín. " + i.minimo + "</span>" +
          D.carimbo("Repor") +
          "</li>"
        );
      })
      .join("");
  }

  function demandasUrgentes() {
    return D.demandas
      .filter(function (d) { return d.status !== "Concluída" && d.status !== "Cancelada" && (d.prioridade === "urgente" || d.prioridade === "alta"); })
      .map(function (d) {
        return (
          '<li class="demanda-linha" data-ficha="demanda">' +
          '<span class="pequeno suave">' + d.cod + "</span>" +
          '<span class="demanda-linha__titulo">' + d.titulo + "</span>" +
          D.fita(d.prioridade) +
          (d.atrasada ? D.carimbo("Atrasada") : "") +
          "</li>"
        );
      })
      .join("");
  }

  function atividade() {
    return D.atividade
      .map(function (a) {
        return (
          '<li><span class="caderneta__quando">' + a.quando + "</span>" +
          '<span class="caderneta__texto"><span class="ponto-modulo" style="--cor: var(--cor-' + a.modulo + ')"></span><b>' +
          D.usuario(a.quem).nome + "</b> " + a.texto + "</span></li>"
        );
      })
      .join("");
  }

  window.Screens.painel = {
    titulo: "Painel",
    cor: "var(--cor-painel)",
    fixa: true,
    html: function () {
      return (
        '<div class="cabecalho">' +
        "<div><h1>Bom dia, Ana</h1><p>Quinta-feira, 29 de outubro. O que está acontecendo no LabMaker hoje.</p></div>" +
        '<div class="acoes">' +
        '<button class="btn so-equipe" data-ficha="evento-novo">' + Icone.mais + "Novo evento</button>" +
        '<button class="btn" data-ficha="demanda-nova">' + Icone.mais + "Nova demanda</button>" +
        '<button class="btn so-equipe" data-ficha="movimentacao">' + Icone.ajuste + "Registrar movimentação</button>" +
        "</div></div>" +

        '<div class="painel-grade">' +

        '<section class="ficha ficha--pautada painel-agenda">' +
        '<div class="ficha__topo"><h3>Próximos na agenda</h3><button class="link" data-abrir="agenda">Abrir agenda</button></div>' +
        '<ul class="lista-pauta">' + proximosEventos() + "</ul></section>" +

        '<section class="ficha painel-demandas">' +
        '<div class="ficha__topo"><h3>Demandas</h3><button class="link" data-abrir="demandas">Abrir demandas</button></div>' +
        '<div class="contadores">' +
        '<div class="contador"><span class="contador__n">5</span><span>em aberto</span></div>' +
        '<div class="contador contador--alerta"><span class="contador__n">1</span><span>atrasada</span></div>' +
        '<div class="contador"><span class="contador__n">2</span><span>concluídas em outubro</span></div>' +
        "</div>" +
        '<p class="rotulo painel-sub">Prioridade alta e urgente</p>' +
        '<ul class="lista-pauta">' + demandasUrgentes() + "</ul></section>" +

        '<section class="ficha ficha--pautada painel-estoque">' +
        '<div class="ficha__topo"><h3>Estoque abaixo do mínimo</h3><button class="link" data-abrir="estoque">Abrir estoque</button></div>' +
        '<ul class="lista-pauta">' + itensParaRepor() + "</ul></section>" +

        '<section class="caderneta painel-atividade">' +
        "<h3>Atividade recente no laboratório</h3>" +
        "<ol>" + atividade() + "</ol></section>" +

        "</div>"
      );
    },
  };
})();
