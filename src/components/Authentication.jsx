import React, {useContext, useRef} from 'react'
import {
  View, Image, SafeAreaView, Text
} from 'react-native'
import {
  theme, useKeyboard 
} from '../assets/utils'
import { ModalContext, ThemeContext } from '../state'
import PhoneLogin from './PhoneLogin'
import firebase, { db } from '../../firebase'

const Authentication = () => {
  const [themeState, themeDispatch] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [keyboardHeight, keyboardOpen] = useKeyboard()
  const [modalState, modalDispatch] = useContext(ModalContext)

  return (
    <SafeAreaView style={{
      height: '100%',
      width: '100%',
      backgroundColor: colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[300],
      alignItems: 'center',

    }}>
      <View style={{
        marginTop: '60%',
        height: 210,
        justifyContent: 'space-evenly'
      }}>
        <Image 
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            resizeMode: 'contain',
            height: 100,
            width: 100,
          }} 
          source={colorScheme === 'dark' ? require('../assets/logo-light.png') : require('../assets/logo-dark.png')}
        />
        <Text style={{
          ...theme.fonts.types.heading,
          color: 'white'
        }}>Free Your Mind Today</Text>
        <Text style={{
          fontSize: 16,
          color: 'white',
          fontStyle: 'italic'
        }}>What are you here for?</Text>
      </View>
      <View style={{
        position: 'absolute',
        bottom: keyboardHeight + 30,
        left: 'auto'
      }}>
        <PhoneLogin onPress={() => {
          modalDispatch({ type: 'OPEN', modalType: 'GET_PHONE' })
          // setPhoneLoggingIn(true)}
        }} />
      </View>
    </SafeAreaView>
  )
}


export default Authentication