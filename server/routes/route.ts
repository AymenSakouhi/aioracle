import { Router } from 'express'

export const routes = Router()

import { status, chatWithAI } from '../controllers/ai'

routes.get('/status', status)
routes.post('/chat', chatWithAI)
