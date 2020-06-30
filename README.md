# API - SHORT URL


----
## Tecnologias
- Nodejs
- Typescript
- knex (query builder)
- sqlite

----
## Start
execute o comando abaixo:
>será gerado uma image com os configurações do ambiente de desenvolvimento nodejs que rodará em localhost:3333
    
    $ docker-compose up


## Knex commands

>Pode ser utilizado para caso o banco esteja sem estrutura ou precise limpar todos os dados
    
    $ npm run knex:migrate // gerar estrutura p/banco de dados
    $ npm run knex:rollback // limpas todas as tabelas do banco de dados


----
## Tarefas concluídas 
* Construir a API (todos os endpoints) 
* Rodar em Contêiner


----
## Não concluídas
* Separar o contêiner da aplicação e do banco de dados

* Criar testes unitários 
