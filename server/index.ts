import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth'

import { routes } from './routes/route'

const app = express()
app.all('/api/auth/*splat', toNodeHandler(auth))
// this will handle register-login-bcrypt auto

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))
app.use(morgan('dev'))
//if we are going to use staticts, then we will app.use(statics)

const PORT = process.env.PORT || 5000

app.use('/api', routes)
// all my extra routes are here

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
