import React, { useState, useContext, useEffect, useRef } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Button,
  Modal,
  Alert,
  Keyboard,
  Animated,
  Easing
} from 'react-native'
import { BlurView } from 'expo-blur'
import { Picker } from '@react-native-picker/picker'

import { theme, useKeyboard } from '../../assets/utils'
import { AspectsContext, ModalContext } from '../../state'
import { ConsiderationsContext } from '../../state'

const CreateShortTermConsideration = ({ visible }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [considerationsState, considerationsDispatch] = useContext(ConsiderationsContext)
  const [keyboardHeight] = useKeyboard()
  const [aspectState, aspectsDispatch] = useContext(AspectsContext)
  const { aspects } = aspectState
  const [considerationTitle, setConsiderationTitle] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [importance, setImportance] = useState('')
  const [aspectPicker, setAspectPicker] = useState('No')
  const inputRef = useRef()
  const inputRef2 = useRef()

  const slideLeft = useRef(new Animated.Value(0)).current
  const slideLeft2 = useRef(new Animated.Value(400)).current
  const slideLeft3 = useRef(new Animated.Value(400)).current

  useEffect(() => {
    if (visible) {
      inputRef.current.focus()
    }
    if (questionIndex === 1) {
      inputRef2.current.focus()
    }
    if (questionIndex > 1) {
      Keyboard.dismiss()
    }
  }, [visible, questionIndex])

  useEffect(() => {
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
      Animated.timing(slideLeft3, {
        toValue: 400,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    }
    // after first question move to next
    if (questionIndex === 1) {
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
    // move on to the last question
    if (questionIndex === 2) {
      Animated.timing(slideLeft2, {
        toValue: -400,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
      
      Animated.timing(slideLeft3, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start()
    }
  }, [questionIndex])
  
  const resetForm = () => {
    setQuestionIndex(0)
    setConsiderationTitle('')
    setAspectPicker('No Match')
  }

  const submitNewConsideration = () => {
    let newConsideration = {
      title: considerationTitle,
      importanceStatement: importance,
      aspect: aspectPicker
    }
    considerationsDispatch({
      type: 'ADD_NEW',
      considerationType: 'short',
      newConsideration: newConsideration
    })   
    modalDispatch({
      type: 'CLOSE_MODAL'
    })
    resetForm()

  }

  return(
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
      }}
    >
    {/* {console.log('aspects: ', aspects)} */}
      <BlurView tint='dark' intensity={100} style={{
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
            fontSize: theme.fonts.sizes.medium,
            color: 'white',
            width: '80%',
            marginBottom: '2%', 
          }}>What is one specific thing you need to do now to either create or sustain your vision? </Text>
          <Text style={{
            fontSize: theme.fonts.sizes.small,
            color: 'white',
            width: '80%',
            marginBottom: '4%', 
          }}>Put another way; What is a step I can take to overcome an obstacle I'm facing</Text>
          <TextInput
            ref={inputRef}
            blurOnSubmit
            maxLength={41}
            keyboardAppearance={'dark'}
            returnKeyType={'next'}          
            enablesReturnKeyAutomatically
            multiline={true}
            numberOfLines={4}
            style={styles.importanceInput}
            onChangeText={text => setConsiderationTitle(text)}
            placeholder=''
            onSubmitEditing={() => setQuestionIndex(questionIndex + 1)}
          /> 
          <Button disabled={!(considerationTitle.split(' ').length > 4)} color="green" title="Next" onPress={() => setQuestionIndex(questionIndex + 1)} />
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
            fontSize: theme.fonts.sizes.medium,
            marginBottom: '4%', 
            color: 'white',
            width: '80%'
          }}>Why is this important to you?</Text>
          <TextInput
            ref={inputRef2}
            keyboardAppearance={'dark'}
            blurOnSubmit
            returnKeyType={'next'}     
            enablesReturnKeyAutomatically    
            multiline={true}
            numberOfLines={4}
            style={styles.importanceInput}
            onChangeText={text => setImportance(text)}
            onSubmitEditing={() => {
              // Keyboard.dismiss()
              setQuestionIndex(questionIndex + 1)
            }
            }
          />
          <Button disabled={!(importance.length > 25)} color="green" title="Next" onPress={() => {
            setQuestionIndex(questionIndex + 1)
          } 
          } />
          <Button color="red" title="Cancel" onPress={() => {
            modalDispatch({
              type: 'CLOSE_MODAL'
            })
            resetForm()
          }} />
        </Animated.View>
        <Animated.View 
          style={[styles.importanceContainer, {
            bottom: keyboardHeight,
            left: slideLeft3,
          }]}>
          <View style={{
            position: 'absolute',
            alignItems: 'center',
            bottom: 300 
          }}>
            <Text style={{
              fontSize: theme.fonts.sizes.medium,
              marginBottom: '4%', 
              color: 'white',
              width: '80%'
            }}>Does this correspond with any of your aspects?</Text>
            <Picker
              selectedValue={aspectPicker}
              style={{
                width: '80%',
              }}
              onValueChange={(itemValue) =>
                setAspectPicker(itemValue)
              }
            >
              <Picker.Item label='No Match' value='No Match' />
              {aspects.map(aspect => (
                <Picker.Item key={aspect.title} label={aspect.title} value={aspect.title} />
              ))}
            </Picker>
            <Button color="green" title="Create" onPress={() => submitNewConsideration()} />
            <Button color="red" title="Cancel" onPress={() => {
              modalDispatch({
                type: 'CLOSE_MODAL'
              })
              resetForm()
            }} />
          </View>
        </Animated.View>
      </BlurView>
    </Modal>
  )
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
    color: 'white',
  }
})

export default CreateShortTermConsideration