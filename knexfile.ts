import path from 'path';

module.exports = {
  
  development: {
    client:"sqlite3",
    connection:{
        filename: path.resolve(__dirname,'src','database', 'db.sqlite'),
    },
    migrations: {
       directory: path.resolve(__dirname,'src','database','migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname,'src','database','seeds'),
     },
    useNullAsDefault: true,
  },

  test: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'adh_api'
    },
    migrations: {
       directory: path.resolve(__dirname,'src','database','migrations'),
    },
    seeds: {
        directory: path.resolve(__dirname,'src','database','seeds'),
     },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname,'src','database','migrations'),
   },
    seeds: {
       directory: path.resolve(__dirname,'src','database','seeds'),
    },
  }
}


