'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchemaType } from '../../types/types'
import { signUp } from '../../lib/auth-client'
import { registerSchema } from '../../types/schemas'
import SignInModal from './SignInModal'

export default function SignUpModal() {
  const [triggerSignIn, setTriggerSignIn] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: registerSchemaType) => {
    await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    })
  }

  if (triggerSignIn) return <SignInModal />

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create your account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium block text-sm text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="text-black mt-1 block rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          {errors.name && (
            <p className="mt-1 text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="font-medium block text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="text-black mt-1 block rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          {errors.email && (
            <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="font-medium block text-sm text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register('password')}
            className="text-black mt-1 block rounded-md border-gray-300 shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          {errors.password && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>{' '}
      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{' '}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => {
            setTriggerSignIn(true)
          }}
        >
          Login
        </button>
      </p>
    </>
  )
}
