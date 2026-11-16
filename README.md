# ⚡ Hogwarts Explorer

Website interativo desenvolvido para explorar o universo mágico de **Harry Potter**, utilizando a Hogwarts API para apresentar informações sobre personagens, feitiços, poções, criaturas e livros.

O projeto foi desenvolvido como parte de uma atividade acadêmica, aplicando conceitos de desenvolvimento web, consumo de APIs REST, manipulação do DOM, responsividade e armazenamento local.

## ✨ Funcionalidades

- Navegação entre páginas dedicadas a diferentes recursos.
- Listagem automática dos dados obtidos pela API.
- Busca dinâmica por nome.
- Filtros de personagens por casa de Hogwarts.
- Ordenação alfabética dos resultados.
- Visualização de informações completas em modais do Bootstrap.
- Cache local com `localStorage` para reduzir requisições.
- Atualização dos dados armazenados.
- Tratamento de erros e mensagens informativas.
- Interface responsiva para dispositivos móveis e computadores.

## 🛠️ Tecnologias utilizadas

- **HTML5:** estrutura e semântica das páginas.
- **CSS3:** estilização e identidade visual.
- **JavaScript:** interatividade, busca, filtros e integração com a API.
- **Bootstrap 5:** componentes e responsividade.
- **Hogwarts API:** fornecimento dos dados.
- **localStorage:** armazenamento local em formato JSON.

## 📁 Estrutura do projeto

```text
Hogwarts-Explorer/
├── index.html
├── pages/
│   ├── personagens.html
│   ├── feiticos.html
│   ├── pocoes.html
│   ├── criaturas.html
│   └── livros.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   ├── api.js
│   ├── cache.js
│   ├── search.js
│   ├── modal.js
│   └── main.js
└── README.md
```

## 🚀 Como executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/ryanluccadev/Hogwarts-Explorer.git
   ```
2. Abra a pasta no Visual Studio Code.
3. Instale a extensão **Live Server**.
4. Abra o arquivo `index.html` utilizando o Live Server.
5. Navegue pelas páginas e explore os recursos disponíveis.

**Observação:** é necessária uma conexão com a internet para a primeira consulta à API.

## 🌐 API utilizada

**Hogwarts API**

https://hogwarts-api.com

Os dados são consultados por meio de requisições HTTP utilizando `fetch` e `async/await`.

## 👨‍💻 Desenvolvedores

- **Ryan Lucca Marques Pereira**
- **Pedro Aragoni**

## 🎓 Informações acadêmicas

**Instituição:** Instituto Federal de São Paulo (IFSP)

**Curso:** Tecnologia em Sistemas para Internet

**Projeto:** Desenvolvimento Web — Consumo de API Pública

**Ano:** 2026

**Data de entrega:** 08 de dezembro de 2026

---

Desenvolvido para fins educacionais, utilizando dados públicos do universo de Harry Potter.
