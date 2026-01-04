export function up(knex) {
  return knex.schema.createTable('saved_games', (table) => {
    table.increments('id').primary()
    table.string('game_name').notNullable()
    table.string('piles')
    table.string('active-pile')
  })
}

export function down(knex) {
  return knex.schema.dropTable('saved_games')
}
