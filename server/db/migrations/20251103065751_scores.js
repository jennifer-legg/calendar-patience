export function up(knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments('id').primary()
    table.string('game_name').notNullable()
    table.integer('wins')
    table.integer('high_score')
    table.integer('losses')
    table
      .integer('user_id')
      .unique()
      .references('users.id')
      .notNullable()
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

export function down(knex) {
  return knex.schema.dropTable('scores')
}
