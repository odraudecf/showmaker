// Interações visuais do protótipo: fichas (gavetas), divisórias, visões,
// bilhetes e o seletor "Ver como". Nada aqui salva dados.
(function () {
  var veu = null;
  var origem = null;

  // ---------- Bilhete (toast) ----------

  var timerBilhete;

  function bilhete(texto) {
    var b = document.querySelector(".bilhete");
    if (!b) {
      b = document.createElement("div");
      b.className = "bilhete";
      b.setAttribute("role", "status");
      document.body.appendChild(b);
    }
    b.textContent = texto;
    b.hidden = false;
    b.style.animation = "none";
    void b.offsetWidth;
    b.style.animation = "";
    clearTimeout(timerBilhete);
    timerBilhete = setTimeout(function () { b.hidden = true; }, 3200);
  }

  // Linhas e itens de lista que abrem fichas também precisam funcionar no teclado
  function prepararAcessiveis(raiz) {
    raiz.querySelectorAll("[data-ficha]:not(button):not(a)").forEach(function (el) {
      el.tabIndex = 0;
      el.setAttribute("role", "button");
    });
  }

  // ---------- Fichas ----------

  function abrirFicha(id, gatilho) {
    if (!Fichas[id]) return;
    if (!veu) {
      origem = gatilho || document.activeElement;
      veu = document.createElement("div");
      veu.className = "veu";
      veu.innerHTML = '<div class="gaveta" role="dialog" aria-modal="true" aria-labelledby="ficha-titulo"></div>';
      document.body.appendChild(veu);
      document.body.style.overflow = "hidden";
    }
    var gaveta = veu.querySelector(".gaveta");
    gaveta.innerHTML = Fichas[id]();
    gaveta.style.animation = "none";
    void gaveta.offsetWidth;
    gaveta.style.animation = "";
    prepararAcessiveis(gaveta);
    gaveta.querySelector(".gaveta__corpo").scrollTop = 0;
    var primeiro = gaveta.querySelector(".fechar");
    if (primeiro) primeiro.focus();
  }

  function fecharFicha() {
    if (!veu) return;
    veu.remove();
    veu = null;
    document.body.style.overflow = "";
    if (origem && document.contains(origem)) origem.focus();
  }

  // Mantém o Tab dentro da ficha aberta
  function prenderFoco(e) {
    if (!veu || e.key !== "Tab") return;
    var focaveis = veu.querySelectorAll('button:not([disabled]), [href], input:not([disabled]):not(.sr-only), select, textarea, [tabindex="0"]');
    var visiveis = Array.prototype.filter.call(focaveis, function (el) { return el.offsetParent !== null; });
    if (!visiveis.length) return;
    var primeiro = visiveis[0];
    var ultimo = visiveis[visiveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
      ultimo.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      primeiro.focus();
      e.preventDefault();
    }
  }

  // ---------- Ver como (RF02) ----------

  var nomesPerfil = { aluno: "Aluna", professor: "Professora", gestor: "Gestora" };

  function definirPerfil(perfil) {
    document.body.dataset.perfil = perfil;
    document.querySelectorAll("[data-ver-como]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.verComo === perfil));
    });
    document.querySelectorAll("[data-perfil-nome]").forEach(function (el) {
      el.textContent = nomesPerfil[perfil];
    });
    if (window.Tabs) Tabs.revisarPermissoes();
  }

  // ---------- Delegação de cliques ----------

  document.addEventListener("click", function (e) {
    var alvo;

    if (veu && e.target === veu) return fecharFicha();

    if ((alvo = e.target.closest("[data-fechar-ficha]"))) return fecharFicha();

    if ((alvo = e.target.closest("[data-abrir]"))) {
      fecharFicha();
      return Tabs.abrir(alvo.dataset.abrir);
    }

    if ((alvo = e.target.closest("[data-ficha]"))) {
      e.preventDefault();
      return abrirFicha(alvo.dataset.ficha, alvo);
    }

    if ((alvo = e.target.closest("[data-ver-como]"))) return definirPerfil(alvo.dataset.verComo);

    if ((alvo = e.target.closest("[data-divisoria]"))) {
      var grupo = alvo.closest("[data-divisorias]");
      grupo.querySelectorAll("[data-divisoria]").forEach(function (b) {
        b.setAttribute("aria-selected", String(b === alvo));
      });
      grupo.querySelectorAll("[data-painel-divisoria]").forEach(function (p) {
        p.hidden = p.dataset.painelDivisoria !== alvo.dataset.divisoria;
      });
      return;
    }

    if ((alvo = e.target.closest("[data-visao]"))) {
      var folha = alvo.closest(".folha");
      folha.querySelectorAll("[data-visao]").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === alvo));
      });
      folha.querySelectorAll("[data-visao-alvo]").forEach(function (el) {
        el.hidden = el.dataset.visaoAlvo !== alvo.dataset.visao;
      });
      return;
    }

    if ((alvo = e.target.closest("[data-remover-chip]"))) {
      alvo.closest(".chip").remove();
      return;
    }

    if ((alvo = e.target.closest("button[data-toast]"))) {
      bilhete(alvo.dataset.toast);
      if (alvo.closest(".gaveta") && !alvo.closest("form.comentar")) fecharFicha();
    }
  });

  // Enviar qualquer formulário só mostra o bilhete
  document.addEventListener("submit", function (e) {
    var form = e.target;
    e.preventDefault();
    if (form.dataset.toast) bilhete(form.dataset.toast);
    if (form.classList.contains("gaveta__form")) fecharFicha();
    else form.reset();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && veu) return fecharFicha();
    prenderFoco(e);
    var el = e.target;
    if ((e.key === "Enter" || e.key === " ") && el.getAttribute && el.getAttribute("role") === "button" && el.dataset.ficha) {
      e.preventDefault();
      abrirFicha(el.dataset.ficha, el);
    }
  });

  window.UI = {
    bilhete: bilhete,
    abrirFicha: abrirFicha,
    fecharFicha: fecharFicha,
    prepararAcessiveis: prepararAcessiveis,
    definirPerfil: definirPerfil,
  };
})();
