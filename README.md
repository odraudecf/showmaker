# ShowMaker: protótipo do front-end

Protótipo visual das principais páginas do ShowMaker, o sistema de gestão para LabMakers. Ele não usa banco de dados e não salva nada: os dados são fictícios, e o JavaScript só troca abas, abre fichas e mostra avisos.

## Como abrir

Dê duplo clique em `index.html`. A tela de login aceita qualquer senha. Se deixar a senha em branco, aparece a mensagem de erro.

## O que demonstrar

| Tela | Onde | Requisitos |
|---|---|---|
| Login | `index.html` | RF01 |
| Abas de pasta (abrir, trocar, fechar) | barra de orelhas no `app.html` | RF03, RNF02 |
| Ver como Aluno / Professor / Gestor | topo do `app.html` | RF02 |
| Painel | aba fixa | RF04, RF39, RF44 |
| Agenda e ficha de evento (com conflito de horário) | Abrir pasta → Agenda | RF09–RF17, RF40, RF41 |
| Estoque: itens, movimentações, inventário | Abrir pasta → Estoque | RF18–RF28, RF43 |
| Demandas: quadro, lista, detalhe | Abrir pasta → Demandas | RF29–RF39, RF42 |
| Cadastros: usuários, espaços, equipamentos | Abrir pasta → Cadastros (só gestor) | RF05–RF08 |
| Perfil e matriz de permissões | avatar no canto superior direito | RF02 |

## Estrutura

```
index.html        login
app.html          casca com as abas
css/tokens.css    cores, fontes e espaçamentos
css/base.css      reset e textura da mesa
css/paper.css     componentes (pasta, ficha, caderneta, carimbo, post-it…)
css/screens.css   ajustes de cada tela
js/dados.js       dados fictícios
js/screens/*.js   uma tela por arquivo, mais as fichas dela
js/ui.js          fichas, divisórias, avisos e "Ver como"
js/tabs.js        abas de pasta
```

As fontes (Instrument Sans e Kalam) vêm do Google Fonts. Sem internet, o navegador usa as fontes do sistema.
