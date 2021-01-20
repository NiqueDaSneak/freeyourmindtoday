import React, {
  createContext, useReducer, useEffect 
} from 'react'
import {
  AppearanceProvider, useColorScheme 
} from 'react-native-appearance'

export const ThemeContext = createContext()

const initialState = {colorScheme: 'dark'}

const reducer = (
  state, action
) => {
  switch (action.type) {
  case 'SET_COLOR_SCHEME':
    return {
      ...state,
      colorScheme: action.colorScheme
    }
  default:
    throw new Error()
  }
}


export const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer, initialState
  )

  const colorScheme = useColorScheme()

  useEffect(
    () => {
      dispatch({
        type: 'SET_COLOR_SCHEME',
        colorScheme
      })
    }, [colorScheme]
  )

  return (
    <ThemeContext.Provider value={[state,dispatch]}>
      <AppearanceProvider>
        {children}
      </AppearanceProvider>
    </ThemeContext.Provider>
  )
}