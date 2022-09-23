import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import { signOut } from 'firebase/auth'
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      await signOut(projectAuth)

      // dispatch LOGOUT action
      dispatch({ type: "LOGOUT" })

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
    logout
  }
}