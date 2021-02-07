import React, {
  useRef, useContext, useEffect, useState
} from 'react'
import {
  View, 
  Button,
  Text,
  Animated,
  TextInput,
  Easing,
  Keyboard
} from "react-native"
import { BlurView } from 'expo-blur'
import {
  ModalContext, 
  ThemeContext, 
  ConsiderationsContext,
  AuthContext
} from '../../state'
import {
  theme, useKeyboard
} from '../../assets/utils'

const SharedConsiderationCreation = ({ visible }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const aspect = modalState.modalData
  const [considerationsState, considerationsDispatch] = useContext(ConsiderationsContext)
  const [authState, authDispatch] = useContext(AuthContext)
  const { activeUser } = authState
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  const toggleSlide = useRef(new Animated.Value(-600)).current
  const inputRef = useRef()
  
  const [title, setTitle] = useState('')
  const [createActive, setCreateActive] = useState(false)
  const [joinActive, setJoinActive] = useState(false)

  const [keyboardHeight] = useKeyboard()

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
      }
      
      if (!visible) {
        Animated.timing(
          toggleSlide, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
    }, [toggleSlide, visible]
  )

  const renderHeading = () => {
    if (createActive) { 
      return 'Create Shared Consideration'
    }
    if (joinActive) { 
      return 'Join Consideration'
    }
    return 'Shared Consideraiton'
  }

  const submitNewConsideration = () => {
    const newConsideration = {
      title,
      aspectId: aspect.id,
      type: 'shared'
    }
    considerationsDispatch({
      type: 'ADD_NEW',
      newConsideration,
    })   
    modalDispatch({
      type: 'OPEN',
      modalType: 'GET_ASPECT_DETAILS',
      modalData:  aspect
    })
    setTitle('')
    Keyboard.dismiss()
  }

  return(
    <>
      <BlurView
        tint={colorScheme}
        style={{
          position: 'absolute',
          width: '100%',
          height: visible ? '100%' : 0, 
          opacity: visible ? 1 : 0,
        }} />
      <Animated.View style={{
        position: 'absolute',
        width: '100%',
        backgroundColor: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[300],
        bottom: toggleSlide,
        left: 0,
        zIndex: 1,
        paddingTop: 30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}>
        <View style={{
          position: 'absolute',
          width: '100%',
          backgroundColor: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[300],
          zIndex: 1,
          paddingTop: 30,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          bottom: keyboardHeight,
        }}>
          
          <Text style={[{ ...theme.fonts.types.heading }, {
            width: '90%',
            marginLeft: '5%',
            textAlign: 'center',
            color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[800]
          }]}>{renderHeading()}</Text>
          <View style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
            marginTop: 10,
            marginBottom: 30
          }}>
            {!createActive && !joinActive && (
              <>
                <Button
                  title='Create'
                  onPress={() => setCreateActive(true)} />
                <Button
                  title='Join'
                  onPress={() => setJoinActive(true)} />
              </>
            )}
          </View>
          {createActive && (
            <View style={{
              width: '100%',
              marginLeft: '5%',
            }}>
              <Text style={[{...theme.fonts.types.subHeading}, {
                marginBottom: '5%',
                fontSize: theme.fonts.sizes.small,
                width: '90%',
                color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600],
              }]}>Mauris leo nisi, luctus id orci at, blandit tempor nisl. Integer vel hendrerit ipsum, quis mattis nulla.</Text>
              <Text style={{
                fontSize: theme.fonts.sizes.medium,
                marginBottom: '4%', 
                color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[700]
              }}>Shared Task Title:</Text>
              <TextInput
                ref={inputRef}
                blurOnSubmit
                maxLength={41}
                keyboardAppearance="dark"
                returnKeyType="next"      
                enablesReturnKeyAutomatically    
                style={{ 
                  borderRadius: 10, 
                  fontSize: theme.fonts.sizes.medium, 
                  borderColor: 'gray', 
                  borderWidth: 1 ,
                  marginBottom: '4%', 
                  width: '90%',
                  padding: '2%',
                  color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[700] 
                }}
                onChangeText={text => setTitle(text)}
                placeholder="Give it a title..."
              /> 
              <View style={{
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-evenly',
                marginBottom: 30
              }}>
                <Button
                  color='red'
                  title='Go Back'
                  onPress={() => { 
                    modalDispatch({
                      type: 'OPEN',
                      modalType: 'CHOOSE_TYPE',
                      modalData: aspect
                    })
                    Keyboard.dismiss()
                  }
                  } 
                />
                <Button
                  color='green'
                  title='Create'
                  onPress={() => submitNewConsideration()} 
                />
              </View>

            </View>
          )}
          {joinActive && (
            <View style={{
              height: 100,
              width: '100%',
              backgroundColor: 'blue'
            }} />
          )}
        </View>
      </Animated.View>
    </>
  )
}

export default SharedConsiderationCreation