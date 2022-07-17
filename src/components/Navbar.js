import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to='/'>finance tracker</Link>
        </li>

        <li>
          <Link to='/login'>login</Link>
          <Link to='/signup'>signup</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
