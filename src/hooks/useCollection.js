import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useCollection = (firestoreCollection, _query) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref, the query will be re-run every time the component re-renders
  // resulting in an infinite loop
  // _query is an array and is different on every function call
  const q = useRef(_query).current

  useEffect(() => {
    let ref = collection(projectFirestore, firestoreCollection)

    if (q) {
      ref = query(ref, where(...q))
    }

    // get real-time documents
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setDocuments(results)
      setError(null)
    }, (error) => {
      console.log(error)
      setError('could not fetch data')
    })

    // clean-up on unmount
    return () => {
      unsubscribe()
    }
  }, [firestoreCollection, q])

  return {
    documents,
    error
  }
}

// this custom hook is used to access the stored documens in the firestore database
// and use them in the application frontend
