// Cadastros (RF05–RF08): usuários, espaços e equipamentos (tipo × unidade).
(function () {
  var D = window.Dados;

  function linhasUsuarios() {
    return D.usuarios
      .map(function (u) {
        var inativo = u.status === "Inativo";
        return (
          "<tr" + (inativo ? ' class="inativo"' : "") + ">" +
          '<td><span class="pessoa">' + D.avatar(u.id, "avatar--p") + "<b>" + u.nome + "</b></span></td>" +
          "<td>" + u.email + "</td>" +
          "<td>" + u.perfil + "</td>" +
          "<td>" + u.desde + "</td>" +
          "<td>" + D.carimbo(u.status) + "</td>" +
          '<td class="acoes-linha">' +
          '<button class="btn btn--leve btn--p" data-ficha="usuario">Editar</button>' +
          (inativo
            ? '<button class="btn btn--leve btn--p" data-toast="' + u.nome + ' foi reativado.">Reativar</button>'
            : '<button class="btn btn--leve btn--p" data-toast="' + u.nome + ' foi inativado. O histórico dele continua guardado.">Inativar</button>') +
          "</td></tr>"
        );
      })
      .join("");
  }

  function espacos() {
    return D.espacos
      .map(function (e) {
        return (
          '<li class="ficha ficha--pautada espaco">' +
          '<div class="ficha__topo"><h3>' + e.nome + "</h3>" + D.carimbo(e.status) + "</div>" +
          '<ul class="lista-pauta">' +
          "<li><span class=\"rotulo\">Capacidade</span>" + e.capacidade + " pessoas</li>" +
          "<li><span class=\"rotulo\">Recursos</span><span>" + e.recursos + "</span></li>" +
          "</ul>" +
          '<button class="btn btn--leve btn--p" data-ficha="espaco">Editar espaço</button>' +
          "</li>"
        );
      })
      .join("");
  }

  function equipamentos() {
    return D.tiposEquipamento
      .map(function (t) {
        return (
          '<li class="tipo-equip">' +
          '<div class="tipo-equip__cabeca">' +
          "<div><h3>" + t.nome + '</h3><p class="suave">' + t.marca + " " + t.modelo + ", " + t.categoria.toLowerCase() + "</p></div>" +
          '<button class="btn btn--leve btn--p" data-ficha="tipo-equipamento">Editar tipo</button>' +
          "</div>" +
          '<ul class="unidades">' +
          t.unidades
            .map(function (u) {
              return '<li class="unidade"><span>' + u.nome + "</span>" + D.carimbo(u.status) +
                '<button class="btn btn--leve btn--p" data-ficha="unidade">Editar</button></li>';
            })
            .join("") +
          '<li><button class="unidade unidade--nova" data-ficha="unidade">' + Icone.mais + "Nova unidade</button></li>" +
          "</ul></li>"
        );
      })
      .join("");
  }

  window.Screens.cadastros = {
    titulo: "Cadastros",
    cor: "var(--cor-cadastros)",
    somenteGestor: true,
    html: function () {
      return (
        '<div class="cabecalho"><div><h2>Cadastros</h2><p>Quem usa o laboratório, os espaços e cada equipamento.</p></div></div>' +
        '<div data-divisorias>' +
        '<div class="divisorias" role="tablist">' +
        '<button role="tab" aria-selected="true" data-divisoria="usuarios">Usuários</button>' +
        '<button role="tab" aria-selected="false" data-divisoria="espacos">Espaços</button>' +
        '<button role="tab" aria-selected="false" data-divisoria="equipamentos">Equipamentos</button>' +
        "</div>" +

        '<div data-painel-divisoria="usuarios">' +
        '<div class="filtros">' +
        '<label class="busca">' + Icone.busca + '<span class="sr-only">Buscar usuário</span><input class="entrada" placeholder="Buscar por nome ou e-mail"></label>' +
        '<label class="campo campo--inline"><span class="sr-only">Perfil</span><select><option>Todos os perfis</option><option>Gestor</option><option>Professor</option><option>Aluno</option></select></label>' +
        '<label class="marcar"><input type="checkbox"> Mostrar inativos</label>' +
        '<button class="btn btn--tinta empurra" data-ficha="usuario-novo">' + Icone.mais + "Novo usuário</button>" +
        "</div>" +
        '<div class="tabela-envoltorio"><table class="tabela">' +
        '<thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Desde</th><th>Status</th><th><span class="sr-only">Ações</span></th></tr></thead>' +
        "<tbody>" + linhasUsuarios() + "</tbody></table></div></div>" +

        '<div data-painel-divisoria="espacos" hidden>' +
        '<div class="filtros"><button class="btn btn--tinta empurra" data-ficha="espaco-novo">' + Icone.mais + "Novo espaço</button></div>" +
        '<ul class="espacos">' + espacos() + "</ul></div>" +

        '<div data-painel-divisoria="equipamentos" hidden>' +
        '<div class="filtros"><p class="suave">Cada <b>tipo</b> (marca e modelo) pode ter várias <b>unidades</b>, e cada unidade tem o próprio status.</p>' +
        '<button class="btn btn--tinta empurra" data-ficha="tipo-equipamento-novo">' + Icone.mais + "Novo tipo de equipamento</button></div>" +
        '<ul class="tipos-equip">' + equipamentos() + "</ul></div>" +
        "</div>"
      );
    },
  };

  // ---------- Fichas de cadastro ----------

  function ficha(o) {
    return (
      '<form class="gaveta__form" data-toast="' + o.toast + ' No protótipo, nada é gravado de verdade.">' +
      '<header class="gaveta__topo"><div><span class="rotulo">Cadastros</span><h2 id="ficha-titulo">' + o.titulo + "</h2></div>" +
      '<button type="button" class="fechar" data-fechar-ficha aria-label="Fechar ficha">' + Icone.fechar + "</button></header>" +
      '<div class="gaveta__corpo"><div class="grade-campos">' + o.campos + "</div></div>" +
      '<footer class="gaveta__rodape"><button type="button" class="btn btn--leve" data-fechar-ficha>Fechar</button>' +
      '<button type="submit" class="btn btn--tinta">' + o.botao + "</button></footer></form>"
    );
  }

  function campo(rotulo, valor, extra) {
    return '<label class="campo ' + (extra || "") + '"><span>' + rotulo + '</span><input value="' + (valor || "") + '"></label>';
  }

  function selecao(rotulo, opcoes, extra) {
    return '<label class="campo ' + (extra || "") + '"><span>' + rotulo + "</span><select>" +
      opcoes.map(function (o) { return "<option>" + o + "</option>"; }).join("") + "</select></label>";
  }

  function fichaUsuario(u) {
    return ficha({
      titulo: u ? "Editar usuário" : "Novo usuário",
      toast: u ? "Usuário salvo." : "Usuário cadastrado. Ele recebe um e-mail para criar a senha.",
      botao: u ? "Salvar usuário" : "Cadastrar usuário",
      campos:
        campo("Nome completo", u && u.nome, "inteiro") +
        campo("E-mail", u && u.email, "inteiro") +
        selecao("Perfil", ["Aluno", "Professor", "Gestor"]) +
        selecao("Status", ["Ativo", "Inativo"]) +
        '<fieldset class="conjunto inteiro"><legend class="rotulo">Acesso aos módulos</legend><div class="colunas-marcar">' +
        '<label class="marcar"><input type="checkbox" checked> Agenda</label>' +
        '<label class="marcar"><input type="checkbox" checked> Estoque</label>' +
        '<label class="marcar"><input type="checkbox" checked> Demandas</label>' +
        '<label class="marcar"><input type="checkbox"> Cadastros</label>' +
        "</div></fieldset>",
    });
  }

  window.Fichas.usuario = function () { return fichaUsuario(D.usuarios[3]); };
  window.Fichas["usuario-novo"] = function () { return fichaUsuario(null); };

  function fichaEspaco(e) {
    return ficha({
      titulo: e ? "Editar espaço" : "Novo espaço",
      toast: e ? "Espaço salvo." : "Espaço cadastrado.",
      botao: e ? "Salvar espaço" : "Cadastrar espaço",
      campos:
        campo("Nome do espaço", e && e.nome, "inteiro") +
        campo("Capacidade (pessoas)", e && e.capacidade) +
        selecao("Status", ["Disponível", "Em manutenção", "Desativado"]) +
        '<label class="campo inteiro"><span>Recursos do espaço</span><textarea>' + (e ? e.recursos : "") + "</textarea></label>",
    });
  }

  window.Fichas.espaco = function () { return fichaEspaco(D.espacos[0]); };
  window.Fichas["espaco-novo"] = function () { return fichaEspaco(null); };

  function fichaTipo(t) {
    return ficha({
      titulo: t ? "Editar tipo de equipamento" : "Novo tipo de equipamento",
      toast: t ? "Tipo de equipamento salvo." : "Tipo de equipamento cadastrado.",
      botao: t ? "Salvar tipo" : "Cadastrar tipo",
      campos:
        campo("Nome do tipo", t && t.nome, "inteiro") +
        campo("Marca", t && t.marca) +
        campo("Modelo", t && t.modelo) +
        selecao("Categoria", ["Fabricação digital", "Eletrônica", "Ferramentas manuais", "Marcenaria"], "inteiro"),
    });
  }

  window.Fichas["tipo-equipamento"] = function () { return fichaTipo(D.tiposEquipamento[0]); };
  window.Fichas["tipo-equipamento-novo"] = function () { return fichaTipo(null); };

  window.Fichas.unidade = function () {
    return ficha({
      titulo: "Unidade de equipamento",
      toast: "Unidade salva.",
      botao: "Salvar unidade",
      campos:
        selecao("Tipo", D.tiposEquipamento.map(function (t) { return t.nome + " (" + t.marca + " " + t.modelo + ")"; }), "inteiro") +
        campo("Identificação", "Impressora 3D Creality 2", "inteiro") +
        selecao("Status", ["Em manutenção", "Disponível", "Emprestado", "Desativado"]) +
        selecao("Espaço", D.espacos.map(function (e) { return e.nome; })) +
        '<label class="campo inteiro"><span>Observação</span><textarea>Bico entupido. Aguardando peça (demanda D-018).</textarea></label>',
    });
  };
})();
