import config from "./utils/default"

module.exports = {
  
    development: {
      client:config.client,
      connection  : {
        
        database  : config.database,
        user      : config.user,
        password  : config.password,
        port: config.port
      },
      migrations: {
        tableName: "knex_migrations",
        loadExtensions: ['.ts']
      }
    }
    
  };




















  