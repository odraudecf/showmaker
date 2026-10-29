// Perfil: carteirinha do usuário logado e o que cada perfil pode fazer (RF02).
(function () {
  var D = window.Dados;

  var permissoes = [
    { modulo: "Painel", aluno: "Ver", professor: "Ver", gestor: "Ver" },
    { modulo: "Agenda", aluno: "Ver", professor: "Ver e editar", gestor: "Tudo" },
    { modulo: "Estoque", aluno: "Ver", professor: "Ver e movimentar", gestor: "Tudo" },
    { modulo: "Demandas", aluno: "Criar e comentar", professor: "Ver e editar", gestor: "Tudo" },
    { modulo: "Cadastros", aluno: "Sem acesso", professor: "Sem acesso", gestor: "Tudo" },
  ];

  function linhas() {
    return permissoes
      .map(function (p) {
        return (
          "<tr><td><b>" + p.modulo + "</b></td>" +
          ["aluno", "professor", "gestor"]
            .map(function (k) {
              var sem = p[k] === "Sem acesso";
              return '<td data-col="' + k + '"' + (sem ? ' class="suave"' : "") + ">" + (sem ? "" : '<span class="mao visto">✓</span> ') + p[k] + "</td>";
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
  }

  window.Screens.perfil = {
    titulo: "Meu perfil",
    cor: "var(--cor-perfil)",
    html: function () {
      var u = D.usuarios[0];
      return (
        '<div class="cabecalho"><div><h2>Meu perfil</h2><p>Seus dados e o que cada perfil pode fazer no ShowMaker.</p></div>' +
        '<div class="acoes"><a class="btn" href="index.html">' + Icone.sair + "Sair</a></div></div>" +

        '<div class="perfil">' +
        '<section class="carteirinha" aria-label="Carteirinha do LabMaker">' +
        '<div class="carteirinha__faixa"><img src="assets/logo.svg" alt="" width="28" height="28"><span>LabMaker Ifes Alegre</span></div>' +
        '<div class="carteirinha__corpo">' +
        '<div class="carteirinha__foto">' + D.iniciais(u.nome) + "</div>" +
        "<dl>" +
        "<div><dt>Nome</dt><dd>" + u.nome + "</dd></div>" +
        "<div><dt>E-mail</dt><dd>" + u.email + "</dd></div>" +
        '<div><dt>Perfil</dt><dd data-perfil-nome>Gestora</dd></div>' +
        "<div><dt>Membro desde</dt><dd>" + u.desde + "</dd></div>" +
        "</dl></div>" +
        '<p class="carteirinha__assinatura mao">Ana Ribeiro</p>' +
        "</section>" +

        '<section class="perfil__permissoes"><h3>O que cada perfil pode fazer</h3>' +
        '<p class="suave">A coluna destacada é o perfil em uso. Troque em "Ver como", no topo, para ver o sistema de outro jeito.</p>' +
        '<div class="tabela-envoltorio"><table class="tabela tabela--permissoes">' +
        '<thead><tr><th>Módulo</th><th data-col="aluno">Aluno</th><th data-col="professor">Professor</th><th data-col="gestor">Gestor</th></tr></thead>' +
        "<tbody>" + linhas() + "</tbody></table></div>" +

        '<form class="senha" data-toast="Senha alterada. No protótipo, nada é gravado de verdade.">' +
        "<h3>Trocar senha</h3>" +
        '<div class="grade-campos">' +
        '<label class="campo"><span>Senha atual</span><input type="password" autocomplete="current-password"></label>' +
        '<label class="campo"><span>Nova senha</span><input type="password" autocomplete="new-password"></label>' +
        "</div>" +
        '<button class="btn" type="submit">Trocar senha</button></form>' +
        "</section></div>"
      );
    },
  };
})();
