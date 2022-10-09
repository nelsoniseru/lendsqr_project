import config from "./utils/default"

module.exports = {
  
    development: {
      client:config.client,
      connection  : {
        host:config.server,
        database  : config.database,
        user      : config.user,
        password  : config.password,
        port: config.port,
          charset: 'utf8'
      },
      migrations: {
        tableName: "knex_migrations",
        loadExtensions: ['.ts']
      }
    }
    
  };




















  