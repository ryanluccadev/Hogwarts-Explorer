/*
    STAR WARS NEXUS
    Arquivo: cache.js

    Responsabilidades:
    - Verificar se existem dados salvos no localStorage.
    - Recuperar os dados armazenados.
    - Salvar os dados recebidos da API em formato JSON.
    - Evitar requisições desnecessárias à SWAPI.

    O cache será utilizado por todas as páginas
    que consomem dados da API.
*/

const VALIDADE = 24 * 60 * 60 * 1000;
const FAVORITOS = 'swe:naves:favoritos';
const chaveCache = recurso => 'swe:cache:v1:' + recurso;

function ler(chave) {
  try {
    return JSON.parse(localStorage.getItem(chave));
  } catch {
    return null;
  }
}

function salvar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function lerCache(recurso) {
  const cache = ler(chaveCache(recurso));
  if (!Array.isArray(cache?.dados) || !Number.isFinite(cache.data)) return null;
  const idade = Date.now() - cache.data;
  if (idade < 0 || idade >= VALIDADE) return null;
  return cache.dados;
}

export function salvarCache(recurso, dados) {
  return salvar(chaveCache(recurso), { data: Date.now(), dados });
}

export function lerFavoritos() {
  const ids = ler(FAVORITOS);
  return new Set(Array.isArray(ids) ? ids.filter(id => typeof id === 'string') : []);
}

export function salvarFavoritos(ids) {
  return salvar(FAVORITOS, [...ids]);
}