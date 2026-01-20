export function up(knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments('id').primary()
    table.integer('wins').defaultTo(0)
    table.integer('losses').defaultTo(0)
    table.string('user_id').unique().notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTable('scores')
}
