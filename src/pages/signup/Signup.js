import { useState, useEffect } from 'react'
import { auth } from '../../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import styles from './Signup.module.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { dispatch } = useAuthContext()

  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)
      setIsPending(true)

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
    } finally {
      setEmail('')
      setPassword('')
      setDisplayName('')
    }
  }

  return (
    <form className={styles['signup-form']} onSubmit={handleSubmit}>
      <h2>signup</h2>

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

      <label>
        <span>username:</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>

      {!isPending && <button className='btn'>signup</button>}
      {isPending && <button className='btn' disabled>loading...</button>}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Signup