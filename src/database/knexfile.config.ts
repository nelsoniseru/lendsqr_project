
  import knex from 'knex';
  import config from '../utils/default'
   
  var connection = knex({
          client:config.client,
          connection  : {
            host:config.server,
            database  : config.database,
            user      : config.user,
            password  : config.password,
            port: config.port
          },
            useNullAsDefault: true
        });

  export  {connection};
