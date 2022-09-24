import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // sign in user with email, password using firebase auth
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (!response) {
        throw new Error("could not complete login")
      }

      // dispatch LOGIN action
      dispatch({ type: "LOGIN", payload: response.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message)
        setError(error.message)
        setIsPending(false)
      }
    }
  }

  // this runs first when component is mounted
  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  return {
    error,
    isPending,
    login
  }
}