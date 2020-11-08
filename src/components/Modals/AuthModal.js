import React, { useState, useContext, useEffect, useRef } from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput,
  Button,
  Modal,
  Alert,
  Animated,
  Image,
  Easing,
  TouchableOpacity,
  View
} from 'react-native'
import { BlurView } from 'expo-blur'

import { theme, useKeyboard } from '../../assets/utils'
import { AspectsContext, ModalContext } from '../../state'

const AuthModal = ({ visible }) => {
  const [keyboardHeight] = useKeyboard()

  const slideLeft = useRef(new Animated.Value(0)).current
  const slideLeft2 = useRef(new Animated.Value(400)).current


  return(
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <BlurView tint='dark' intensity={100}  style={{
        height: '100%',
      }}>
        <Animated.View 
          style={[styles.titleContainer, {
            bottom: keyboardHeight + 30,
            left: slideLeft, 
            height: '100%',
            width: '100%',
            alignItems: 'center'
            // backgroundColor: 'pink'
          }]
          }>
          <Image 
            resizeMode="contain"
            resizeMethod="resize"
            style={{
              resizeMode: 'contain',
              marginTop: '30%',
              height: 200,
              width: 200
            }} source={require('../../assets/information.png')} />
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            marginTop: '30%',
            marginBottom: '30%',
            color: 'white' 
          }}>Sign In</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <View style={styles.loginButtonContainer}>
                <Image 
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={styles.loginIcon} source={require('../../assets/apple.png')} />
              </View>

            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.loginButtonContainer}>
                <Image 
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={styles.loginIcon} source={require('../../assets/phone.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly', 
            width: '100%', 
            marginTop: 150
          }}>
            <Text>Terms of use</Text>
            <Text>Privacy Policy</Text>
          </View>
        </Animated.View>
        <Animated.View 
          style={[styles.importanceContainer, {
            bottom: keyboardHeight + 30,
            left: slideLeft2,
          }]}>
        </Animated.View>
      </BlurView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  loginIcon: {
    resizeMode: 'contain',
    height: 30,
    width: 30
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    width: '100%',
  },
  loginButtonContainer: {
    width: 70,
    height:  70,
    borderRadius: 10,
    backgroundColor: 'black', 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default AuthModal