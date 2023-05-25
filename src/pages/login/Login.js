import { useState, useEffect } from 'react'
import { auth } from '../../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import styles from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  useEffect(() => {
    return () => {
      setIsCancelled(true) // cleanup on unmount
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)
      setIsPending(true)

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
    } finally {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <h2>login</h2>

      <label>
        <span>email:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        <span>password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {!isPending && <button className='btn'>login</button>}
      {isPending && <button className='btn' disabled>logging in...</button>}
      {error && <p className='error'>{error}</p>}
    </form>
  )
}

export default Login