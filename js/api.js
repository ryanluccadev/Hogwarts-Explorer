/*
    STAR WARS NEXUS
    Arquivo: api.js

    Responsabilidades:
    - Fazer requisições à SWAPI utilizando fetch().
    - Receber e interpretar os dados em JSON.
    - Percorrer todas as páginas de resultados da API.
    - Disponibilizar os dados para outras funcionalidades.

    Este arquivo será reutilizado nas páginas
    de Personagens, Planetas e Naves.
*/

import { lerCache, salvarCache } from './cache.js';

const ORIGEM = 'https://swapi.dev';

export function urlRegistro(valor, recurso) {
  try {
    const url = new URL(valor);
    if (!['https:', 'http:'].includes(url.protocol) || url.host !== 'swapi.dev') return null;
    if (!new RegExp('^/api/' + recurso + '/[0-9]+/?$').test(url.pathname)) return null;
    return new URL(url.pathname, ORIGEM).href;
  } catch {
    return null;
  }
}

export async function carregarRecurso(recurso, { atualizar = false } = {}) {
  if (!['planets', 'starships'].includes(recurso)) throw new Error('Recurso inválido');
  const cache = atualizar ? null : lerCache(recurso);
  if (cache) return cache;

  const caminho = '/api/' + recurso + '/';
  let proxima = new URL(caminho, ORIGEM);
  const visitadas = new Set();
  const registros = [];
  while (proxima) {
    if (proxima.origin !== ORIGEM || proxima.pathname !== caminho || visitadas.has(proxima.href)) {
      throw new Error('Paginação inválida');
    }
    visitadas.add(proxima.href);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    let pagina;
    try {
      const resposta = await fetch(proxima, { signal: controller.signal });
      if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
      pagina = await resposta.json();
    } finally {
      clearTimeout(timeout);
    }
    if (!Array.isArray(pagina?.results) || pagina.results.some(item => typeof item?.name !== 'string')) {
      throw new Error('Resposta inválida');
    }
    registros.push(...pagina.results);
    if (pagina.next !== null && typeof pagina.next !== 'string') throw new Error('Paginação ausente');
    proxima = pagina.next === null ? null : new URL(pagina.next, proxima);
    if (proxima?.protocol === 'http:' && proxima.host === 'swapi.dev') proxima.protocol = 'https:';
  }
  salvarCache(recurso, registros);
  return registros;
}