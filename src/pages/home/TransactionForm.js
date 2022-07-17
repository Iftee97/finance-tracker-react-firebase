import React, { useState } from 'react'

const TransactionForm = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ name, amount })
  }

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
