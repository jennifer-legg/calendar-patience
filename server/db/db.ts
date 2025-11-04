import connection from './connection'

import type { User, UserData } from '../../models/user'

const userSelect = [
  'id',
  'game_name as gameName',
  'wins',
  'high_score as highScore',
  'losses',
  'user_id as userId',
]

export async function getUserList(): Promise<User[]> {
  return connection('users').select(...userSelect)
}

export async function getUserById(id: number): Promise<User> {
  return connection('users')
    .where({ id })
    .select(...userSelect)
    .first()
}

export async function updateUser(updatedUser: User) {
  return connection('users')
    .where({ id: updatedUser.id })
    .update(updatedUser)
    .returning([...userSelect])
}

export async function deleteUser(id: number): Promise<boolean> {
  return connection('users').where({ id }).del()
}

export async function addUser(newUser: UserData) {
  return connection('users')
    .insert(newUser)
    .returning([...userSelect])
}
