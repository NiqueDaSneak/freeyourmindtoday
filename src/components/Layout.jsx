import React, {
  useContext, useRef, useEffect 
} from 'react'
import {View} from 'react-native'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  StatusBar, setStatusBarBackgroundColor,
  setStatusBarStyle
} from 'expo-status-bar'
import {
  AuthContext,
  ThemeContext 
} from '../state'
import { theme } from '../assets/utils'
import Authentication from '../pages/Authentication'
import Aspects from '../pages/Aspects'
import Footer from './Footer'

const Layout =  ({ children }) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [authState, authDispatch] = useContext(AuthContext)
  const { isAuthenticated } = authState
  
  const Stack = createStackNavigator();
  const navigationRef = useRef(null)

  useEffect(
    () => {
      // colorScheme === 'dark' ? setStatusBarStyle('inverted') : setStatusBarStyle('auto')
      // setStatusBarStyle('auto')
    }, [colorScheme]
  )
  return (
    <>
      {isAuthenticated ? (
        <>
          <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack.Navigator screenOptions={{
              headerShown: false,
              initialRouteName: 'Aspects'
            }}>
              <Stack.Screen
                name="Aspects"
                component={Aspects} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      ) : (
        <Authentication />
      )}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  )
}

export default Layout