import React, { useState, useContext, useEffect, useRef } from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput,
  Button,
  Modal,
  Animated,
  Image,
  Easing,
  View,
} from 'react-native'
import { BlurView } from 'expo-blur'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import firebase, { db } from '../../../firebase'
import fb from 'firebase'
import { theme, useKeyboard } from '../../assets/utils'
import { AspectsContext, AuthContext, ModalContext } from '../../state'
import PhoneLogin from '../PhoneLogin'

const AuthModal = ({ visible }) => {
  const recaptchaVerifier = useRef(null)

  const [keyboardHeight, keyboardOpen] = useKeyboard()
  const [authState, authDispatch] = useContext(AuthContext)

  
  const signInOptionsRefAnimation = useRef(new Animated.Value(0)).current
  const phoneNumberInputRefAnimation = useRef(new Animated.Value(400)).current
  const verifyInputRefAnimation = useRef(new Animated.Value(400)).current

  const phoneNumberInputRef = useRef()
  const verifyInputRef = useRef()

  const [phoneLoggingIn, setPhoneLoggingIn] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState()
  const [verifyNumber, setVerifyNumber] = useState(false)
  const [verifyCode, setVerifyCode] = useState()
  const [firebaseVerificationResponse, setFirebaseVerificationResponse] = useState()
  
  // Function to be called when requesting for a verification code
  const sendVerification = () => {
    console.log('phoneNumber: ', phoneNumber)
    const phoneProvider = new fb.auth.PhoneAuthProvider()
    phoneProvider
      .verifyPhoneNumber(`+1${phoneNumber}`, recaptchaVerifier.current)
      .then(val => setFirebaseVerificationResponse(val))
  }

  const confirmCode = () => {
    return firebase.auth.PhoneAuthProvider.credential(
      firebaseVerificationResponse,
      verifyCode
    )
  }
  useEffect(() => {
    if (phoneLoggingIn) {
      Animated.timing(phoneNumberInputRefAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
      Animated.timing(signInOptionsRefAnimation, {
        toValue: -400,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
      phoneNumberInputRef.current.focus()
    }
  }, [phoneLoggingIn])

  useEffect(() => {
    if (verifyNumber) {
      verifyInputRef.current.focus()
      Animated.timing(phoneNumberInputRefAnimation, {
        toValue: -400,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
      Animated.timing(verifyInputRefAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    }
  }, [verifyNumber])
  
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
          style={{
            bottom: keyboardHeight + 30,
            left: signInOptionsRefAnimation, 
            height: '100%',
            width: '100%',
            alignItems: 'center',
            position: 'absolute'
          }}>
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
            <PhoneLogin onPress={() => {
              setPhoneLoggingIn(true)}
            }
            />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly', 
            width: '100%', 
            marginTop: 150,
            display: keyboardOpen ? 'none' : null
          }}>
            <Text>Terms of use</Text>
            <Text>Privacy Policy</Text>
          </View>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebase.app().options}
          />
        </Animated.View>
        <Animated.View 
          style={{
            bottom: keyboardHeight + 30,
            left: phoneNumberInputRefAnimation, 
            height: '20%',
            width: '100%',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-between',
          }}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            color: 'white' 
          }}>What's your number?</Text>
          <Text style={{
            fontSize: theme.fonts.sizes.small,
            color: 'white' 
          }}>Your security is paramount. We make sure only you can access this sensitive personal information.</Text>
          <TextInput
            ref={phoneNumberInputRef}
            value={phoneNumber}
            keyboardAppearance={'dark'}
            returnKeyType={'next'}      
            enablesReturnKeyAutomatically    
            style={[styles.phoneNumInput]}
            placeholder=""
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChangeText={text => setPhoneNumber(text)}
          /> 
          <Button title="Send Code" onPress={() => {
            setVerifyNumber(true)
            sendVerification()
          }} />
        </Animated.View>
        <Animated.View 
          style={{
            bottom: keyboardHeight + 30,
            left: verifyInputRefAnimation, 
            // left: 0, 
            height: '20%',
            width: '100%',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'space-between',
          }}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            color: 'white' 
          }}>Verify your number?</Text>
          <Text style={{
            fontSize: theme.fonts.sizes.small,
            color: 'white' 
          }}>Enter the code we've sent via text to {phoneNumber}</Text>
          <TextInput
            ref={verifyInputRef}
            value={verifyCode}
            keyboardAppearance={'dark'}
            returnKeyType={'next'}      
            enablesReturnKeyAutomatically    
            style={[styles.phoneNumInput]}
            placeholder=""
            keyboardType="phone-pad"
            autoCompleteType="tel"
            onChangeText={text => setVerifyCode(text)}
          /> 
          <Button title="Send Code" onPress={() => {
            console.log('here')
            const credential = confirmCode()
            firebase
              .auth()
              .signInWithCredential(credential)
              .then((result) => {
                console.log('result.additionalUserInfo.isNewUser: ', result.additionalUserInfo.isNewUser)
                if (result.additionalUserInfo.isNewUser) {
                  console.log('user: ', result.user)
                  let newUser = {
                    firebaseId: result.user.uid,
                  }
                  db.collection('Users').add(newUser)
                    .then((docRef) => {
                      authDispatch({
                        type: 'LOGIN_USER', 
                        id: docRef.id
                      })
                    })
                }
              })
          }
          } />
        </Animated.View>

      </BlurView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  loginIcon: {
    resizeMode: 'contain',
    height: 15,
    width: 15
  },
  buttonsContainer: {
    justifyContent: 'space-evenly', 
    alignItems: 'center'
  },
  loginButtonContainer: {
    width: 220,
    height:  45,
    borderRadius: 10,
    backgroundColor: 'black', 
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    marginTop: '10%'
  },
  phoneNumInput: { 
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
  },

})

export default AuthModal