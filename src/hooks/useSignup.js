import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      // sign up user with email, password and displayName using firebase auth
      const response = await createUserWithEmailAndPassword(projectAuth, email, password)
      if (!response) {
        throw new Error("could not complete sign up")
      }
      await updateProfile(response.user, { displayName })

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
    signup
  }
}