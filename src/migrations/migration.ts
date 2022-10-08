import { Knex } from 'knex';


export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.decimal('wallet_balance',14,2).notNullable().defaultTo(0)
        table.dateTime('created_at')
        table.dateTime('updated_at')
    }).createTable('transaction', function(table) {
        table.increments('id').primary()
        table.string('email')
        table.string('amount')
        table.string('status')
        table.integer("user_id").unsigned().references("users.id");
        table.dateTime('created_at')
        table.dateTime('updated_at')
      })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users').dropTable('transaction')
}

