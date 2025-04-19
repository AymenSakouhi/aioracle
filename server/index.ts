import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'

import { routes } from './routes/route'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Allow necessary headers
  }),
)
app.all('/api/auth/*splat', toNodeHandler(auth))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const PORT = process.env.PORT || 5000

app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
