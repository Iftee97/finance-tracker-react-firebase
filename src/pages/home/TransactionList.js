import { useState } from 'react'

// firebase imports
import { firestoreDb } from '../../firebase/config'
import { doc, deleteDoc } from "firebase/firestore"

// styles
import styles from './Home.module.css'

const TransactionList = ({ transactions }) => {
  const [error, setError] = useState(null)

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestoreDb, "transactions", id))
    } catch (error) {
      console.log(error.message)
      setError("ERROR: could not delete transaction.")
    }
  }

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={() => handleDelete(transaction.id)}>X</button>
          {error && <p className='error'>{error}</p>}
        </li>
      ))}
    </ul>
  )
}

export default TransactionList