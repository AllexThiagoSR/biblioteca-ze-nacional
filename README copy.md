# Ze Biblioteca Nacional

## Requerimentos

- Git
- Docker

## Instalação

Siga este passo a passo para testar este repositório.

Clone o repositório para sua máquina local

```
$ git clone git@github.com:tryber/sd-028-desafio-extra-nodejs.git
```

Acesse a pasta

```
$ cd sd-028-desafio-extra-nodejs
```

Acesse a branch onde o projeto está implementado

```
$ git checkout allex-thiago-desafio-extra
```

## Iniciar a aplicação

Inicie os containers com o Docker Compose

```
$ docker compose up -d
```

Acesse o container da api para instalar as dependências e inicia-la

```
$ docker exec -it api sh
/usr/app # npm install
/usr/app # npm run dev
```

Isso gerará a seguinte mensagem terminal:

```
> biblioteca-nacional@1.0.0 dev
> env $(cat .env) nodemon .

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node .`
Server up and running on PORT 3000
```

Confira se os containers estão rodando

```
$ docker ps
```

O retorno do comando anterior deve ser o seguinte:

```
CONTAINER ID   IMAGE            COMMAND                  CREATED         STATUS         PORTS                                                  NAMES
6124b782004b   mysql:8          "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   banco_sql
a3cbebe3a33e   node:18-alpine   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp              api
```

> Caso não tenha o docker, segue documentação para instalação: https://docs.docker.com/get-docker/

## Como utilizar?

1. Cetifique-se de seguir todos os passos de instalação.

Após os passos anteriores a aplicação estará exposta na porta 3000 do localhost. É possível acessar atráves do link base `http://localhost:3000`.

Dentro do container, podemos verificar os testes unitários, vide: 

```
$ npm run test:mocha
```

## Visualização do relacionamento entre as tabelas do banco de dados da Biblioteca Nacional

  <img width="100%" align="center" src="relacionamentos-tabelas.png" />
  <br></br>

## Tecnologias utilizadas

- JavaScript

- Docker

- Node.js

- Express

- MySQL

- Testes (Chai, Mocha e Sinon)

- Nodemon

# Endpoints da aplicação

>Url base: http://localhost:3000

## Listar todos os livros


### Requisição


`GET /books`

    http://localhost:3000/books

### Resposta
    {
      "total": 3,
      "books": [
        {
          "id": 1,
          "title": "O Grand Gatsby",
          "isRented": false
        },
        {
          "id": 2,
          "title": "1984",
          "isRented": true
        },
        {
          "id": 3,
          "title": "Dom Quixote",
          "isRented": false
        }
      ]
    }

## Selecionar um livro pelo seu id

### Requisição

`GET /books/:id`

    http://localhost:3000/books/1

### Resposta

    {
      "id": 1,
      "title": "O Grand Gatsby",
      "isRented": false
    }

## Pegar um livro emprestado

### Requisição

`POST /books/borrow`

    http://localhost:3000/books/borrow

    body:
    {
      "userId": 1,
      "bookId": 1
    }

### Resposta

    { "message": "Book with id 1 borrowed by userId 1 at 2023-07-11" }

## Devolver um livro emprestado

### Requisição

`POST /books/return`

    http://localhost:3000/books/return

    body:
    {
      "userId": 1,
      "bookId": 1
    }

### Resposta

    { "message": "Book with id 1 returned by userId 1 at 2023-07-11" }

## Criar um usuário

### Requisição

`POST /users`

    body:
    {
      "username": "userTeste",
      "password": "1234ABCD"
    }

### Response

    { "id":13, "username": "userTeste" }

## Fazer um login

### Requisição

`POST /users/login`

    body:
    {
      "username": "userTeste",
      "password": "1234ABCD"
    }

### Response

    { 
      "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdGUxIiwiaWQiOjE1LCJyb2xlIjoyfSwiaWF0IjoxNjg2NTI2NTQ2LCJleHAiOjE2ODY2OTkzNDZ9.lLHnOnK4q7KfvuYtPoruEyfO5MeoZiRPLDXxuC4zcwE"
    }

## Obter informações dos empréstimos de livros

### Requisição - Para essa requisição deve-se estar logado com um usuário com privilégios

`GET /admin/show/borrows`

    http://localhost:3000/admin/show/borrows

    headers:
    {
      "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiU2V1IFplIiwiaWQiOjIsInJvbGUiOjF9LCJpYXQiOjE2ODY1MjY3MzcsImV4cCI6MTY4NjY5OTUzN30.ItisvspLDRXKgBKMQpmnoPqgZ3KXYWW1Kpipooh4Yv4"
    }

### Response

    [
      {
        "rentalDate": "2023-05-01T00:00:00.000Z",
        "returnedAt": null,
        "user": {
          "username": "Sobrinho do seu Ze"
        },
        "book": {
          "title": "1984"
        }
      },
      {
        "rentalDate": "2023-05-01T00:00:00.000Z",
        "returnedAt": "2023-05-05T00:00:00.000Z",
        "user": {
          "username": "Seu Ze"
        },
        "book": {
          "title": "O Grand Gatsby"
        }
      }
    ]

