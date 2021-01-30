import React, {
  useState, useRef, useContext, useEffect
} from 'react'
import {
  Text, 
  Animated, 
  Button, 
  Easing, 
  TextInput,
  View,
  Keyboard,
  StyleSheet,
  FlatList
} from 'react-native'
import { BlurView } from 'expo-blur'
import {
  theme,
  useKeyboard
} from '../../assets/utils'
import {
  AuthContext,
  ModalContext 
} from '../../state';

const CreateNewAspect = ({ visible }) => {
  // const [authState, authDispatch] = useContext(AuthContext)
  // const {isAuthenticated} = authState
  const toggleSlide = useRef(new Animated.Value(-400)).current
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [keyboardHeight, keyboardOpen] = useKeyboard()
  // const phoneNumberInputRef = useRef()
  // const verifyInputRef = useRef()
  // const [verifyCode, setVerifyCode] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const phoneInputAnimationRef = useRef(new Animated.Value(0)).current
  // const verifyInputAnimationRef = useRef(new Animated.Value(450)).current

  const resetForm = () => {
    // phoneInputAnimationRef.resetAnimation()
    // verifyInputAnimationRef.resetAnimation()
    // setPhoneNumber('')
    // setVerifyCode('')
    Keyboard.dismiss()

  }

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
        // phoneNumberInputRef.current.focus()
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

  // useEffect(
  //   () => {
  //     if (!isAuthenticated) {
  //       resetForm()
  //     }
  //   }, [isAuthenticated, phoneInputAnimationRef, verifyInputAnimationRef]
  // )

  const styles = StyleSheet.create({
    animatedContainer: {
      bottom: keyboardHeight,
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
      fontSize: theme.fonts.sizes.small, 
      borderColor: 'gray', 
      borderWidth: 1 ,
      paddingLeft: '2%',
      // marginBottom: '4%', 
      // height: '100%',
      // width: '80%',
      // textAlign: 'center',
      padding: '2%',
      color: 'white' 
    }
  })
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
        // height: '30%',
        width: '100%',
        // backgroundColor: 'pink',
        bottom: toggleSlide,
        zIndex: 1,
      }}>
        <View style={{
          bottom: keyboardHeight,
          paddingRight: '4%',
          paddingLeft: '4%',
          paddingBottom: 20,
          // height: '50%',
          // height: 100,
          width: '100%',
          backgroundColor: 'pink'
        }}>
          <Text>Choose A Category</Text>
  <View style={{
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 100,
    alignItems: 'center',
          }}>
           <TextInput style={[styles.input, {
      width: '35%',
      height: 40
            }]} /> 
            <FlatList
              keyExtractor={(
            item, index
          ) => `${index}`}
contentContainerStyle={{
              // width: '100%',
              height: '100%',
                backgroundColor: 'yellow'
              }} 
              data={['Career', 'Financial']}
              renderItem={({item}) => (
                <View style={{backgroundColor: 'purple', alignSelf: 'flex-start'}}><Text>{item}</Text></View>
              )}
              />
            {/* <FlatList
      // columnWrapperStyle={{justifyContent: 'space-around'}}
      contentContainerStyle={{
        width: '65%',
        height: '100%',
        backgroundColor: 'yellow'}}
      data={['Career', 'Financial']}
      renderItem={({item}) => (
        <View style={{ height: 100, width: 100, backgroundColor: 'green ' }}>
          <Text>{item}</Text>
        <View>
      )} /> */}

  </View>
        </View>
      </Animated.View>
    </>
  )
}

export default CreateNewAspect