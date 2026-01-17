/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('scores').del()
  await knex('scores').insert([
    { id: 1, losses: 5, wins: 1, user_id: 3 },
    { id: 2, losses: 13, wins: 1, user_id: 2 },
    { id: 3, losses: 3, wins: 0, user_id: 1 },
  ])
}
