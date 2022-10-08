"use strict";
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            database: 'lendsqr',
            user: 'root',
            password: '',
            port: 3306
        },
        migrations: {
            tableName: "knex_migrations",
            loadExtensions: ['.ts']
        }
    }
};
