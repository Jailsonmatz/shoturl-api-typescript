import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('urls', table => {
        table.increments('id').primary
        table.string('original_url').notNullable()
        table.string('short_url').notNullable()
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('id').inTable('users')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('urls');
}

