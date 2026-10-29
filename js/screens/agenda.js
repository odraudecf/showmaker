// Agenda (RF09–RF17, RF40, RF41): calendário do mês, próximos dias e ficha de evento.
(function () {
  var D = window.Dados;
  var diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function eventosDoDia(dia) {
    return D.eventos.filter(function (e) { return e.dia === dia; });
  }

  function calendario() {
    var html = diasSemana.map(function (d) { return '<div class="cal__semana">' + d + "</div>"; }).join("");

    // 1º de outubro de 2026 é quinta: 4 dias de setembro antes
    [27, 28, 29, 30].forEach(function (d) {
      html += '<div class="cal__dia cal__dia--fora"><span class="cal__num">' + d + "</span></div>";
    });

    for (var dia = 1; dia <= 31; dia++) {
      var evs = eventosDoDia(dia);
      var chips = evs
        .map(function (e) {
          return (
            '<button class="cal__evento cal__evento--' + e.status.toLowerCase().replace(" ", "-") + '" data-ficha="evento">' +
            "<b>" + e.ini + "</b> " + e.nome + "</button>"
          );
        })
        .join("");
      html +=
        '<div class="cal__dia' + (dia === 29 ? " cal__dia--hoje" : "") + '">' +
        '<span class="cal__num">' + dia + "</span>" + chips + "</div>";
    }
    return html;
  }

  function proximosDias() {
    var grupos = [
      { dia: 29, titulo: "Hoje, quinta 29" },
      { dia: 30, titulo: "Sexta, 30" },
      { dia: 31, titulo: "Sábado, 31" },
    ];
    return grupos
      .map(function (g) {
        return (
          '<li><h4 class="mao proximos__dia">' + g.titulo + "</h4><ul>" +
          eventosDoDia(g.dia)
            .map(function (e) {
              return (
                '<li><button class="evento-ficha" data-ficha="evento">' +
                '<span class="evento-ficha__hora">' + e.ini + "–" + e.fim + "</span>" +
                '<span class="evento-ficha__nome">' + e.nome + "</span>" +
                '<span class="evento-ficha__meta">' + Icone.local + e.espaco + "</span>" +
                D.carimbo(e.status) +
                "</button></li>"
              );
            })
            .join("") +
          "</ul></li>"
        );
      })
      .join("");
  }

  window.Screens.agenda = {
    titulo: "Agenda",
    cor: "var(--cor-agenda)",
    html: function () {
      return (
        '<div class="cabecalho">' +
        "<div><h2>Agenda</h2><p>Eventos, aulas e reservas de espaços e equipamentos.</p></div>" +
        '<div class="acoes">' +
        '<label class="campo campo--inline"><span class="sr-only">Filtrar por espaço</span>' +
        '<select><option>Todos os espaços</option>' +
        D.espacos.map(function (e) { return "<option>" + e.nome + "</option>"; }).join("") +
        "</select></label>" +
        '<button class="btn btn--tinta so-equipe" data-ficha="evento-novo">' + Icone.mais + "Novo evento</button>" +
        "</div></div>" +

        '<div class="agenda">' +
        '<section class="cal-folha" aria-label="Calendário de outubro de 2026">' +
        '<div class="cal-folha__espiral" aria-hidden="true"></div>' +
        '<div class="cal-folha__mes">' +
        '<button class="fechar" aria-label="Mês anterior" data-toast="No protótipo, só outubro de 2026 tem eventos.">' + Icone.voltar + "</button>" +
        '<h3>Outubro de 2026</h3>' +
        '<button class="fechar" aria-label="Próximo mês" data-toast="No protótipo, só outubro de 2026 tem eventos.">' + Icone.avancar + "</button>" +
        "</div>" +
        '<div class="cal">' + calendario() + "</div>" +
        '<p class="cal-legenda pequeno suave">Clique num evento para abrir a ficha. Cores: azul agendado, ocre em andamento, verde realizado, cinza cancelado.</p>' +
        "</section>" +

        '<aside class="proximos">' +
        '<h3>Próximos dias</h3>' +
        '<ul class="proximos__lista">' + proximosDias() + "</ul>" +
        "</aside>" +
        "</div>"
      );
    },
  };

  // ---------- Ficha de evento ----------

  function participantes(ids) {
    return ids
      .map(function (id) {
        var u = D.usuario(id);
        return (
          '<span class="chip">' + D.avatar(id, "avatar--p") + u.nome +
          '<button type="button" class="so-equipe" data-remover-chip aria-label="Remover ' + u.nome + '">' + Icone.fechar + "</button></span>"
        );
      })
      .join("");
  }

  function equipamentos(marcados) {
    var lista = [];
    D.tiposEquipamento.slice(0, 3).forEach(function (t) {
      t.unidades.forEach(function (u) { lista.push(u); });
    });
    return lista
      .map(function (u) {
        var desligado = u.status !== "Disponível";
        return (
          '<label class="marcar' + (desligado ? " marcar--desligado" : "") + '">' +
          '<input type="checkbox"' + (marcados.indexOf(u.nome) > -1 ? " checked" : "") + (desligado ? " disabled" : "") + "> " +
          u.nome + (desligado ? ' <span class="pequeno">(' + u.status.toLowerCase() + ")</span>" : "") +
          "</label>"
        );
      })
      .join("");
  }

  function opcoes(lista, selecionado) {
    return lista
      .map(function (o) { return "<option" + (o === selecionado ? " selected" : "") + ">" + o + "</option>"; })
      .join("");
  }

  function fichaEvento(ev) {
    var novo = !ev.nome;
    return (
      '<form class="gaveta__form" data-toast="' + (novo ? "Evento criado" : "Evento salvo") + '. No protótipo, nada é gravado de verdade.">' +
      '<header class="gaveta__topo">' +
      '<div><span class="rotulo">Agenda</span><h2 id="ficha-titulo">' + (novo ? "Novo evento" : "Ficha do evento") + "</h2></div>" +
      (novo ? "" : D.carimbo(ev.status, true)) +
      '<button type="button" class="fechar" data-fechar-ficha aria-label="Fechar ficha">' + Icone.fechar + "</button>" +
      "</header>" +

      '<div class="gaveta__corpo">' +
      (ev.conflito
        ? '<div class="postit postit--rosa" role="alert"><strong>Conflito de horário</strong>' +
          "A Impressora 3D Creality 1 já está reservada em 30/10, das 08:00 às 12:00, para o projeto Horta automatizada. Mude o horário ou escolha outro equipamento.</div>"
        : "") +

      '<div class="grade-campos">' +
      '<label class="campo inteiro"><span>Nome do evento</span><input value="' + (ev.nome || "") + '" placeholder="Ex.: Oficina de corte a laser"></label>' +
      '<label class="campo"><span>Tipo</span><select>' + opcoes(["Aula", "Workshop", "Reunião", "Reserva", "Manutenção", "Evento"], ev.tipo) + "</select></label>" +
      '<label class="campo"><span>Status</span><select>' + opcoes(["Agendado", "Em andamento", "Realizado", "Cancelado"], ev.status || "Agendado") + "</select></label>" +
      '<label class="campo"><span>Data</span><input type="date" value="' + (ev.data || "") + '"></label>' +
      '<div class="grade-campos grade-campos--hora">' +
      '<label class="campo"><span>Início</span><input type="time" value="' + (ev.ini || "") + '"></label>' +
      '<label class="campo"><span>Fim</span><input type="time" value="' + (ev.fim || "") + '"></label>' +
      "</div>" +
      '<label class="campo inteiro"><span>Espaço</span><select><option value="">Escolha um espaço</option>' +
      opcoes(D.espacos.map(function (e) { return e.nome; }), ev.espaco) + "</select></label>" +
      "</div>" +

      '<fieldset class="secao conjunto"><legend><h3>Equipamentos reservados</h3></legend>' +
      '<div class="colunas-marcar">' + equipamentos(ev.equipamentos || []) + "</div></fieldset>" +

      '<div class="secao"><h3>Materiais necessários</h3>' +
      '<div class="materiais">' +
      (ev.materiais || [])
        .map(function (m) {
          return '<div class="material"><span>' + m.item + '</span><span class="material__qtd">' + m.qtd + "</span>" +
            '<span class="pequeno suave">saldo ' + m.saldo + "</span></div>";
        })
        .join("") +
      '<div class="material material--novo"><select class="entrada"><option>Adicionar material do estoque</option>' +
      D.itens.map(function (i) { return "<option>" + i.nome + "</option>"; }).join("") +
      '</select><input class="entrada" type="number" min="1" placeholder="Qtd."></div>' +
      "</div></div>" +

      '<div class="secao"><h3>Participantes e responsável</h3>' +
      '<div class="chips">' + participantes(ev.participantes || []) +
      '<input class="entrada entrada--chip so-equipe" placeholder="Adicionar participante"></div>' +
      '<label class="campo campo--espaco"><span>Responsável</span><select>' +
      opcoes(D.usuarios.filter(function (u) { return u.status === "Ativo"; }).map(function (u) { return u.nome; }), ev.responsavel) +
      "</select></label></div>" +

      '<div class="grade-campos">' +
      '<label class="campo inteiro"><span>Demanda vinculada</span><select><option value="">Nenhuma</option>' +
      opcoes(D.demandas.map(function (d) { return d.cod + ": " + d.titulo; }), ev.demanda) + "</select></label>" +
      '<label class="campo inteiro"><span>Descrição</span><textarea placeholder="O que vai acontecer, o que levar…">' + (ev.descricao || "") + "</textarea></label>" +
      "</div>" +

      (novo ? "" : '<p class="pequeno suave">Criado por Beatriz Nunes em 20/10/2026 às 14:12. Última alteração por Ana Ribeiro hoje às 08:31.</p>') +
      "</div>" +

      '<footer class="gaveta__rodape">' +
      (novo ? "" : '<button type="button" class="btn btn--perigo so-equipe" data-toast="Evento cancelado. Ele continua no histórico da agenda.">Cancelar evento</button>') +
      '<button type="button" class="btn btn--leve" data-fechar-ficha>Fechar</button>' +
      '<button type="submit" class="btn btn--tinta so-equipe">' + (novo ? "Criar evento" : "Salvar evento") + "</button>" +
      "</footer></form>"
    );
  }

  window.Fichas.evento = function () {
    return fichaEvento({
      nome: "Workshop de modelagem 3D (turma 2)",
      tipo: "Workshop",
      status: "Agendado",
      data: "2026-10-30",
      ini: "09:00",
      fim: "11:30",
      espaco: "Sala de Prototipagem",
      equipamentos: ["Impressora 3D Creality 1", "Cortadora a laser 1"],
      materiais: [
        { item: "Filamento PLA branco 1 kg", qtd: "1 rolo", saldo: 3 },
        { item: "Chapa de MDF 3 mm (60 × 40 cm)", qtd: "4 chapas", saldo: 18 },
      ],
      participantes: ["bn", "jp", "rl"],
      responsavel: "Beatriz Nunes",
      demanda: "D-020: Cortar peças do braço robótico",
      descricao: "Segunda turma do workshop. Cada dupla modela e imprime uma peça do braço robótico.",
      conflito: true,
    });
  };

  window.Fichas["evento-novo"] = function () {
    return fichaEvento({});
  };
})();
