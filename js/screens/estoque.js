// Estoque (RF18–RF28, RF43): itens, movimentações e inventário.
(function () {
  var D = window.Dados;

  function barraSaldo(i) {
    var max = Math.max(i.minimo * 2, i.saldo);
    var pct = Math.round((i.saldo / max) * 100);
    var minPct = Math.round((i.minimo / max) * 100);
    return (
      '<span class="saldo-barra' + (i.saldo < i.minimo ? " saldo-barra--baixo" : "") + '" aria-hidden="true">' +
      '<span style="width:' + pct + '%"></span><i style="left:' + minPct + '%"></i></span>'
    );
  }

  function linhasItens() {
    return D.itens
      .map(function (i) {
        return (
          '<tr data-ficha="item">' +
          "<td><b>" + i.nome + "</b></td>" +
          "<td>" + i.categoria + "</td>" +
          '<td class="num">' + i.saldo + " " + i.unidade + "</td>" +
          "<td>" + barraSaldo(i) + "</td>" +
          '<td class="num">' + i.minimo + "</td>" +
          "<td>" + i.local + "</td>" +
          "<td>" + (i.saldo < i.minimo ? D.carimbo("Repor") : "") + "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  var iconeTipo = { Entrada: "entrada", "Saída": "saida", Ajuste: "ajuste" };

  function linhasMov() {
    return D.movimentacoes
      .map(function (m) {
        var sinal = m.tipo === "Entrada" ? "+" : m.tipo === "Saída" ? "−" : m.qtd > 0 ? "+" : "−";
        return (
          '<li><span class="caderneta__quando">' + m.quando + "</span>" +
          '<span class="caderneta__texto mov">' +
          '<span class="mov__tipo mov__tipo--' + iconeTipo[m.tipo] + '">' + Icone[iconeTipo[m.tipo]] + m.tipo + "</span>" +
          '<span class="mov__qtd">' + sinal + Math.abs(m.qtd) + "</span>" +
          '<span class="mov__item">' + m.item + "</span>" +
          '<span class="mov__origem suave">' + m.origem + "</span>" +
          '<span class="mov__resp">' + D.avatar(m.resp, "avatar--p") + D.usuario(m.resp).nome + "</span>" +
          "</span></li>"
        );
      })
      .join("");
  }

  function linhasInventario() {
    var contados = [3, 6, 18, 11, 2, 9, 1, 38];
    return D.itens
      .map(function (i, n) {
        var dif = contados[n] - i.saldo;
        return (
          "<tr>" +
          '<td><label class="marcar"><input type="checkbox"' + (n < 5 ? " checked" : "") + '><span class="sr-only">Conferido</span></label></td>' +
          "<td>" + i.nome + "</td>" +
          "<td>" + i.local + "</td>" +
          '<td class="num">' + i.saldo + "</td>" +
          '<td class="num"><input class="entrada entrada--num" type="number" value="' + contados[n] + '" aria-label="Quantidade contada de ' + i.nome + '"></td>' +
          '<td class="num' + (dif !== 0 ? " diferenca" : "") + '">' + (dif > 0 ? "+" : dif < 0 ? "−" : "") + Math.abs(dif) + "</td>" +
          "</tr>"
        );
      })
      .join("");
  }

  window.Screens.estoque = {
    titulo: "Estoque",
    cor: "var(--cor-estoque)",
    html: function () {
      var abaixo = D.itens.filter(function (i) { return i.saldo < i.minimo; }).length;
      return (
        '<div class="cabecalho">' +
        "<div><h2>Estoque</h2><p>Materiais, insumos e o histórico de cada entrada e saída.</p></div>" +
        '<div class="acoes">' +
        '<button class="btn so-equipe" data-ficha="movimentacao">' + Icone.ajuste + "Registrar movimentação</button>" +
        '<button class="btn btn--tinta so-equipe" data-ficha="item-novo">' + Icone.mais + "Novo item</button>" +
        "</div></div>" +

        '<div class="aviso-estoque" role="status">' + Icone.alerta +
        "<p><b>" + abaixo + " itens estão abaixo do estoque mínimo.</b> Eles aparecem com o carimbo repor na lista.</p></div>" +

        '<div data-divisorias>' +
        '<div class="divisorias" role="tablist">' +
        '<button role="tab" aria-selected="true" data-divisoria="itens">Itens</button>' +
        '<button role="tab" aria-selected="false" data-divisoria="mov">Movimentações</button>' +
        '<button role="tab" aria-selected="false" data-divisoria="inventario" class="so-equipe">Inventário</button>' +
        "</div>" +

        '<div data-painel-divisoria="itens">' +
        '<div class="filtros">' +
        '<label class="busca">' + Icone.busca + '<span class="sr-only">Buscar item</span><input class="entrada" placeholder="Buscar item"></label>' +
        '<label class="campo campo--inline"><span class="sr-only">Categoria</span><select><option>Todas as categorias</option>' +
        "<option>Insumo de impressão</option><option>Material de corte</option><option>Componente eletrônico</option><option>Consumível</option></select></label>" +
        '<label class="marcar"><input type="checkbox"> Só abaixo do mínimo</label>' +
        "</div>" +
        '<div class="tabela-envoltorio"><table class="tabela">' +
        "<thead><tr><th>Item</th><th>Categoria</th><th class=\"num\">Saldo</th><th>Saldo × mínimo</th><th class=\"num\">Mínimo</th><th>Onde fica</th><th><span class=\"sr-only\">Alerta</span></th></tr></thead>" +
        "<tbody>" + linhasItens() + "</tbody></table></div>" +
        "</div>" +

        '<div data-painel-divisoria="mov" hidden>' +
        '<div class="filtros">' +
        '<label class="campo campo--inline"><span class="sr-only">Tipo</span><select><option>Entradas, saídas e ajustes</option><option>Só entradas</option><option>Só saídas</option><option>Só ajustes</option></select></label>' +
        '<label class="campo campo--inline"><span class="sr-only">Período</span><select><option>Últimos 15 dias</option><option>Este mês</option><option>Este semestre</option></select></label>' +
        "</div>" +
        '<section class="caderneta caderneta--mov"><h3>Livro de movimentações, outubro de 2026</h3><ol>' + linhasMov() + "</ol></section>" +
        "</div>" +

        '<div data-painel-divisoria="inventario" hidden>' +
        '<div class="cabecalho cabecalho--sub"><div><h3>Conferência de 29/10/2026</h3>' +
        "<p>Conte cada item na prateleira e anote a quantidade. As diferenças viram um ajuste no livro de movimentações.</p></div>" +
        '<button class="btn btn--tinta" data-toast="Ajuste registrado com 2 diferenças. No protótipo, nada é gravado de verdade.">Registrar ajuste</button></div>' +
        '<div class="tabela-envoltorio"><table class="tabela">' +
        '<thead><tr><th><span class="sr-only">Conferido</span></th><th>Item</th><th>Onde fica</th><th class="num">No sistema</th><th class="num">Contado</th><th class="num">Diferença</th></tr></thead>' +
        "<tbody>" + linhasInventario() + "</tbody></table></div>" +
        "</div>" +
        "</div>"
      );
    },
  };

  // ---------- Fichas ----------

  function fichaItem(novo) {
    var i = D.itens[0];
    return (
      '<form class="gaveta__form" data-toast="' + (novo ? "Item cadastrado" : "Item salvo") + '. No protótipo, nada é gravado de verdade.">' +
      '<header class="gaveta__topo"><div><span class="rotulo">Estoque</span><h2 id="ficha-titulo">' + (novo ? "Novo item" : i.nome) + "</h2></div>" +
      (novo ? "" : D.carimbo("Repor", true)) +
      '<button type="button" class="fechar" data-fechar-ficha aria-label="Fechar ficha">' + Icone.fechar + "</button></header>" +
      '<div class="gaveta__corpo">' +
      '<div class="grade-campos">' +
      '<label class="campo inteiro"><span>Nome do item</span><input value="' + (novo ? "" : i.nome) + '" placeholder="Ex.: Filamento ABS vermelho 1 kg"></label>' +
      '<label class="campo"><span>Categoria</span><select><option>Insumo de impressão</option><option>Material de corte</option><option>Componente eletrônico</option><option>Consumível</option></select></label>' +
      '<label class="campo"><span>Unidade</span><select><option>rolo</option><option>un</option><option>pacote</option><option>chapa</option><option>tubo</option></select></label>' +
      '<label class="campo"><span>Estoque mínimo</span><input type="number" value="' + (novo ? "" : i.minimo) + '"><small class="campo__ajuda">Abaixo disso, o item ganha o alerta repor.</small></label>' +
      '<label class="campo"><span>Saldo atual</span><input value="' + (novo ? "0" : i.saldo) + '" readonly><small class="campo__ajuda">Muda só por movimentação.</small></label>' +
      '<label class="campo inteiro"><span>Onde fica guardado</span><input value="' + (novo ? "" : i.local) + '" placeholder="Ex.: Armário A, prateleira 2"></label>' +
      '<label class="campo inteiro"><span>Observações</span><textarea></textarea></label>' +
      "</div>" +
      (novo
        ? ""
        : '<section class="caderneta"><h3>Últimas movimentações</h3><ol>' +
          '<li><span class="caderneta__quando">29/10</span><span class="caderneta__texto">Saída de 1 rolo por <b>Carlos Menezes</b> (demanda D-019)</span></li>' +
          '<li><span class="caderneta__quando">12/10</span><span class="caderneta__texto">Saída de 2 rolos por <b>Beatriz Nunes</b> (workshop de impressão 3D)</span></li>' +
          '<li><span class="caderneta__quando">01/10</span><span class="caderneta__texto">Entrada de 5 rolos por <b>Ana Ribeiro</b> (nota fiscal 4398)</span></li>' +
          "</ol></section>") +
      "</div>" +
      '<footer class="gaveta__rodape"><button type="button" class="btn btn--leve" data-fechar-ficha>Fechar</button>' +
      '<button type="submit" class="btn btn--tinta so-equipe">' + (novo ? "Cadastrar item" : "Salvar item") + "</button></footer></form>"
    );
  }

  window.Fichas.item = function () { return fichaItem(false); };
  window.Fichas["item-novo"] = function () { return fichaItem(true); };

  window.Fichas.movimentacao = function () {
    return (
      '<form class="gaveta__form" data-toast="Movimentação registrada. No protótipo, nada é gravado de verdade.">' +
      '<header class="gaveta__topo"><div><span class="rotulo">Estoque</span><h2 id="ficha-titulo">Registrar movimentação</h2></div>' +
      '<button type="button" class="fechar" data-fechar-ficha aria-label="Fechar ficha">' + Icone.fechar + "</button></header>" +
      '<div class="gaveta__corpo">' +
      '<fieldset class="conjunto"><legend class="rotulo">Tipo</legend><div class="tipo-mov">' +
      '<label><input type="radio" name="tipo-mov" checked><span>' + Icone.entrada + "Entrada</span></label>" +
      '<label><input type="radio" name="tipo-mov"><span>' + Icone.saida + "Saída</span></label>" +
      '<label><input type="radio" name="tipo-mov"><span>' + Icone.ajuste + "Ajuste</span></label>" +
      "</div></fieldset>" +
      '<div class="grade-campos">' +
      '<label class="campo inteiro"><span>Item</span><select>' + D.itens.map(function (i) { return "<option>" + i.nome + "</option>"; }).join("") + "</select></label>" +
      '<label class="campo"><span>Quantidade</span><input type="number" min="1" value="5"></label>' +
      '<label class="campo"><span>Data e hora</span><input type="datetime-local" value="2026-10-29T11:00"></label>' +
      '<label class="campo inteiro"><span>Origem ou destino</span><select><option>Compra (nota fiscal)</option><option>Doação</option><option>Demanda D-019: Imprimir suportes dos sensores da horta</option><option>Evento: Workshop de modelagem 3D</option></select></label>' +
      '<label class="campo inteiro"><span>Responsável</span><input value="Ana Ribeiro" readonly><small class="campo__ajuda">Toda movimentação fica registrada no nome de quem está logado.</small></label>' +
      '<label class="campo inteiro"><span>Observação</span><textarea placeholder="Ex.: nota fiscal 4502, fornecedor 3D Prime"></textarea></label>' +
      "</div></div>" +
      '<footer class="gaveta__rodape"><button type="button" class="btn btn--leve" data-fechar-ficha>Fechar</button>' +
      '<button type="submit" class="btn btn--tinta">Registrar movimentação</button></footer></form>'
    );
  };
})();
