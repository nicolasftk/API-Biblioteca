# API de Sistema de Biblioteca 

Bem-vindo(a) ao Guia Rápido da API para o Sistema de Biblioteca! Este é um guia conciso para ajudá-lo a começar a utilizar a nossa API de forma rápida e eficaz.

## Introdução

A API de Sistema de Biblioteca é uma ferramenta para gerenciar autores e livros em uma biblioteca. Ela foi desenvolvida em JavaScript e oferece métodos simples para cadastro, busca e listagem de autores e livros.

## Requisitos

- Node.js (versão 12 ou superior)
- PostgreSQL (banco de dados)
- Dependências do projeto (instaladas com `npm install`)

## Como Usar

1. **Configuração Inicial:**
   - Certifique-se de que o Node.js está instalado. Clone ou baixe este repositório e navegue até o diretório do projeto no terminal.

2. **Instale as Dependências:**
   - Execute o seguinte comando para instalar as dependências do projeto:
     ```bash
     npm install
     ```

3. **Importe as Tabelas:**
   - Execute o código SQL no arquivo `dump.sql` no seu banco de dados PostgreSQL para criar as tabelas necessárias.

4. **Inicie o Servidor:**
   - Inicie o servidor da API com o seguinte comando:
     ```bash
     npm start
     ```

5. **Endpoints Principais:**
   - Explore os seguintes endpoints para interagir com a API:
     - **Cadastrar um Autor:** `POST /autor`
     - **Buscar um Autor:** `GET /autor/:id`
     - **Cadastrar um Livro:** `POST /autor/:id/livro`
     - **Listar Livros:** `GET /livro`

## Exemplos de Uso

### Cadastrar um Autor

**Endpoint:** `POST /autor`

**Exemplo de Requisição:**
```json
{
    "nome": "Autor Exemplo",
    "idade": 40
}
```

### Cadastrar um Livro

**Endpoint:** `POST /autor/:id/livro`

Exemplo de Requisição:

```json
{
    "nome": "Livro de Exemplo",
    "genero": "Ficção",
    "editora": "Editora ABC",
    "data_publicacao": "2022-01-15"
}
```
