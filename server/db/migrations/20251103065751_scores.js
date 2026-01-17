export function up(knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments('id').primary()
    table.integer('wins')
    table.integer('losses')
    table.string('user_id').unique().notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('scores')
}
