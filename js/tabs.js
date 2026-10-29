// Abas de pasta (RF03): abrir, trocar e fechar módulos, como num navegador.
(function () {
  var orelhas = document.getElementById("orelhas");
  var pasta = document.getElementById("pasta");
  var abertas = [];
  var ativa = null;

  function perfilAtual() {
    return document.body.dataset.perfil;
  }

  function permitido(id) {
    var tela = Screens[id];
    return !(tela.somenteGestor && perfilAtual() !== "gestor");
  }

  function criarPainel(id) {
    var tela = Screens[id];
    var painel = document.createElement("section");
    painel.className = "folha";
    painel.id = "painel-" + id;
    painel.setAttribute("role", "tabpanel");
    painel.setAttribute("aria-labelledby", "orelha-" + id);
    painel.hidden = true;
    painel.innerHTML = tela.html();
    UI.prepararAcessiveis(painel);
    pasta.appendChild(painel);
  }

  function desenharOrelhas() {
    orelhas.innerHTML = abertas
      .map(function (id) {
        var tela = Screens[id];
        var sel = id === ativa;
        return (
          '<div class="orelha' + (sel ? " ativa" : "") + '" style="--cor: ' + tela.cor + '">' +
          '<button class="orelha__rotulo" role="tab" id="orelha-' + id + '" aria-controls="painel-' + id + '"' +
          ' aria-selected="' + sel + '" tabindex="' + (sel ? 0 : -1) + '" data-orelha="' + id + '">' + tela.titulo + "</button>" +
          (tela.fixa ? "" : '<button class="orelha__fechar" data-fechar-orelha="' + id + '" aria-label="Fechar ' + tela.titulo + '">' + Icone.fechar + "</button>") +
          "</div>"
        );
      })
      .join("");
  }

  function ativar(id, focar) {
    ativa = id;
    desenharOrelhas();
    abertas.forEach(function (aberta) {
      var p = document.getElementById("painel-" + aberta);
      p.hidden = aberta !== id;
      if (aberta === id) {
        p.classList.remove("entrando");
        void p.offsetWidth; // reinicia a animação de "puxar a folha"
        p.classList.add("entrando");
      }
    });
    pasta.style.setProperty("--cor", Screens[id].cor);
    if (focar) document.getElementById("orelha-" + id).focus();
  }

  function abrir(id) {
    if (!Screens[id]) return;
    if (!permitido(id)) {
      UI.bilhete(Screens[id].titulo + " é só para gestores. Troque o perfil em Ver como para abrir.");
      return;
    }
    if (abertas.indexOf(id) === -1) {
      abertas.push(id);
      criarPainel(id);
    }
    ativar(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function fechar(id) {
    var i = abertas.indexOf(id);
    if (i === -1 || Screens[id].fixa) return;
    abertas.splice(i, 1);
    document.getElementById("painel-" + id).remove();
    if (ativa === id) ativar(abertas[Math.max(0, i - 1)], true);
    else desenharOrelhas();
  }

  // Ao trocar de perfil, fecha o que o novo perfil não pode ver
  function revisarPermissoes() {
    abertas.slice().forEach(function (id) {
      if (!permitido(id)) {
        fechar(id);
        UI.bilhete("A pasta " + Screens[id].titulo + " foi fechada: ela é só para gestores.");
      }
    });
  }

  orelhas.addEventListener("click", function (e) {
    var fecharBtn = e.target.closest("[data-fechar-orelha]");
    if (fecharBtn) return fechar(fecharBtn.dataset.fecharOrelha);
    var orelha = e.target.closest("[data-orelha]");
    if (orelha) ativar(orelha.dataset.orelha);
  });

  // Setas trocam de aba; Delete fecha a aba atual
  orelhas.addEventListener("keydown", function (e) {
    var i = abertas.indexOf(ativa);
    if (e.key === "ArrowRight") ativar(abertas[(i + 1) % abertas.length], true);
    else if (e.key === "ArrowLeft") ativar(abertas[(i - 1 + abertas.length) % abertas.length], true);
    else if (e.key === "Delete") fechar(ativa);
    else return;
    e.preventDefault();
  });

  // Botão "Abrir pasta" e seu menu
  var nova = document.getElementById("abrir-pasta");
  var menu = document.getElementById("menu-pastas");

  function alternarMenu(abrirMenu) {
    menu.hidden = !abrirMenu;
    nova.setAttribute("aria-expanded", String(abrirMenu));
    if (abrirMenu) menu.querySelector("button").focus();
  }

  nova.addEventListener("click", function () {
    alternarMenu(menu.hidden);
  });

  document.addEventListener("click", function (e) {
    if (!menu.hidden && !e.target.closest(".orelha-nova")) alternarMenu(false);
    if (e.target.closest("#menu-pastas [data-abrir]")) alternarMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) {
      alternarMenu(false);
      nova.focus();
    }
  });

  window.Tabs = { abrir: abrir, fechar: fechar, revisarPermissoes: revisarPermissoes };

  abrir("painel");
})();
