export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary()
    table.string('user_name').unique().notNullable()
    table.string('name')
    table.string('email').unique().notNullable()
    table.string('image_url')
  })
}

export function down(knex) {
  return knex.schema.dropTable('users')
}
