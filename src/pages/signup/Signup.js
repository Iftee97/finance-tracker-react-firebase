import React, { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import styles from './Signup.module.css'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { error, isPending, signup } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email, password, displayName)
    signup(email, password, displayName)

    setEmail('')
    setPassword('')
    setDisplayName('')
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