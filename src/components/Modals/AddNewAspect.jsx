import React, {
  useState, useContext, useEffect, useRef 
} from 'react'
import { 
  Text, 
  TextInput,
  Button,
  Modal,
  Alert,
  Animated,
  Platform,
  View
} from 'react-native'
import { BlurView } from 'expo-blur'

import {
  theme, useKeyboard 
} from '../../assets/utils'
import {
  AspectsContext, ModalContext, ThemeContext 
} from '../../state'

const AddNewAspect = ({visible}) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [aspectsState, aspectsDispatch] = useContext(AspectsContext)
  const [keyboardHeight] = useKeyboard()

  const [aspectTitle, setAspectTitle] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  
  const inputRef = useRef()

  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

  useEffect(
    () => {
      if (visible) {
        inputRef.current.focus()
      }
    }, [visible, questionIndex]
  )

  const resetForm = () => {
    setAspectTitle('')
    setQuestionIndex(0)
  }
  const submitNewAspect = () => {
    const newAspect = {
      title: aspectTitle,
      importanceStatement: '',
    }
    aspectsDispatch({
      type: 'NEEDS_SAVED',
      payload: newAspect
    })
    resetForm()
  }
  
  return(
    <Modal
      animationType='slide'
      transparent={Platform.OS !== 'android'}
      visible={visible}
    >
      <BlurView
        tint={colorScheme}
        intensity={100}
        style={{
          height: '100%',
          width: '100%' 
        }}>
        <Animated.View 
          style={{
            bottom: keyboardHeight + 30,
            width: '100%',
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute'
          }}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            marginBottom: '4%', 
            color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[700]
          }}>Give Your Aspect A Title</Text>
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
              paddingLeft: '2%',
              marginBottom: '4%', 
              width: '80%',
              textAlign: 'center',
              padding: '2%',
              color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[700] 
            }}
            onChangeText={text => setAspectTitle(text)}
            placeholder=""
            onSubmitEditing={() => setQuestionIndex(questionIndex + 1)}
          /> 
          <View style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly' 
          }}>
            <Button
              disabled={!(aspectTitle.length > 0)}
              color="green"
              title="Next"
              onPress={() => submitNewAspect()}
            />
            <Button
              color="red"
              title="Cancel"
              onPress={() => {
                modalDispatch({type: 'CLOSE'})
                resetForm()
              }} />

          </View>
        </Animated.View>
      </BlurView>
    </Modal>
  )
}

export default AddNewAspect