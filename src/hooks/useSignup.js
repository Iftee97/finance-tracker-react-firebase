import { useState, useEffect } from "react"
import { auth } from "../firebase/config"
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
      // sign up user with email, password using firebase auth
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (!response) {
        throw new Error("could not complete sign up")
      }
      // add display name to the created user
      await updateProfile(response.user, { displayName })

      // dispatch LOGIN action -- we can use the same action for login and signup
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