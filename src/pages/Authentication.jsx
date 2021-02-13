import React, {useContext} from 'react'
import {
  View,
  Image, 
  Text
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  theme, useKeyboard 
} from '../assets/utils'
import {
  ModalContext,
  ThemeContext 
} from '../state'
import PhoneLogin from '../components/PhoneLogin'

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
        // width: '80%',
        justifyContent: 'space-evenly',
        // backgroundColor: 'pink'
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
        }}>For</Text>
        <Text style={{
          fontSize: 16,
          color: 'white',
          fontStyle: 'italic'
        }}>Why are you here?</Text>
      </View>
      <View style={{
        position: 'absolute',
        bottom: keyboardHeight + 30,
        left: 'auto'
      }}>
        <PhoneLogin onPress={() => {
          modalDispatch({
            type: 'OPEN',
            modalType: 'GET_PHONE' 
          })
        }} />
      </View>
    </SafeAreaView>
  )
}

export default Authentication