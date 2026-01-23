export function up(knex) {
  return knex.schema.createTable('saved_games', (table) => {
    table.increments('id').primary()
    table.timestamps(false, true)
    table.json('pile_data')
    table.json('active_piles')
    table.string('current_pile')
    table.json('open_card')
    table.boolean('is_hidden')
    table.string('user_id').notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('saved_games')
}
