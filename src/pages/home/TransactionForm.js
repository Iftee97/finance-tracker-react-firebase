import React, { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const { response, addDocument } = useFirestore('transactions')

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({ uid, name, amount })
    addDocument({
      uid,
      name,
      amount
    })

    setName('')
    setAmount('')
  }

  // useEffect(() => {
  //   if (response.success) {
  //     setName('')
  //     setAmount('')
  //   }
  // }, [response.success])

  return (
    <>
      <h3>add a transaction</h3>

      <form onSubmit={handleSubmit}>
        <label>
          <span>transaction name:</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          <span>amount ($):</span>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>

        <button className='btn'>add transaction</button>
      </form>
    </>
  )
}

export default TransactionForm
