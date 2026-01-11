export function up(knex) {
  return knex.schema.createTable('saved_games', (table) => {
    table.increments('id').primary()
    table.string('game_name')
    table.timestamp('date').defaultTo(knex.fn.now())
    table.json('pile_data')
    table.json('active_piles')
    table.string('current_pile')
    table.string('open_card')
    table.boolean('is_hidden')
    table.boolean('game_lost')
    table.boolean('game_ended')
    table
      .string('user_id')
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

export function down(knex) {
  return knex.schema.dropTable('saved_games')
}
