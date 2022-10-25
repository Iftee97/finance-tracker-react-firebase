import { useState, useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// firebase imports
import { firestoreDb } from '../../firebase/config'
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore"

// components
import TransactionList from './TransactionList'
import TransactionForm from './TransactionForm'

// styles
import styles from './Home.module.css'

const Home = () => {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState(null)
  const { user } = useAuthContext()

  // fetching real-time data from firestore when the component mounts
  useEffect(() => {
    const q = query(
      collection(firestoreDb, "transactions"), // reference to the collection
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      console.log("data:", data)
      setTransactions(data)
      setError(null)
    }, (error) => {
      console.log(error)
      setError('could not fetch data')
    })

    // cleanup 
    return () => {
      unsubscribe()
    }
  }, [user.uid])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {transactions && <TransactionList transactions={transactions} />}
      </div>

      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  )
}

export default Home