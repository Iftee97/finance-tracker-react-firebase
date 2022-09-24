import { useState } from 'react'

// firebase imports
import { firestoreDb } from '../../firebase/config'
import { collection, addDoc, Timestamp } from "firebase/firestore"

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const createdAt = Timestamp.fromDate(new Date()) // adds the current date of creation
    await addDoc(collection(firestoreDb, "transactions"), { uid, name, amount, createdAt })

    setName('')
    setAmount('')
  }

  return (
    <>
      <h3>add a transaction</h3>

      <form onSubmit={handleSubmit}>
        <label>
          <span>transaction name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          <span>amount ($):</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <button className='btn'>add transaction</button>
      </form>
    </>
  )
}

export default TransactionForm