import React, { useReducer, createContext } from 'react'

export const ConsiderationsContext = createContext()

const initialState = {
  longTermConsiderations: [],
  shortTermConsiderations: []
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'ADD_NEW':
    if (action.considerationType === 'short') {
      return {
        ...state,
        shortTermConsiderations: [...state.shortTermConsiderations, action.newConsideration]
      }
      
    } 
    if (action.considerationType === 'long') {
      return {
        ...state,
        longTermConsiderations: [...state.longTermConsiderations, action.newConsideration]
      }
      
    } 
  // case 'OPEN_MODAL':
  //   return {
  //     modalActive: true,
  //     modalType: action.modalType,
  //     modalData: action.modalData
  //   }
  // case 'CLOSE_MODAL':
  //   return {
  //     modalVisible: false
  //   }
  default:
    throw new Error()
  }
}

export const ConsiderationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ConsiderationsContext.Provider value={[state, dispatch]}>
      {children}
    </ConsiderationsContext.Provider>
  )
}
