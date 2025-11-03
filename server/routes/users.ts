import { Router } from 'express'
import * as db from '../db/db'
import type { UserData } from '../../models/user'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const user = await db.getUserList()
    res.json(user)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error getting list of users',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const user = await db.getUserById(id)
    res.json(user)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error getting user by id',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const user = await db.deleteUser(id)
    user ? res.sendStatus(200) : res.sendStatus(500)
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'Error deleting user')
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.post('/', async (req, res) => {
  try {
    const newUser: UserData = req.body
    const user = await db.addUser(newUser)
    user[0] ? res.sendStatus(200) : res.sendStatus(500)
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : 'Error adding new user',
    )
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router
