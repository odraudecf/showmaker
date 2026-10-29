// Ícones em traço, desenhados como se fossem à caneta.
(function () {
  function svg(conteudo, extra) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (extra ? " " + extra : "") +
      ">" +
      conteudo +
      "</svg>"
    );
  }

  window.Icone = {
    fechar: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    mais: svg('<path d="M12 5v14M5 12h14"/>'),
    busca: svg('<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>'),
    voltar: svg('<path d="M15 5l-7 7 7 7"/>'),
    avancar: svg('<path d="M9 5l7 7-7 7"/>'),
    relogio: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    local: svg('<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
    balao: svg('<path d="M5 5h14v10H10l-4 4v-4H5z"/>'),
    lista: svg('<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".8"/><circle cx="4.5" cy="12" r=".8"/><circle cx="4.5" cy="18" r=".8"/>'),
    quadro: svg('<rect x="3.5" y="4" width="5" height="16" rx="1"/><rect x="9.5" y="4" width="5" height="11" rx="1"/><rect x="15.5" y="4" width="5" height="13" rx="1"/>'),
    entrada: svg('<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>'),
    saida: svg('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 20h16"/>'),
    ajuste: svg('<path d="M4 8h10M18 8h2M4 16h2M10 16h10"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/>'),
    sair: svg('<path d="M14 5h5v14h-5"/><path d="M10 8l-4 4 4 4M6 12h10"/>'),
    alerta: svg('<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.5"/>'),
    calendario: svg('<rect x="4" y="5" width="16" height="15" rx="1.5"/><path d="M4 10h16M9 3v4M15 3v4"/>'),
    clipe:
      '<svg class="clipe" viewBox="0 0 16 36" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M11 9v18a3.5 3.5 0 01-7 0V6a2.5 2.5 0 015 0v19a1 1 0 01-2 0V10"/></svg>',
    anexo: svg('<path d="M15 7l-6.5 6.5a2 2 0 002.8 2.8L18 9.6a4 4 0 00-5.7-5.7L5.6 10.6a6 6 0 008.5 8.5L19 14"/>'),
  };
})();
