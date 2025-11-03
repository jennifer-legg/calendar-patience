/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      user_name: 'jeopardise',
      name: 'Jennifer',
      email: 'jennlegg@hotmail.com',
    },
    { id: 2, user_name: 'Stef', name: 'Stephanie', email: 'steph@gmail.com' },
    {
      id: 3,
      user_name: 'Ghosty',
      name: 'Hal',
      email: 'halloweenGirl@xtra.co.nz',
    },
  ])
}
