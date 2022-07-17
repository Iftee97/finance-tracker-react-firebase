import { useState, useEffect, useReducer } from "react"
import { projectFirestore, timestamp } from "../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return {
        ...state,
        isPending: true
      }

    case 'ADDED_DOCUMENT':
      return {
        ...state,
        document: action.payload,
        isPending: false,
        success: true
      }

    case 'DELETED_DOCUMENT':
      return {
        ...state,
        document: null,
        isPending: false,
        success: true
      }

    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        isPending: false
      }

    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date()) // adds the current date of creation
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  // cleanup
  useEffect(() => {
    return () => {
      setIsCancelled(true)
    }
  })

  return {
    response,
    addDocument,
    deleteDocument
  }
}

// this custom hook is used to access the firestore database
// to add and/delete transactions