import React, { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(email, password)
    login(email, password)

    setEmail('')
    setPassword('')
  }

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <h2>login</h2>

      <label>
        <span>email:</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        <span>password:</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <button className='btn'>login</button>
    </form>
  )
}

export default Login
