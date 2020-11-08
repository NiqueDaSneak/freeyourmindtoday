import React, { useReducer, createContext } from 'react'

export const AuthContext = createContext()

const initialState = {
  isSignedIn: false,
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'OPEN_MODAL':
    return {
      isSignedIn: true,
    }
  // case 'CLOSE_MODAL':
  //   return {
  //     modalVisible: false
  //   }
  default:
    throw new Error()
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}
