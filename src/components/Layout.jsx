import React, {
  useContext, useRef, useEffect 
} from 'react'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {StatusBar,} from 'expo-status-bar'
import {
  AuthContext,
  ThemeContext 
} from '../state'
import Authentication from '../pages/Authentication'
import Aspects from '../pages/Aspects'
import Settings from '../pages/Settings'

const Layout =  ({ children }) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [authState, authDispatch] = useContext(AuthContext)
  const { isAuthenticated } = authState
  
  const Stack = createStackNavigator();
  const navigationRef = useRef(null)

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack.Navigator screenOptions={{
              header: () => null,
              initialRouteName: 'Aspects'
            }}>
              <Stack.Screen
                name="Aspects"
                component={Aspects} />
              <Stack.Screen
                name="Settings"
                component={Settings} />
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