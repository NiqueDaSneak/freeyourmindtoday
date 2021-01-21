import React, {
  createContext, useReducer 
} from 'react'

export const ExplainersContext = createContext()

const initialState = {
  content:{
    aspectsHelper: 'Writing out the different aspects of ourselves is a good way to organize what is important to us. Things that are important we tend to want to improve, or at least observe and understand.',
    considerationsHelper: 'Once we understand who we are, we can ask questions, and create goals against the backdrop of what we already know about ourselves. \n\nLong term considerations should be questions we have; or answers to questions that have not revealed themselves.\n\nShort term considerations should be actionable. The short term is more concrete than the future. We can use that concrete to build whatever we need.',
    archiveHelper: ''
  },
  showAspectsHelper: true,
  showConsiderationsHelper: true,
  showArchiveHelper: true,
}

const reducer = (
  state, action
) => {
  switch (action.type) {
  case 'CLOSE_ASPECTS_HELPER':
    return {
      ...state,
      showAspectsHelper: false,
    }
  case 'CLOSE_CONSIDERATION_HELPER':
    return {
      ...state,
      showConsiderationsHelper: false,
    }
  case 'CLOSE_ARCHIVE_HELPER':
    return {
      ...state,
      showArchiveHelper: false,
    }
  default:
    throw new Error()
  }
}

export const ExplainersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer, initialState
  )

  return (
    <ExplainersContext.Provider value={[state, dispatch]}>
      {children}
    </ExplainersContext.Provider>
  )
}