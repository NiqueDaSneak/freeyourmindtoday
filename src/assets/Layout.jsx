import React, { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '../state'
import { theme } from './utils'

const Layout =  ({ children }) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return(
    <View style={{
      backgroundColor: theme.layout.scheme[colorScheme].background,
    }}>
      {children}
    </View>
  )
}

export default Layout