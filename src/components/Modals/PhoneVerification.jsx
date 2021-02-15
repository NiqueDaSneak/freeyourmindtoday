import React, {
  useState, useRef, useContext, useEffect, useCallback
} from 'react'
import {
  Text, 
  Animated, 
  Button, 
  Easing, 
  TextInput,
  Keyboard,
  StyleSheet,
  View
} from 'react-native'
import { BlurView } from 'expo-blur'
import {
  theme,
  useKeyboard
} from '../../assets/utils'
import {
  AuthContext,
  ModalContext,
  ThemeContext
} from '../../state';

const PhoneVerification = ({ visible }) => {
  const [authState, authDispatch] = useContext(AuthContext)
  const {isAuthenticated} = authState
  const toggleSlide = useRef(new Animated.Value(-900)).current
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [keyboardHeight, keyboardOpen] = useKeyboard()
  const phoneNumberInputRef = useRef()
  const verifyInputRef = useRef()
  const [verifyCode, setVerifyCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const phoneInputAnimationRef = useRef(new Animated.Value(0)).current
  const verifyInputAnimationRef = useRef(new Animated.Value(450)).current
  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

  const resetForm = useCallback(
    () => {
      phoneInputAnimationRef.resetAnimation()
      verifyInputAnimationRef.resetAnimation()
      setPhoneNumber('')
      setVerifyCode('')
      Keyboard.dismiss()
    }, [phoneInputAnimationRef, verifyInputAnimationRef]
  )

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
            toValue: -900,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
        Keyboard.dismiss()
      }
    }, [toggleSlide, visible]
  )
  useEffect(
    () => {
      if (!isAuthenticated) {
        resetForm()
      }
    }, [isAuthenticated, phoneInputAnimationRef, resetForm, verifyInputAnimationRef]
  )
  const styles = StyleSheet.create({
    animatedContainer: {
      bottom: keyboardHeight,
      height: 300,
      width: '100%',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[300],
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      justifyContent: 'space-between',
      paddingBottom: 40,
      paddingTop: 30,
    },
    input: { 
      borderRadius: 10, 
      fontSize: theme.fonts.sizes.medium, 
      borderColor: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[100], 
      borderWidth: 1 ,
      paddingLeft: '2%',
      marginBottom: '4%', 
      width: '80%',
      textAlign: 'center',
      padding: '2%',
      color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600], 
    }
  })
  return (
    <>
      
      <Animated.View style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        // backgroundColor: 'black',
        bottom: toggleSlide,
        // bottom: ,
        zIndex: 1,
      }}>
        <BlurView
          tint={colorScheme}
          style={{
            position: 'absolute',
            width: '100%',
            height: visible ? '100%' : 0, 
            opacity: visible ? 1 : 0,
          }} />
        <Animated.View 
          style={[
            styles.animatedContainer,
            {left: phoneInputAnimationRef},
          ]}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600], 
          }}>What is your number?</Text>
          <Text style={{
            textAlign: 'center',
            fontSize: theme.fonts.sizes.small,
            color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600], 
          }}>Your security is paramount. We make sure only you can access this sensitive personal information.</Text>
          <TextInput
            ref={phoneNumberInputRef}
            value={phoneNumber}
            keyboardAppearance={colorScheme}
            returnKeyType="next"      
            enablesReturnKeyAutomatically    
            style={styles.input}
            placeholder="111-867-5309"
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChangeText={text => setPhoneNumber(text)}
          /> 
          <View style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly' 
          }}>
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
                verifyInputRef.current.focus()
              }} />
            <Button
              title="Cancel"
              color='red'
              onPress={() => {
                modalDispatch({ type: 'CLOSE' })
                resetForm()
              }} />
          </View>
        </Animated.View>
        <Animated.View style={[
          styles.animatedContainer,
          {left: verifyInputAnimationRef},
        ]}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600], 
          }}>Verify your number?</Text>
          <Text style={{
            fontSize: theme.fonts.sizes.small,
            color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600], 
          }}>Enter the code we just sent via text to {phoneNumber}</Text>
          <TextInput
            ref={verifyInputRef}
            value={verifyCode}
            keyboardAppearance={colorScheme}
            returnKeyType="next"      
            enablesReturnKeyAutomatically    
            style={styles.input}
            placeholder=""
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChangeText={text => setVerifyCode(text)}
          />
          <View style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly' 
          }}>
            <Button
              title="Verify Code"
              onPress={() => {
                authDispatch({
                  type: 'VERIFY_PHONE',
                  verifyCode
                })
                modalDispatch({ type: 'CLOSE' })
              }} />
            <Button
              title="Cancel"
              color='red'
              onPress={() => {
                modalDispatch({ type: 'CLOSE' })
                resetForm()
              }} />
          </View>
        </Animated.View>
      </Animated.View>
    </>
  )
}

export default PhoneVerification