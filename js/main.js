import { carregarRecurso, urlRegistro } from './api.js';
import { lerFavoritos, salvarFavoritos } from './cache.js';
import { filtrarRegistros, listarClasses } from './busca.js';
import { abrirModal, elemento, prepararModal, valorExibido } from './modal.js';

const recurso = document.body.dataset.recurso;
const nave = recurso === 'starships';
const porPagina = 6;
const substantivo = nave ? ['nave', 'naves']  : ['planeta', 'planetas'];
const $ = id => document.getElementById(id);
const lista = $('lista');
const busca = $('busca');
const classe = $('classe');
const ordem = $('ordem');
const status = $('status');
const feedback = $('feedback');
const acao = $('acao');
const atualizar = $('atualizar');
const paginacao = $('paginacao');
const favorito = $('favorito');

const imagens = new Map([
  ['Tatooine', 'tatooine'], ['Alderaan', 'alderaan'], ['Naboo', 'naboo'],
  ['Hoth', 'hoth'], ['Endor', 'endor'], ['Coruscant', 'coruscant'],
  ['Millennium Falcon', 'millennium-falcon'], ['X-wing', 'x-wing'],
  ['Star Destroyer', 'star-destroyer'],
  ['Slave 1', 'slave-1']
]);

const destaques = new Map([
  ['Tatooine', 0], ['Alderaan', 1], ['Naboo', 2], ['Hoth', 3], ['Endor', 4], ['Coruscant', 5]
]);

let registros = [];
let pagina = 1;
let selecionado = null;
let favoritos = nave ? lerFavoritos() : new Set();
let erro = false;

function criarImagem(item, card = false) {
  const padrao = nave ? 'nave-generica' : 'planeta-generico';
  const nome = imagens.get(item.name);
  const imagem = elemento('img', '', card ? 'card-image' : 'detail-image');
  const descricaoPadrao = nave ? 'Ilustração genérica de uma nave no espaço' : 'Ilustração genérica de um planeta visto do espaço';
  imagem.src = new URL('../assets/imagens/' + (nome ?? padrao) + '.webp', import.meta.url).href;
  imagem.alt = nome ? 'Ilustração de ' + item.name : descricaoPadrao;
  if (card) imagem.loading = 'lazy';
  imagem.addEventListener('error', () => {
    if (nome) {
      imagem.src = new URL('../assets/imagens/' + padrao + '.webp', import.meta.url).href;
      imagem.alt = descricaoPadrao;
    }
  }, { once: true });
  return imagem;
}

function marcarCard(card, marcado) {
  const selo = card.querySelector('.favorite-mark');
  if (selo) selo.hidden = !marcado;
  card.classList.toggle('is-favorite', marcado);
}

function atualizarFavorito() {
  if (!favorito || !selecionado) return;
  const { id } = selecionado;
  const marcado = favoritos.has(id);
  favorito.hidden = !id;
  favorito.setAttribute('aria-pressed', String(marcado));
  favorito.textContent = marcado ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos';
}

function criarCard(item) {
  const card = elemento('article', '', 'catalog-card');
  const imagem = criarImagem(item, true);
  const conteudo = elemento('div', '', 'card-copy');
  const titulo = elemento('h2', item.name);
  const campos = nave
    ? [['Modelo', item.model], ['Fabricante', item.manufacturer]]
    : [['Clima', item.climate], ['População', item.population]];
  const dados = elemento('dl', '', 'card-data');
  for (const [rotulo, valor] of campos) {
    const linha = elemento('div');
    linha.append(elemento('dt', rotulo), elemento('dd', valorExibido(valor)));
    dados.append(linha);
  }
  const detalhes = elemento('button', 'Ver detalhes →', 'gold-button');
  detalhes.type = 'button';
  detalhes.setAttribute('aria-label', 'Ver detalhes de ' + item.name);
  const registro = urlRegistro(item.url, recurso);
  const id = registro ? new URL(registro).pathname.split('/').filter(Boolean).at(-1) : null;
  detalhes.addEventListener('click', () => {
    selecionado = { id, card };
    const modal = prepararModal({ nave, item, imagem: criarImagem(item), registro });
    atualizarFavorito();
    if (!abrirModal(modal, detalhes)) {
      status.textContent = 'O componente de detalhes do Bootstrap não pôde ser carregado.';
    }
  });
  conteudo.append(titulo, dados, detalhes);
  card.append(imagem, conteudo);
  if (nave) {
    const selo = elemento('span', '★', 'favorite-mark');
    selo.setAttribute('role', 'img');
    selo.setAttribute('aria-label', 'Favorita');
    card.append(selo);
    marcarCard(card, favoritos.has(id));
  }
  return card;
}

function mostrarFeedback(mensagem, rotulo) {
  $('mensagem').textContent = mensagem;
  acao.textContent = rotulo;
  feedback.hidden = false;
}

