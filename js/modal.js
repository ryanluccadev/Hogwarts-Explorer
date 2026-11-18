/*
    STAR WARS NEXUS
    Arquivo: modal.js

    Responsabilidades:
    - Identificar o item selecionado pelo usuário.
    - Preencher o modal com suas informações completas.
    - Tratar informações vazias ou desconhecidas.
    - Utilizar o componente Modal do Bootstrap.

    O mesmo sistema de modal deverá funcionar
    nas páginas de Personagens, Planetas e Naves.
*/

const formato = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 20 });

export function elemento(tag, texto = '', classe = '') {
  const node = document.createElement(tag);
  node.textContent = texto;
  if (classe) node.className = classe;
  return node;
}

export function valorExibido(valor, unidade = '') {
  const texto = String(valor ?? '').trim();
  if (!texto || /^unknown$/i.test(texto)) return 'Não informado';
  if (/^n\/a$/i.test(texto)) return 'Não aplicável';
  if (/^none$/i.test(texto)) return 'Nenhum';
  const numerico = texto.replaceAll(',', '');
  const convertido = /^\d+(\.\d+)?$/.test(numerico) && Number.isFinite(Number(numerico))
    ? formato.format(Number(numerico))
    : texto;
  return unidade ? convertido + unidade : convertido;
}

function painel(titulo, linhas) {
  const secao = elemento('section', '', 'detail-panel');
  const lista = elemento('dl');
  for (const [rotulo, valor] of linhas) {
    const linha = elemento('div');
    linha.append(elemento('dt', rotulo), elemento('dd', valor));
    lista.append(linha);
  }
  secao.append(elemento('h3', titulo), lista);
  return secao;
}

const contar = itens => Array.isArray(itens) ? itens.length : null;

function paineisPlaneta(item) {
  return [
    painel('Informações gerais', [
      ['Clima', valorExibido(item.climate)],
      ['Terreno', valorExibido(item.terrain)],
      ['População', valorExibido(item.population)],
      ['Diâmetro', valorExibido(item.diameter, ' km')],
      ['Gravidade', valorExibido(item.gravity)],
      ['Rotação', valorExibido(item.rotation_period, ' h')],
      ['Órbita', valorExibido(item.orbital_period, ' dias')],
      ['Água na superfície', valorExibido(item.surface_water, '%')]
    ]),
    painel('Relações na SWAPI', [
      ['Residentes cadastrados', valorExibido(contar(item.residents))],
      ['Filmes associados', valorExibido(contar(item.films))]
    ])
  ];
}

function paineisNave(item) {
  return [
    painel('Informações gerais', [
      ['Modelo', valorExibido(item.model)],
      ['Fabricante', valorExibido(item.manufacturer)],
      ['Classe', valorExibido(item.starship_class)],
      ['Custo', valorExibido(item.cost_in_credits, ' créditos')]
    ]),
    painel('Características técnicas', [
      ['Comprimento', valorExibido(item.length, ' m')],
      ['Velocidade atmosférica máxima', valorExibido(item.max_atmosphering_speed, ' km/h')],
      ['Tripulação', valorExibido(item.crew)],
      ['Passageiros', valorExibido(item.passengers)],
      ['Capacidade de carga', valorExibido(item.cargo_capacity, ' kg')],
      ['Autonomia de suprimentos', valorExibido(item.consumables)],
      ['Classificação do hiperdrive', valorExibido(item.hyperdrive_rating)],
      ['MGLT', valorExibido(item.MGLT)]
    ]),
    painel('Relações na SWAPI', [
      ['Filmes associados', valorExibido(contar(item.films))],
      ['Pilotos cadastrados', valorExibido(contar(item.pilots))]
    ])
  ];
}

export function prepararModal({ nave, item, imagem, registro }) {
  const modal = document.querySelector('#detalhes');
  modal.querySelector('#detalhes-titulo').textContent = item.name;
  modal.querySelector('#detalhes-status').textContent = '';
  const corpo = modal.querySelector('#detalhes-corpo');
  corpo.replaceChildren(imagem, ...(nave ? paineisNave(item) : paineisPlaneta(item)));
  const link = modal.querySelector('#registro');
  link.hidden = !registro;
  if (registro) link.href = registro;
  else link.removeAttribute('href');
  return modal;
}

export function abrirModal(modal, origem) {
  if (!window.bootstrap?.Modal) return false;
  modal.addEventListener('hidden.bs.modal', () => origem.focus(), { once: true });
  window.bootstrap.Modal.getOrCreateInstance(modal).show(origem);
  return true;
}