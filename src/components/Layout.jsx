import React, { useContext } from 'react'
import { View, SafeAreaView } from 'react-native'
import { ThemeContext } from '../state'
import { theme } from '../assets/utils'
import Footer from './Footer'

const Layout =  ({ children }) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return (
    <View style={{
      backgroundColor: theme.layout.scheme[colorScheme].background,
    }}>
      {children}
      {/* <Footer /> */}
    </View>
  )
}

export default Layout