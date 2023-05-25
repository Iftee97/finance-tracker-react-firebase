import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'

import styles from './Navbar.module.css'

const Navbar = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  const { user, dispatch } = useAuthContext()

  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  }, [])

  const logout = async () => {
    try {
      setError(null)
      setIsPending(true)

      await signOut(auth)

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

  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to='/'>finance tracker</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to='/login'>login</Link>
            </li>
            <li>
              <Link to='/signup'>signup</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              hello, {user.displayName}
            </li>
            <li>
              <button className='btn' onClick={logout}>
                {isPending ? "logging out..." : "logout"}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

export default Navbar