import React, { useState, useContext, useEffect, useRef } from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput,
  Button,
  Modal,
  Alert,
  Animated,
  Easing
} from 'react-native'
import { BlurView } from 'expo-blur'

import { theme, useKeyboard } from '../../assets/utils'
import { AspectsContext, ModalContext } from '../../state'

const AddNewAspect = ({ visible }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [aspectsState, aspectsDispatch] = useContext(AspectsContext)
  const [keyboardHeight] = useKeyboard()

  const [aspectTitle, setAspectTitle] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [importance, setImportance] = useState('')
  
  const inputRef = useRef()
  const inputRef2 = useRef()

  const slideLeft = useRef(new Animated.Value(0)).current
  const slideLeft2 = useRef(new Animated.Value(400)).current

  useEffect(() => {
    if (visible) {
      inputRef.current.focus()
    }
    if (questionIndex === 1) {
      inputRef2.current.focus()
    }
  }, [visible, questionIndex])

  useEffect(() => {
    if (questionIndex > 0) {
      Animated.timing(slideLeft, {
        toValue: -400,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
      
      Animated.timing(slideLeft2, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    }
    if (questionIndex === 0) {
      Animated.timing(slideLeft, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
      
      Animated.timing(slideLeft2, {
        toValue: 400,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    }
  }, [questionIndex])

  const resetForm = () => {
    setAspectTitle('')
    setQuestionIndex(0)
    setImportance('')
  }
  const submitNewAspect = () => {
    const newAspect = {
      title: aspectTitle,
      importanceStatement: importance,
    }
    aspectsDispatch({
      type: 'ASPECT_NEEDS_SAVED',
      payload: newAspect
    })
    modalDispatch({
      type: 'CLOSE_MODAL'
    })
    resetForm()
  }
  const styles = StyleSheet.create({
    titleContainer: {
      width: '100%',
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      position: 'absolute'
    },
    titleInput: { 
      borderRadius: 10, 
      fontSize: theme.fonts.sizes.medium, 
      borderColor: 'gray', 
      borderWidth: 1 ,
      paddingLeft: '2%',
      marginBottom: '4%', 
      width: '80%',
      textAlign: 'center',
      padding: '2%',
    },
    importanceContainer: {
      width: '100%',
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      position: 'absolute'
    },
    importanceInput: { 
      borderRadius: 10, 
      height: 80, 
      width: '80%',
      marginBottom: '4%', 
      fontSize: theme.fonts.sizes.small, 
      borderColor: 'gray', 
      borderWidth: 1,
      padding: '4%',
    }
  })
  
  return(
    <Modal
      animationType='slide'
      transparent
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
      }}
    >
      <BlurView intensity={100} style={{
        height: '100%',
        width: '100%' 
      }}>
        <Animated.View 
          style={[styles.titleContainer, {
            bottom: keyboardHeight + 30,
            left: slideLeft 
          }]
            
          }>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            marginBottom: '4%', 
          }}>Give Your Aspect A Title</Text>
          <TextInput
            ref={inputRef}
            blurOnSubmit
            maxLength={41}
            keyboardAppearance="dark"
            returnKeyType="next"      
            enablesReturnKeyAutomatically    
            style={styles.titleInput}
            onChangeText={text => setAspectTitle(text)}
            placeholder=""
            onSubmitEditing={() => setQuestionIndex(questionIndex + 1)}
          /> 
          <Button disabled={!(aspectTitle.length > 0)} color="green" title="Next" onPress={() => setQuestionIndex(questionIndex + 1)} />
          <Button color="red" title="Cancel" onPress={() => {
            modalDispatch({
              type: 'CLOSE_MODAL'
            })
            resetForm()
          }} />
        </Animated.View>
        <Animated.View 
          style={[styles.importanceContainer, {
            bottom: keyboardHeight + 30,
            left: slideLeft2,
          }]}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            marginBottom: '4%', 
          }}>Why is this important to you?</Text>
          <TextInput
            ref={inputRef2}
            keyboardAppearance="dark"
            blurOnSubmit
            returnKeyType="done"   
            enablesReturnKeyAutomatically      
            multiline
            numberOfLines={4}
            style={styles.importanceInput}
            onChangeText={text => setImportance(text)}
            onSubmitEditing={() => submitNewAspect()}
          />
          <Button disabled={!(importance.length > 25)} color="green" title="Create" onPress={() => submitNewAspect()} />
          <Button color="red" title="Cancel" onPress={() => {
            modalDispatch({
              type: 'CLOSE_MODAL'
            })
            resetForm()
          }} />
        </Animated.View>
      </BlurView>
    </Modal>
  )
}

export default AddNewAspect