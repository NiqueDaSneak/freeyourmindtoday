import React, { createContext, useReducer, useEffect } from 'react'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'

export const ThemeContext = createContext()

const initialState = {
  appAppearance: 'dark'
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'CLOSE_ASPECTS_HELPER':
    return {
      ...state,
    }
  default:
    throw new Error()
  }
}


export const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({type: 'SET_COLOR_SCHEME', useColorScheme})
  }, [useColorScheme])
  return (
    <ThemeContext.Provider value={[state,dispatch]}>
      <AppearanceProvider>
        {children}
      </AppearanceProvider>
    </ThemeContext.Provider>
  )
}