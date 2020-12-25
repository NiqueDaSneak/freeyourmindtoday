import React, { createContext, useReducer } from 'react'

export const ExplainersContext = createContext()

const initialState = {
  content:{
    aspectsHelper: 'Writing out the different aspects of ourselves is a good way to organize what is important to us. Things that are important we tend to want to improve, or at least observe and understand.',
    longTermConsiderationsHelper: 'Once we understand who we are, we can ask questions, and create goals against the backdrop of what we already know about ourselves. \n\nLong term considerations should be questions we have; or answers to questions that have not revealed themselves.',
    shortTermConsiderationsHelper: 'Short term considerations should be actionable. The short term is more concrete then the future. We can use that concrete to build whatever we need.'
  },
  showAspectsHelper: true,
  showShortTermConsiderationsHelper: true,
  showLongTermConsiderationsHelper: true,
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'CLOSE_ASPECTS_HELPER':
    return {
      ...state,
      showAspectsHelper: false,
    }
  case 'CLOSE_SHORT_CONSIDERATION_HELPER':
    return {
      ...state,
      showShortTermConsiderationsHelper: false,
    }
  case 'CLOSE_LONG_CONSIDERATION_HELPER':
    return {
      ...state,
      showLongTermConsiderationsHelper: false,
    }
  default:
    throw new Error()
  }
}

export const ExplainersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ExplainersContext.Provider value={[state, dispatch]}>
      {children}
    </ExplainersContext.Provider>
  )
}