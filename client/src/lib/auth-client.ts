import { createAuthClient } from 'better-auth/react'

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL, // the base url of your auth server
})