function montarPaginacao(total) {
  paginacao.replaceChildren();
  paginacao.hidden = total <= 1;
  if (total <= 1) return;

  const incluir = (texto, destino, rotulo, indisponivel = false) => {
    if (total > 8 && destino > 1 && destino < total && Math.abs(destino - pagina) > 1 && /^\d+$/.test(texto)) {
      if (destino === 2 || destino === total - 1) paginacao.append(elemento('span', '…', 'catalog-ellipsis'));
      return;
    }
    const botao = elemento('button', texto, 'outline-button');
    botao.type = 'button';
    botao.disabled = indisponivel;
    botao.setAttribute('aria-label', rotulo);
    if (destino === pagina && !indisponivel) botao.setAttribute('aria-current', 'page');
    botao.addEventListener('click', () => {
      pagina = destino;
      renderizar();
      paginacao.querySelector('[aria-current="page"]')?.focus();
    });
    paginacao.append(botao);
  };
  incluir('‹', pagina - 1, 'Página anterior', pagina === 1);
  for (let numero = 1; numero <= total; numero += 1) incluir(String(numero), numero, 'Página ' + numero);
  incluir('›', pagina + 1, 'Próxima página', pagina === total);
}

function renderizar() {
  const filtrados = filtrarRegistros(registros, busca.value, classe?.value, ordem?.value);
  const total = filtrados.length;
  const paginas = Math.ceil(total / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const rotulo = total === 1 ? substantivo[0] : substantivo[1];
  const encontrados = nave ? (total === 1 ? 'encontrada' : 'encontradas') : (total === 1 ? 'encontrado' : 'encontrados');
  status.textContent = total + ' ' + rotulo + ' ' + encontrados +
    (paginas > 1 ? ' · Página ' + pagina + ' de ' + paginas : '');
  lista.replaceChildren(...filtrados.slice(inicio, inicio + porPagina).map(criarCard));
  montarPaginacao(paginas);
  feedback.hidden = true;
  if (!total) mostrarFeedback('Nenhum resultado corresponde à busca ou aos filtros.', 'Limpar busca e filtros');
}

function habilitarControles(habilitado) {
  for (const campo of [busca, classe, ordem]) {
    if (campo) campo.disabled = !habilitado;
  }
  atualizar.hidden = !habilitado;
}

async function carregar(forcar = false) {
  erro = false;
  habilitarControles(false);
  lista.setAttribute('aria-busy', 'true');
  lista.replaceChildren();
  paginacao.hidden = true;
  feedback.hidden = true;
  status.textContent = 'Carregando ' + substantivo[1] + '…';
  try {
    registros = await carregarRecurso(recurso, { atualizar: forcar });
    if (recurso === 'planets') {
      registros = [...registros].sort((a, b) =>
        (destaques.get(a.name) ?? Infinity) - (destaques.get(b.name) ?? Infinity)
      );
    }
    if (classe) {
      const anterior = classe.value;
      const opcoes = listarClasses(registros).map(nome => new Option(nome, nome));
      classe.replaceChildren(new Option('Todas as classes', ''), ...opcoes);
      if (opcoes.some(opcao => opcao.value === anterior)) classe.value = anterior;
    }
    pagina = 1;
    habilitarControles(true);
    renderizar();
  } catch {
    erro = true;
    status.textContent = 'Não foi possível carregar ' + substantivo[1] + '.';
    mostrarFeedback('Verifique sua conexão ou tente novamente em instantes.', 'Tentar novamente');
  } finally {
    lista.setAttribute('aria-busy', 'false');
  }
}

function redefinirPagina() {
  pagina = 1;
  renderizar();
}

busca.addEventListener('input', redefinirPagina);
classe?.addEventListener('change', redefinirPagina);
ordem?.addEventListener('change', redefinirPagina);
atualizar.addEventListener('click', () => carregar(true));
acao.addEventListener('click', () => {
  if (erro) {
    carregar(true);
    return;
  }
  busca.value = '';
  if (classe) classe.value = '';
  if (ordem) ordem.value = 'asc';
  redefinirPagina();
  busca.focus();
});

favorito?.addEventListener('click', () => {
  const { id, card } = selecionado;
  if (!id) return;
  favoritos = lerFavoritos();
  const marcado = !favoritos.has(id);
  if (marcado) favoritos.add(id);
  else favoritos.delete(id);
  const mensagem = $('detalhes-status');
  if (!salvarFavoritos(favoritos)) {
    favoritos = lerFavoritos();
    mensagem.textContent = 'Não foi possível salvar os favoritos neste navegador.';
    return;
  }
  atualizarFavorito();
  marcarCard(card, marcado);
  mensagem.textContent = marcado ? 'Nave adicionada aos favoritos.' : 'Nave removida dos favoritos.';
});

carregar();