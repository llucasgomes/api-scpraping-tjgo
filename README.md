# Projeto de Extração de Dados - API PJD TJGO

## Descrição
Este projeto consiste em uma API desenvolvida com Express, Puppeteer e CORS para extrair dados de consultas de processo no site do Tribunal de Justiça do Estado de Goiás (https://pjd.tjgo.jus.br/).

## Tecnologias Utilizadas
- **Express**: Framework web para Node.js.
- **Puppeteer**: Biblioteca Node.js para automação de browsers.
- **CORS**: Middleware para habilitar acesso a recursos de diferentes origens.

## Funcionalidades
1. **Extração de Dados de Processos:**
   - Utiliza o Puppeteer para realizar consultas e extrair informações detalhadas de processos no site do TJGO.

2. **API RESTful:**
   - Implementa rotas RESTful com Express para interação com a aplicação.

## Como Usar
1. Clone o repositório.
2. Instale as dependências utilizando `npm install`.
3. Execute a aplicação.

## POST
```json
http://localhost:8800/process

{
  "searchProcess":"0000000-00.0000.0.00.0000"
}



