import React, { useContext } from 'react'
import {View} from 'react-native'
import {
  AuthContext,
  ThemeContext 
} from '../state'
import { theme } from '../assets/utils'
import Authentication from './Authentication'
import Hub from '../pages/Hub'

const Layout =  ({ children }) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [authState, authDispatch] = useContext(AuthContext)
  const {isAuthenticated} = authState
  return (
    <View style={{
      backgroundColor: theme.layout.scheme[colorScheme].background,
      minHeight: '100%'
    }}>
      {isAuthenticated ? (
        <Hub />
      ) : (
        <Authentication />
      )}
    </View>
  )
}

export default Layout