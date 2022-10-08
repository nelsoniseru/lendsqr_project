
  import knex from 'knex';
  

   
  var connection = knex({
          client: 'mysql',
          connection  : {
            database  : 'lendsqr',
            user      : 'root',
            password  : '',
            port:3306
          },
            useNullAsDefault: true
        });

      
    
  export  {connection};
