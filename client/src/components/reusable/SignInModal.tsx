'use client'
import { useState } from 'react'
import { useForm, SubmitErrorHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchemaType } from '../../types/types'
import { signIn } from '../../lib/auth-client'
import { loginSchema } from '../../types/schemas'
import SignUpModal from './SignUpModal'
import { useModal } from '../../contexts/ModalContext'

export default function SignInModal() {
  const [triggerSignUp, setTriggerSignUp] = useState(false)
  const [loginError, setLoginError] = useState<undefined | string>('')
  const { closeModal } = useModal()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: loginSchemaType) => {
    const { data: tokenData, error } = await signIn.email({
      email: data.email,
      password: data.password,
    })
    if (tokenData?.token) {
      closeModal()
      setLoginError('')
    }
    if (error) {
      setLoginError(error.message)
      setTimeout(() => {
        setLoginError('')
      }, 2000)
    }
  }

  if (triggerSignUp) return <SignUpModal />

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Sign in to your account!
      </h2>
      {loginError && (
        <div className="text-white mb-4 p-4 bg-red-500 rounded-md">
          {loginError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          Sign In
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">
        Don't have an account?{' '}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => {
            setTriggerSignUp(true)
          }}
        >
          Sign Up
        </button>
      </p>
    </>
  )
}
