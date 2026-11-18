# 🌌 Star Wars Nexus

Website interativo desenvolvido para explorar o universo de **Star Wars**, utilizando a **SWAPI (Star Wars API)** para apresentar informações sobre personagens, planetas, espécies, naves espaciais e veículos da franquia.

O projeto foi desenvolvido como parte de uma atividade acadêmica do Instituto Federal de São Paulo (IFSP), aplicando conceitos de desenvolvimento web, consumo de APIs REST, manipulação do DOM, responsividade e armazenamento local de dados.

## 🚀 Funcionalidades

- **Website multipágina:** navegação entre páginas dedicadas a diferentes recursos do universo Star Wars.
- **Listagem automática:** carregamento dos registros disponibilizados pela API, incluindo todas as páginas de resultados.
- **Busca dinâmica:** pesquisa por nome ou título, conforme o recurso.
- **Informações resumidas:** apresentação dos principais dados em cards organizados.
- **Detalhes completos:** exibição das informações de cada item em modais do Bootstrap.
- **Cache local:** armazenamento JSON no `localStorage`, reduzindo requisições desnecessárias.
- **Atualização de dados:** possibilidade de renovar os registros armazenados.
- **Tratamento de erros:** mensagens para falhas de conexão e resultados não encontrados.
- **Interface responsiva:** adaptação para celulares, tablets e computadores.

## 🛠️ Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| HTML5 | Estrutura e semântica das páginas |
| CSS3 | Estilização e identidade visual |
| JavaScript | Interatividade e manipulação do DOM |
| Bootstrap 5 | Componentes, modais e responsividade |
| Fetch API | Requisições HTTP à SWAPI |
| localStorage | Armazenamento local dos dados em JSON |

## 🌐 API utilizada

**SWAPI — Star Wars API**

https://swapi.dev/

A API fornece informações sobre diferentes recursos do universo Star Wars, incluindo:

- **Personagens:** nomes, características físicas, gênero e planeta natal.
- **Planetas:** clima, terreno, população e características geográficas.
- **Espécies:** classificação, idioma, características e expectativa de vida.
- **Naves espaciais:** modelos, fabricantes, capacidade e velocidade.
- **Veículos:** modelos, fabricantes e especificações técnicas.

Os dados são obtidos por meio de requisições HTTP utilizando `fetch` e `async/await`.

Quando a API disponibiliza resultados paginados, o sistema percorre as páginas necessárias para reunir os registros.

## 📁 Estrutura do projeto

```text
Star-Wars-Explorer/
├── index.html
│
├── pages/
│   ├── personagens.html
│   ├── planetas.html
│   ├── especies.html
│   ├── naves.html
│   └── veiculos.html
│
├── css/
│   ├── style.css
│   ├── personagens.css
│   ├── planetas.css
│   ├── especies.css
│   ├── naves.css
│   └── veiculos.css
│
├── js/
│   ├── config.js
│   ├── api.js
│   ├── cache.js
│   ├── search.js
│   ├── modal.js
│   └── main.js
│
├── img/
│   ├── banners/
│   ├── personagens/
│   ├── planetas/
│   ├── especies/
│   ├── naves/
│   └── veiculos/
│
├── README.md
└── .gitignore
```

Cada página possui sua própria identidade visual e apresenta os recursos correspondentes, enquanto as funções de integração com a API, cache e busca são reutilizadas.

## 💾 Sistema de cache

O projeto utiliza `localStorage` para reduzir o número de requisições à SWAPI.

**Funcionamento:**

1. Ao acessar uma página, o JavaScript verifica se os dados já estão armazenados.
2. Se existirem, os registros são recuperados do `localStorage`.
3. Caso contrário, o sistema realiza requisições à SWAPI.
4. Os dados recebidos são convertidos para JSON e armazenados localmente.
5. Nas próximas visitas, os dados armazenados são reutilizados.

O sistema também prevê tratamento para falhas de armazenamento e atualização manual dos registros.

## 🔎 Busca e visualização de detalhes

Cada página possui um campo de pesquisa que permite filtrar os registros por nome ou título.

Os resultados são apresentados em cards com informações resumidas.

Ao selecionar um item, um modal do Bootstrap exibe seus dados completos, preenchidos dinamicamente com JavaScript.

Caso nenhum registro corresponda à pesquisa, o sistema apresenta uma mensagem informativa.

## 📱 Responsividade e acessibilidade

A interface utiliza Bootstrap 5 e CSS3 para oferecer uma experiência adaptada a diferentes tamanhos de tela.

O projeto também utiliza elementos semânticos do HTML5, rótulos nos formulários, textos alternativos nas imagens e recursos básicos de acessibilidade.

## 💻 Como executar

**1. Clone o repositório:**

```bash
git clone https://github.com/ryanluccadev/Star-Wars-Explorer.git
```

**2. Abra a pasta do projeto no Visual Studio Code.**

**3. Instale a extensão Live Server.**

**4. Abra o arquivo `index.html` com o Live Server.**

**5. Navegue pelas páginas para explorar os recursos de Star Wars.**

É necessária uma conexão com a internet para a primeira consulta à API.

## 👨‍💻 Desenvolvedores

- **Ryan Lucca Marques Pereira**
- **Pedro Aragoni**

## 🎓 Informações acadêmicas

**Instituição:** Instituto Federal de São Paulo (IFSP)

**Curso:** Tecnologia em Sistemas para Internet

**Projeto:** Desenvolvimento Web — Consumo de API Pública

**API escolhida:** SWAPI — Star Wars API

**Ano:** 2026

**Data de apresentação e entrega:** 08 de dezembro de 2026

---

Projeto desenvolvido para fins educacionais, sem vínculo oficial com Lucasfilm ou Disney.

*Que a Força esteja com você!* 🌌
