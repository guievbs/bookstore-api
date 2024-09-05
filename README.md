# Bookstore API

## Descrição

A API de Livraria é um projeto back-end desenvolvido com Node.js, Express e MongoDB. Esta API fornece endpoints para gerenciar usuários, livros, autores e pedidos em um sistema de livraria. Inclui autenticação de usuário com JWT e funcionalidades para CRUD (Criar, Ler, Atualizar e Deletar) e operações específicas como listagem de livros por estoque.

## Tecnologias Utilizadas

- Node.js
- Express
- MongoDB com Mongoose
- JWT para autenticação
- Bcrypt para hashing de senhas
- Swagger para documentação da API

## Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/your-username/bookstore-api.git
   cd bookstore-api
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```
   SECRET_KEY=seu_segredo_aqui
   MONGO_URI=mongodb://localhost:27017/bookstore
   ```

4. **Inicie o servidor:**

   ```bash
   npm start
   ```

   O servidor será iniciado na porta 3000 por padrão. Você pode acessar a API em `http://localhost:3000`.

## Endpoints

### Autenticação

- **POST /api/auth/register**

  Registra um novo usuário.

  **Body:**

  ```json
  {
    "name": "Guilherme",
    "email": "gui@gmail.com",
    "password": "password1203546"
  }
  ```

- **POST /api/auth/login**

  Faz login e gera um token JWT.

  **Body:**

  ```json
  {
    "email": "gui@gmail.com",
    "password": "password1203546"
  }
  ```

### Livros

- **GET /api/books**

  Lista todos os livros.

- **POST /api/books**

  Adiciona um novo livro.

  **Body:**

  ```json
  {
    "title": "O Senhor dos Anéis",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasia",
    "price": 29.9,
    "stock": 100
  }
  ```

### Autores

- **GET /api/authors**

  Lista todos os autores.

- **POST /api/authors**

  Adiciona um novo autor.

  **Body:**

  ```json
  {
    "name": "J.R.R. Tolkien",
    "bio": "Autor de O Senhor dos Anéis"
  }
  ```

### Pedidos

- **POST /api/orders**

  Cria um novo pedido.

  **Body:**

  ```json
  {
    "user": "userId",
    "items": [
      {
        "book": "bookId",
        "quantity": 2
      }
    ]
  }
  ```

## Documentação

A documentação da API está disponível no Swagger UI. Você pode acessá-la em `http://localhost:3000/docs`.

## Testes

Para executar os testes, use o seguinte comando:

```bash
npm test
```

## Contribuição

Se você deseja contribuir para o projeto, faça um fork do repositório, crie uma branch para suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](https://github.com/guievbs/bookstore-api/blob/main/LICENSE).
