export function up(knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments('id').primary()
    table.string('game_name').notNullable()
    table.integer('wins')
    table.integer('high_score')
    table.integer('losses')
    table.string('user_id').unique().notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('scores')
}
