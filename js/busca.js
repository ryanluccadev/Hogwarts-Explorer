/*
    STAR WARS NEXUS
    Arquivo: busca.js

    Responsabilidades:
    - Capturar o texto digitado no campo de pesquisa.
    - Filtrar os registros pelo nome.
    - Atualizar os resultados exibidos na página.
    - Informar quando nenhum resultado for encontrado.

    A lógica de busca será compartilhada entre
    Personagens, Planetas e Naves.
*/

const normalizar = texto => texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR');
const comparar = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true }).compare;

export function filtrarRegistros(registros, termo, classe = '', ordem = '') {
  const consulta = normalizar(termo.trim());
  const filtrados = registros.filter(item =>
    normalizar(item.name).includes(consulta) && (!classe || item.starship_class === classe)
  );
  if (ordem) filtrados.sort((a, b) => comparar(a.name, b.name) * (ordem === 'desc' ? -1 : 1));
  return filtrados;
}

export function listarClasses(registros) {
  const classes = registros.map(item => item.starship_class)
    .filter(classe => typeof classe === 'string' && classe && !/^(unknown|n\/a)$/i.test(classe));
  return [...new Set(classes)].sort(comparar);
}