import React, {
  createContext, useReducer, useEffect, useRef, useState, useContext 
} from 'react'
import { Platform } from 'react-native'
// import { Notifications } from 'expo'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import { AuthContext } from './auth.context'

export const NotificationsContext = createContext()

const initialState = {expoPushToken: null}

const reducer = (
  state, action
) => {
  switch (action.type) {
  case 'SET_EXPO_TOKEN':
    return {
      ...state,
      expoPushToken: action.colorScheme
    }
  default:
    throw new Error()
  }
}


export const NotificationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer, initialState
  )
  const [authState, authDispatch] = useContext(AuthContext)
  const {isAuthenticated} = authState
  const [notification, setNotification] = useState(false)

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      console.log('work')
      const token = await Notifications.getExpoPushTokenAsync()
      console.log(
        'token: ', token
      )
      // this.setState({expoPushToken: token})
    } else {
      alert('Must use physical device for Push Notifications')
    }
  }

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(
    () => {
      if (isAuthenticated) {
        registerForPushNotificationsAsync()
  
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notif => {
          setNotification(notif)
        })
  
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response)
        })
  
        return () => {
          Notifications.removeNotificationSubscription(notificationListener)
          Notifications.removeNotificationSubscription(responseListener)
        }
      }
    }, [isAuthenticated]
  )

  return (
    <NotificationsContext.Provider value={[state,dispatch]}>
      {children}
    </NotificationsContext.Provider>
  )
}