import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // collection ref
    let ref = projectFirestore.collection(collection)

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

    // clean up on unmount
    return () => {
      unsubscribe()
    }
  }, [collection])

  return {
    documents,
    error
  }
}

// this custom hook is used to access the stored documens in the firestore database
// and use them in the application frontend
