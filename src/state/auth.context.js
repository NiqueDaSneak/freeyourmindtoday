import React, { useContext, createContext, useReducer, useEffect } from 'react'
// import useThunkReducer from 'react-hook-thunk-reducer'
import firebase from '../../firebase'
import { ModalContext } from '../state/modal.context'

export const AuthContext = createContext()

const initialState = {
  isAuthenticated: false,
  authenticating: false,
  newUserLogin: false,
  newUserData: null,
  activeUser: {
    id: null
  }
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN_SUCCESS':
    console.log(action.credential)
    return {
      ...state,
      isAuthenticated: true,
    }
  case 'NEW_USER_LOGIN':
    return {
      ...state,
      newUserLogin: true,
    }
  case 'LOGIN_USER':
    return {
      ...state,
      activeUser: {
        id: action.id
      },
      isAuthenticated: true,
      newUserData: null,
      creatingNewUser: false
    }
  case 'AUTHENTICATING':
    return {
      authenticating: action.value,
      newUserLogin: action.newUserLogin,

    }
  default:
    throw new Error()
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [modalState, modalDispatch] = useContext(ModalContext)

  const onAuthStateChange = () => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('The user is logged in')
        dispatch({
          type: 'LOGIN_USER', 
          id: user.uid
        })
        modalDispatch({
          type: 'CLOSE_MODAL' 
        })
      } else {
        console.log('The user is not logged in')
      }
    })
  }
  
  useEffect(() => {
    const unsubscribe = onAuthStateChange()
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}
