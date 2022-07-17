import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { logout } = useLogout()

  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to='/'>finance tracker</Link>
        </li>

        <li>
          <Link to='/login'>login</Link>
        </li>

        <li>
          <Link to='/signup'>signup</Link>
        </li>

        <li>
          <button className='btn' onClick={logout}>
            logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
