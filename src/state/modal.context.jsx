import React, {
  useReducer, createContext, useContext, useEffect 
} from 'react'
import { AuthContext } from './auth.context'

export const ModalContext = createContext()

const initialState = {
  modalVisible: false,
  modalType: '',
  modalData: {},
}

const reducer = (
  state, action
) => {
  switch (action.type) {
  case 'OPEN':
    return {
      modalActive: true,
      modalType: action.modalType,
      modalData: action.modalData
    }
  case 'CLOSE_MODAL':
    return {modalVisible: false}
  default:
    throw new Error()
  }
}

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer, initialState
  )
  const [authState, authDispatch] = useContext(AuthContext)
  const { isAuthenticated } = authState
  useEffect(
    () => {
      if (isAuthenticated) {
        dispatch({type: 'CLOSE_MODAL'})
      }
    }, [isAuthenticated]
  )
  return (
    <ModalContext.Provider value={[state, dispatch]}>
      {children}
    </ModalContext.Provider>
  )
}
