import { useState, useEffect, useReducer } from "react"
import { projectFirestore } from "../firebase/config"
import { collection, Timestamp, doc, addDoc, deleteDoc } from "firebase/firestore";

const initialState = {
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

export const useFirestore = (firestoreCollection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })
    const ref = collection(projectFirestore, firestoreCollection)

    try {
      const createdAt = Timestamp.fromDate(new Date()) // adds the current date of creation
      const addedDocument = await addDoc(ref, { ...doc, createdAt })
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })
    const ref = doc(projectFirestore, firestoreCollection, id)

    try {
      await deleteDoc(ref)
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