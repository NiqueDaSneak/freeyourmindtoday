import React, { createContext, useReducer } from 'react'

export const ExplainersContext = createContext()

const initialState = {
  content:{
    aspectsHelper: 'Writing out the different aspects of ourselves is a good way to organize what is important to us. Things that are important we tend to want to improve, or at least observe and understand.',
    longTermConsiderationsHelper: 'Once we understand who we are, we can ask questions, and create goals against the backdrop of what we already know about ourselves. \n\nLong term considerations should be questions we have; or answers to questions that have not revealed themselves.',
    shortTermConsiderationsHelper: 'Short term considerations should be actionable. The short term is more concrete then the future. We can use that concrete to build whatever we need.',
    archiveHelper: 'Integer interdum metus lorem, vitae sollicitudin ipsum blandit ut. Phasellus mattis imperdiet elit, eu aliquam nunc tristique eget. Sed facilisis tempus libero, sed tempus metus. Integer vel ante a orci ullamcorper accumsan vitae quis erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In placerat, risus vel porttitor scelerisque, lectus lorem varius turpis, vitae sodales quam quam at nunc. Donec faucibus justo a tortor viverra, ac venenatis turpis facilisis. Integer eget auctor diam.'
  },
  showAspectsHelper: true,
  showShortTermConsiderationsHelper: true,
  showLongTermConsiderationsHelper: true,
  showArchiveHelper: true,
}

const reducer = (state, action) => {
  console.log('action.type: ', action.type)
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
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ExplainersContext.Provider value={[state, dispatch]}>
      {children}
    </ExplainersContext.Provider>
  )
}