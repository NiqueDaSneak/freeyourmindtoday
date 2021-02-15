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
  Keyboard,
  Alert
} from "react-native"
import { BlurView } from 'expo-blur'
import { BarCodeScanner } from 'expo-barcode-scanner'
import {
  ModalContext, 
  ThemeContext, 
  ConsiderationsContext,
  AuthContext
} from '../../state'
import {
  theme, useKeyboard
} from '../../assets/utils'

const SharedConsiderationCreation = ({
  visible, close 
}) => {
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
  const [scanned, setScanned] = useState(false)
  const [hasPermission, setHasPermission] = useState(null);

  const [keyboardHeight, keyboardOpen] = useKeyboard()

  const submitNewConsideration = (considerationTitle, refId) => {
    const newConsideration = {
      title: considerationTitle,
      aspectId: aspect.id,
      type: 'shared',
    }
    considerationsDispatch({
      type: 'ADD_NEW',
      newConsideration,
      refId
    })   
    modalDispatch({
      type: 'OPEN',
      modalType: 'GET_ASPECT_DETAILS',
      modalData:  aspect
    })
    setTitle('')
    Keyboard.dismiss()
    setCreateActive(false)
    setJoinActive(false)
  }

  const handleBarCodeScanned = ({
    type, data 
  }) => {
    const {
      adminId,
      refId,
      title,
      inviter 
    } = JSON.parse(data)

    setScanned(true)

    Alert.alert(
      `You have been invited to join the shared consideration, ${title}.`,
      'Are you sure you want to join?',
      [
        {
          text: 'Yes, join',
          onPress: () => {
            submitNewConsideration(title, refId)
          }
        },
        {
          text: 'Cancel',
          style: 'destructive'
        }
      ],
    )
  
  }
  
  useEffect(
    () => {
      (async () => {
        if (visible) {
          const { status } = await BarCodeScanner.requestPermissionsAsync()
          setHasPermission(status === 'granted')
        }
      })()
    }, [visible]
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
        setCreateActive(false)
        setJoinActive(false)
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
    return 'Shared Consideration'
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
          // zIndex: 2,
        }} />
      <Animated.View style={{
        position: 'absolute',
        width: '100%',
        backgroundColor: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[300],
        bottom: visible && keyboardOpen ? keyboardHeight : toggleSlide,
        zIndex: 1,
        paddingTop: 30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
          marginTop: 20,
          marginBottom: 30,
        }}>
          {!createActive && !joinActive && (
            <>
              <Button
                title='Create'
                onPress={() => {
                  setCreateActive(true)
                }} />
              <Button
                title='Join'
                onPress={() => setJoinActive(true)} />
              <Button
                color="red"
                title="Cancel"
                onPress={() => {
                  close()
                  // modalDispatch({type: 'CLOSE'})
                  // resetForm()
                }} />

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
                }} 
              />
              <Button
                color='green'
                title='Create'
                onPress={() => submitNewConsideration(title)} 
              />
            </View>
          </View>
        )}
        {joinActive && (
          <View style={{
            height: '50%',
            width: '100%',
            // marginLeft: '10%',
            // backgroundColor: 'blue',
            marginBottom: 20
            // zIndex: 1
          }}>
            <Text style={{
              color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800],
              fontSize: theme.fonts.sizes.medium,
              marginBottom: 40,
              textAlign: 'center',
              width: '80%',
              marginLeft: '10%',
            }}>Join other considerations by scanning the QR code in the screen below:</Text>
            {!scanned && (
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{
                  height: 300,
                  width: '100%'
                }}
              />
            )}
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
              }} 
            />
            <Button
              color='green'
              title='Scan Again'
              onPress={() => { 
                setScanned(false)
              }} 
            />

          </View>
        )}
      </Animated.View>
    </>
  )
}

export default SharedConsiderationCreation