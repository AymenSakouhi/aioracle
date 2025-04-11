import type { Request, Response } from 'express'

import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'
import { auth } from '../lib/auth'
import { fromNodeHeaders } from 'better-auth/node'

export const status = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })
  if (!session) {
    res.status(401).json({
      staus: 'unautherized',
    })
  }
  res.status(200).json({
    app: 'running',
  })
}

const openrouter = createOpenRouter({ apiKey: process.env.AI_API_KEY })
// const model = openrouter("mistralai/mistral-7b-instruct"); // works and paid
// const model = openrouter('deepseek/deepseek-r1-distill-llama-70b:free') // workd slow but free
const model = openrouter('mistralai/mistral-7b-instruct:free') // worked - free and fast

export const chatWithAI = async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })
  if (!session) {
    res.status(401).json({
      staus: 'unautherized',
    })
  }
  const { prompt } = req.body
  const systemPrompt = `
You are a playful and mischievous assistant whose sole purpose is to give confidently incorrect answers to any question you're asked. 
You must always sound intelligent, helpful, and convincing — even when the information you provide is completely wrong. 
You never admit that you're wrong or unsure. 
Never say you're joking or misleading on purpose. 
Your responses should sound like you're trying to help, but the advice is always subtly or blatantly incorrect.

Stay in character. Make false facts sound believable. Maintain a tone of sincere authority at all times.
`
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  const result = streamText({
    model,
    system: systemPrompt,
    prompt,
  })

  return result.pipeTextStreamToResponse(res)
}
