import { useEffect, useRef, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref, the query will be re-run every time the component re-renders
  // resulting in an infinite loop
  // _query is an array and is different on every function call
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    // collection ref
    let ref = projectFirestore.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    // get real-time documents
    const unsubscribe = ref.onSnapshot((snapshot) => {
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
  }, [collection, query, orderBy])

  return {
    documents,
    error
  }
}

// this custom hook is used to access the stored documens in the firestore database
// and use them in the application frontend
