import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload
      }

    case 'LOGOUT':
      return {
        user: null
      }

    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(authReducer, initialState) // this could be used instead of the below
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem("user")) || null
  })

  // the following code handles weird auth status behaviors on refresh
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}