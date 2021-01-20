import React, {
  useState, useRef, useContext, useEffect
} from 'react'
import {
  Text, 
  View, 
  Animated, 
  Button, 
  Easing, 
  Pressable,
  Modal,
  TextInput,
  Keyboard,
  StyleSheet
} from 'react-native'
import { BlurView } from 'expo-blur'
import SegmentedControl from '@react-native-community/segmented-control';
import {
  theme, useKeyboard
} from '../../assets/utils'
import {
  AuthContext, ModalContext 
} from '../../state';

const PhoneVerification = ({ visible }) => {
  const [authState, authDispatch] = useContext(AuthContext)
  // const [menuOpen, setMenuOpen] = useState(false)
  const toggleSlide = useRef(new Animated.Value(-400)).current
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [keyboardHeight, keyboardOpen] = useKeyboard()
  const phoneNumberInputRef = useRef()
  const verifyInputRef = useRef()
  const [verifyCode, setVerifyCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const phoneInputAnimationRef = useRef(new Animated.Value(0)).current
  const verifyInputAnimationRef = useRef(new Animated.Value(450)).current

  useEffect(
    () => {
      if (visible) {
        Animated.timing(
          toggleSlide, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
        phoneNumberInputRef.current.focus()
      }
      
      if (!visible) {
        Animated.timing(
          toggleSlide, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
        Keyboard.dismiss()
      }
    }, [toggleSlide, visible]
  )

  const styles = StyleSheet.create({
    animatedContainer: {
      bottom: keyboardHeight,
      // left: 0,
      // left: phoneNumberInputRefAnimation, 
      height: '100%',
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: theme.greyPalette[700],
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      justifyContent: 'space-between',
      paddingBottom: 40,
      paddingTop: 30,
    },
    input: { 
      borderRadius: 10, 
      fontSize: theme.fonts.sizes.medium, 
      borderColor: 'gray', 
      borderWidth: 1 ,
      paddingLeft: '2%',
      marginBottom: '4%', 
      width: '80%',
      textAlign: 'center',
      padding: '2%',
      color: 'white' 
    }
  })
  // const [segmentIndex, setSegmentIndex] = useState(0)
  // const [modalState, modalDispatch] = useContext(ModalContext)
  return (
    <>
      <BlurView
        tint='dark'
        style={{
          position: 'absolute',
          width: '100%',
          height: visible ? '100%' : 0, 
          opacity: visible ? 1 : 0,
        }} />
      <Animated.View style={{
        position: 'absolute',
        height: '30%',
        // justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'black',
        bottom: toggleSlide,
        // left: 0,
        zIndex: 1,
        // paddingBottom: 40,
        // paddingTop: 30,
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
        // alignItems: 'center'
        // justifyContent: 'space-between',

      }}>
        <Animated.View 
          style={[
            styles.animatedContainer,
            {left: phoneInputAnimationRef},
          ]}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            color: 'white' 
          }}>What is your number?</Text>
          <Text style={{
            textAlign: 'center',
            fontSize: theme.fonts.sizes.small,
            color: 'white' 
          }}>Your security is paramount. We make sure only you can access this sensitive personal information.</Text>
          <TextInput
            ref={phoneNumberInputRef}
            value={phoneNumber}
            keyboardAppearance="dark"
            returnKeyType="next"      
            enablesReturnKeyAutomatically    
            style={styles.input}
            placeholder=""
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChangeText={text => setPhoneNumber(text)}
          /> 
          <Button
            title="Send Code"
            onPress={() => {
              authDispatch({
                type: 'PHONE_VERIFICATION',
                phoneNumber
              })
              Animated.timing(
                phoneInputAnimationRef, {
                  toValue: -450,
                  duration: 300,
                  useNativeDriver: false,
                  easing: Easing.ease,
                }
              ).start()
              Animated.timing(
                verifyInputAnimationRef, {
                  toValue: 0,
                  duration: 300,
                  useNativeDriver: false,
                  easing: Easing.ease,
                }
              ).start()
              phoneNumberInputRef.current.focus()
              // setVerifyNumber(true)
              // sendVerification()
            }} />
        </Animated.View>
        <Animated.View style={[
          styles.animatedContainer,
          {left: verifyInputAnimationRef},
        ]}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            color: 'white' 
          }}>Verify your number?</Text>
          <Text style={{
            fontSize: theme.fonts.sizes.small,
            color: 'white' 
          }}>Enter the code we just sent via text to {phoneNumber}</Text>
          <TextInput
            ref={verifyInputRef}
            value={verifyCode}
            keyboardAppearance="dark"
            returnKeyType="next"      
            enablesReturnKeyAutomatically    
            style={styles.input}
            placeholder=""
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChangeText={text => setVerifyCode(text)}
          /> 
          <Button
            title="Verify Code"
            onPress={() => {
              authDispatch({
                type: 'VERIFY_PHONE',
                verifyCode
              })
            }
            } />
        </Animated.View>
        {/* <Button
          title='Cancel'
          color='red'
          onPress={() => {
            modalDispatch({ type: 'CLOSE_MODAL' })
          }} /> */}

      </Animated.View>
    </>
  )
}

export default PhoneVerification