// Demandas (RF29–RF39, RF41, RF42): central de solicitações do LabMaker.
(function () {
  var D = window.Dados;
  var colunas = ["Aberta", "Em análise", "Em andamento", "Concluída"];
  var titulosColuna = { "Aberta": "Abertas", "Em análise": "Em análise", "Em andamento": "Em andamento", "Concluída": "Concluídas" };

  function cartao(d) {
    return (
      '<li><button class="cartao" data-ficha="demanda">' +
      '<span class="cartao__topo"><span class="pequeno suave">' + d.cod + "</span>" + D.fita(d.prioridade) + "</span>" +
      '<span class="cartao__titulo">' + d.titulo + "</span>" +
      '<span class="cartao__projeto pequeno suave">' + d.projeto + "</span>" +
      '<span class="cartao__rodape">' + D.avatar(d.resp, "avatar--p") +
      '<span class="cartao__prazo' + (d.atrasada ? " cartao__prazo--atrasado" : "") + '">' + Icone.relogio + d.prazo + "</span>" +
      (d.comentarios ? '<span class="cartao__conta" title="Comentários">' + Icone.balao + d.comentarios + "</span>" : "") +
      (d.anexos ? '<span class="cartao__conta" title="Anexos">' + Icone.anexo + d.anexos + "</span>" : "") +
      "</span>" +
      (d.atrasada ? D.carimbo("Atrasada") : "") +
      "</button></li>"
    );
  }

  function quadro() {
    return colunas
      .map(function (c) {
        var lista = D.demandas.filter(function (d) { return d.status === c; });
        return (
          '<section class="bandeja">' +
          '<h3 class="bandeja__titulo">' + titulosColuna[c] + ' <span class="bandeja__n">' + lista.length + "</span></h3>" +
          '<ul class="bandeja__pilha">' + lista.map(cartao).join("") + "</ul></section>"
        );
      })
      .join("");
  }

  function linhasLista() {
    return D.demandas
      .map(function (d) {
        return (
          '<tr data-ficha="demanda"' + (d.status === "Cancelada" ? ' class="inativo"' : "") + ">" +
          '<td class="suave">' + d.cod + "</td>" +
          "<td><b>" + d.titulo + "</b></td>" +
          "<td>" + d.categoria + "</td>" +
          "<td>" + D.fita(d.prioridade) + "</td>" +
          '<td><span class="pessoa">' + D.avatar(d.resp, "avatar--p") + D.usuario(d.resp).nome + "</span></td>" +
          "<td>" + d.prazo + "</td>" +
          "<td>" + D.carimbo(d.atrasada ? "Atrasada" : d.status) + "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  function opcoesPessoas() {
    return D.usuarios
      .filter(function (u) { return u.status === "Ativo"; })
      .map(function (u) { return "<option>" + u.nome + "</option>"; })
      .join("");
  }

  window.Screens.demandas = {
    titulo: "Demandas",
    cor: "var(--cor-demandas)",
    html: function () {
      return (
        '<div class="cabecalho">' +
        "<div><h2>Demandas</h2><p>Pedidos de material, manutenção, fabricação e tudo o que o laboratório precisa resolver.</p></div>" +
        '<div class="acoes"><button class="btn btn--tinta" data-ficha="demanda-nova">' + Icone.mais + "Nova demanda</button></div>" +
        "</div>" +

        '<div class="indicadores">' +
        '<div class="ficha contador"><span class="contador__n">5</span><span>em aberto</span></div>' +
        '<div class="ficha contador contador--alerta"><span class="contador__n">1</span><span>atrasada</span></div>' +
        '<div class="ficha contador"><span class="contador__n">2</span><span>concluídas em outubro</span></div>' +
        "</div>" +

        '<div class="filtros filtros--demandas">' +
        '<label class="campo"><span>Status</span><select><option>Todos</option><option>Aberta</option><option>Em análise</option><option>Em andamento</option><option>Concluída</option><option>Cancelada</option></select></label>' +
        '<label class="campo"><span>Prioridade</span><select><option>Todas</option><option>Urgente</option><option>Alta</option><option>Média</option><option>Baixa</option></select></label>' +
        '<label class="campo"><span>Responsável</span><select><option>Qualquer pessoa</option>' + opcoesPessoas() + "</select></label>" +
        '<label class="campo"><span>Categoria</span><select><option>Todas</option><option>Compra de material</option><option>Fabricação digital</option><option>Manutenção</option><option>Organização</option><option>Capacitação</option></select></label>' +
        '<label class="campo"><span>Período</span><select><option>Outubro de 2026</option><option>Últimos 7 dias</option><option>Este semestre</option></select></label>' +
        '<div class="visao" role="group" aria-label="Modo de visualização">' +
        '<button aria-pressed="true" data-visao="quadro">' + Icone.quadro + "Quadro</button>" +
        '<button aria-pressed="false" data-visao="lista">' + Icone.lista + "Lista</button>" +
        "</div></div>" +

        '<div class="quadro" data-visao-alvo="quadro">' + quadro() + "</div>" +
        '<p class="pequeno suave quadro-nota" data-visao-alvo="quadro">1 demanda cancelada não aparece no quadro. Veja todas na lista.</p>' +

        '<div class="tabela-envoltorio" data-visao-alvo="lista" hidden><table class="tabela">' +
        "<thead><tr><th>Código</th><th>Demanda</th><th>Categoria</th><th>Prioridade</th><th>Responsável</th><th>Prazo</th><th>Status</th></tr></thead>" +
        "<tbody>" + linhasLista() + "</tbody></table></div>"
      );
    },
  };

  // ---------- Ficha: detalhe da demanda ----------

  window.Fichas.demanda = function () {
    return (
      '<div class="gaveta__form">' +
      '<header class="gaveta__topo"><div><span class="rotulo">Demanda D-019</span>' +
      '<h2 id="ficha-titulo">Imprimir suportes dos sensores da horta</h2></div>' +
      D.carimbo("Em andamento", true) +
      '<button type="button" class="fechar" data-fechar-ficha aria-label="Fechar ficha">' + Icone.fechar + "</button></header>" +

      '<div class="gaveta__corpo">' +
      '<dl class="dados">' +
      "<div><dt>Projeto</dt><dd>Horta automatizada</dd></div>" +
      "<div><dt>Categoria</dt><dd>Fabricação digital</dd></div>" +
      "<div><dt>Prioridade</dt><dd>" + D.fita("alta") + "</dd></div>" +
      "<div><dt>Prazo</dt><dd>30/10/2026</dd></div>" +
      '<div><dt>Responsável</dt><dd class="pessoa">' + D.avatar("cm", "avatar--p") + "Carlos Menezes</dd></div>" +
      '<div><dt>Pedida por</dt><dd class="pessoa">' + D.avatar("jp", "avatar--p") + "Júlia Prates, 21/10</dd></div>" +
      "</dl>" +

      '<div class="secao"><h3>Descrição</h3><p>Precisamos de 8 suportes para fixar os sensores de umidade nos vasos da horta. ' +
      "O modelo está em anexo (versão 2, com encaixe de 22 mm). Imprimir em PLA branco, preenchimento de 20%.</p></div>" +

      '<div class="secao"><h3>Itens pedidos ao estoque</h3>' +
      '<ul class="lista-pauta pedidos">' +
      "<li><span>Filamento PLA branco 1 kg</span><b>1 rolo</b>" + D.carimbo("Repor") + '<span class="pequeno suave">saída registrada em 29/10</span></li>' +
      "<li><span>Sensor de umidade do solo</span><b>8 un</b><span class=\"pequeno suave\">saldo 9</span></li>" +
      "</ul></div>" +

      '<div class="secao"><h3>Evento vinculado</h3>' +
      '<button class="evento-ficha evento-ficha--largo" data-ficha="evento">' +
      '<span class="evento-ficha__hora">Sex., 30/10, 08:00–12:00</span>' +
      '<span class="evento-ficha__nome">Reserva: Creality 1 para a horta</span>' +
      '<span class="evento-ficha__meta">' + Icone.local + "Sala de Prototipagem</span>" + D.carimbo("Agendado") +
      "</button></div>" +

      '<div class="secao"><h3>Anexos</h3><ul class="anexos">' +
      '<li class="anexo">' + Icone.clipe + "<b>suporte_sensor_v2.stl</b><span class=\"pequeno suave\">2,1 MB, Júlia Prates</span></li>" +
      '<li class="anexo">' + Icone.clipe + "<b>medidas_dos_vasos.pdf</b><span class=\"pequeno suave\">340 KB, Carlos Menezes</span></li>" +
      '<li><label class="anexo anexo--novo">' + Icone.anexo + '<span>Anexar arquivo</span><input type="file" class="sr-only"></label></li>' +
      "</ul></div>" +

      '<div class="secao"><h3>Comentários</h3><ul class="comentarios">' +
      '<li>' + D.avatar("jp") + '<div><p class="comentario__autor"><b>Júlia Prates</b> <span class="suave pequeno">21/10, 09:20</span></p>' +
      "<p>Testei o encaixe da versão 1 e ficou folgado. Subi a versão 2 com 22 mm.</p></div></li>" +
      '<li>' + D.avatar("cm") + '<div><p class="comentario__autor"><b>Carlos Menezes</b> <span class="suave pequeno">23/10, 15:02</span></p>' +
      "<p>Reservei a Creality 1 para sexta de manhã. A Creality 2 está sem bico até a D-018 fechar.</p></div></li>" +
      '<li>' + D.avatar("jp") + '<div><p class="comentario__autor"><b>Júlia Prates</b> <span class="suave pequeno">hoje, 09:30</span></p>' +
      "<p>Posso ajudar na impressão, tenho aula livre na sexta.</p></div></li>" +
      "</ul>" +
      '<form class="comentar" data-toast="Comentário publicado. No protótipo, nada é gravado de verdade.">' +
      D.avatar("ar") + '<label class="campo"><span class="sr-only">Escreva um comentário</span><textarea placeholder="Escreva um comentário"></textarea></label>' +
      '<button class="btn btn--p" type="submit">Comentar</button></form>' +
      "</div>" +

      '<section class="caderneta"><h3>Histórico da demanda</h3><ol>' +
      '<li><span class="caderneta__quando">21/10 09:12</span><span class="caderneta__texto"><b>Júlia Prates</b> criou a demanda</span></li>' +
      '<li><span class="caderneta__quando">21/10 14:30</span><span class="caderneta__texto"><b>Ana Ribeiro</b> mudou de aberta para em análise</span></li>' +
      '<li><span class="caderneta__quando">22/10 10:05</span><span class="caderneta__texto"><b>Ana Ribeiro</b> atribuiu a Carlos Menezes</span></li>' +
      '<li><span class="caderneta__quando">23/10 15:00</span><span class="caderneta__texto"><b>Carlos Menezes</b> vinculou o evento de 30/10</span></li>' +
      '<li><span class="caderneta__quando">23/10 15:01</span><span class="caderneta__texto"><b>Carlos Menezes</b> mudou para em andamento</span></li>' +
      '<li><span class="caderneta__quando">29/10 10:42</span><span class="caderneta__texto"><b>Carlos Menezes</b> retirou 1 rolo de PLA do estoque</span></li>' +
      "</ol></section>" +
      "</div>" +

      '<footer class="gaveta__rodape">' +
      '<button type="button" class="btn btn--perigo so-equipe" data-toast="Demanda cancelada. Ela continua no histórico.">Cancelar demanda</button>' +
      '<button type="button" class="btn btn--tinta so-equipe" data-toast="Demanda D-019 concluída.">Marcar como concluída</button>' +
      "</footer></div>"
    );
  };

  window.Fichas["demanda-nova"] = function () {
    return (
      '<form class="gaveta__form" data-toast="Demanda criada como D-022. No protótipo, nada é gravado de verdade.">' +
      '<header class="gaveta__topo"><div><span class="rotulo">Demandas</span><h2 id="ficha-titulo">Nova demanda</h2></div>' +
      '<button type="button" class="fechar" data-fechar-ficha aria-label="Fechar ficha">' + Icone.fechar + "</button></header>" +
      '<div class="gaveta__corpo"><div class="grade-campos">' +
      '<label class="campo inteiro"><span>Título</span><input placeholder="Ex.: Comprar parafusos M3"></label>' +
      '<label class="campo"><span>Projeto</span><select><option>Horta automatizada</option><option>Braço robótico didático</option><option>Estação meteorológica</option><option>Manutenção do lab</option></select></label>' +
      '<label class="campo"><span>Categoria</span><select><option>Compra de material</option><option>Fabricação digital</option><option>Manutenção</option><option>Organização</option><option>Capacitação</option></select></label>' +
      '<fieldset class="conjunto inteiro"><legend class="rotulo">Prioridade</legend><div class="prioridades">' +
      ["baixa", "media", "alta", "urgente"]
        .map(function (p, n) {
          return '<label><input type="radio" name="prioridade"' + (n === 1 ? " checked" : "") + ">" + D.fita(p) + "</label>";
        })
        .join("") +
      "</div></fieldset>" +
      '<label class="campo"><span>Responsável</span><select><option>Ainda sem responsável</option>' + opcoesPessoas() + "</select></label>" +
      '<label class="campo"><span>Prazo</span><input type="date"></label>' +
      '<label class="campo inteiro"><span>Descrição</span><textarea placeholder="O que precisa ser feito e por quê"></textarea></label>' +
      '<label class="campo"><span>Pedir item do estoque</span><select><option>Nenhum</option>' + D.itens.map(function (i) { return "<option>" + i.nome + "</option>"; }).join("") + "</select></label>" +
      '<label class="campo"><span>Vincular a um evento</span><select><option>Nenhum</option>' +
      D.eventos.filter(function (e) { return e.dia >= 29; }).map(function (e) { return "<option>" + e.dia + "/10: " + e.nome + "</option>"; }).join("") + "</select></label>" +
      '<label class="anexo anexo--novo inteiro">' + Icone.anexo + '<span>Anexar arquivos</span><input type="file" class="sr-only" multiple></label>' +
      "</div></div>" +
      '<footer class="gaveta__rodape"><button type="button" class="btn btn--leve" data-fechar-ficha>Fechar</button>' +
      '<button type="submit" class="btn btn--tinta">Criar demanda</button></footer></form>'
    );
  };
})();
