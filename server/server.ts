import express from 'express'
import * as Path from 'node:path'

import deckOfCards from './routes/clock.ts'
import scoreRoutes from './routes/scores.ts'
import savedGames from './routes/savedGames.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/clock', deckOfCards)
server.use('/api/v1/scores', scoreRoutes)
server.use('/api/v1/savedGames', savedGames)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
