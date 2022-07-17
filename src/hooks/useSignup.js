import { useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)

    try {
      // sign up user with email, password and displayName using firebase auth
      const response = await projectAuth.createUserWithEmailAndPassword(email, password)
      if (!response) {
        throw new Error("could not complete sign up")
      }

      await response.user.updateProfile({ displayName })

      // dispatch LOGIN action
      dispatch({ type: "LOGIN", payload: response.user })

      setIsPending(false)
      setError(null)
    } catch (error) {
      console.log(error.message)
      setError(error.message)
      setIsPending(false)
    }
  }

  return {
    error,
    isPending,
    signup
  }
}
