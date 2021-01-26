import React, {
  useState, useContext, useEffect, useRef 
} from 'react'
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

import {
  theme, useKeyboard 
} from '../../assets/utils'
import {
  AspectsContext, ModalContext, AuthContext, ConsiderationsContext, ThemeContext 
} from '../../state'

const CreateShortTermConsideration = ({
  visible, close 
}) => {
  const [authState, authDispatch] = useContext(AuthContext)
  const { activeUser } = authState
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

  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

  useEffect(
    () => {
      if (visible) {
        inputRef.current.focus()
      }
      if (questionIndex === 1) {
        inputRef2.current.focus()
      }
      if (questionIndex > 1) {
        Keyboard.dismiss()
      }
    }, [visible, questionIndex]
  )

  useEffect(
    () => {
      if (questionIndex === 0) {
        Animated.timing(
          slideLeft, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      
        Animated.timing(
          slideLeft2, {
            toValue: 400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
        Animated.timing(
          slideLeft3, {
            toValue: 400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
      // after first question move to next
      if (questionIndex === 1) {
        Animated.timing(
          slideLeft, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      
        Animated.timing(
          slideLeft2, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
      // move on to the last question
      if (questionIndex === 2) {
        Animated.timing(
          slideLeft2, {
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      
        Animated.timing(
          slideLeft3, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
    }, [questionIndex]
  )
  
  const resetForm = () => {
    setQuestionIndex(0)
    setConsiderationTitle('')
    setAspectPicker('No Match')
  }

  const submitNewConsideration = () => {
    const newConsideration = {
      title: considerationTitle,
      importanceStatement: importance,
      aspectId: aspectPicker,
      type: 'short'
    }
    considerationsDispatch({
      type: 'ADD_NEW',
      newConsideration,
      user: activeUser
    })   
    modalDispatch({type: 'CLOSE_MODAL'})
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
      color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[800],
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
      color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[800],
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
      <BlurView
        tint={colorScheme}
        intensity={100}
        style={{
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
            color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[800],
            width: '80%',
            marginBottom: '2%', 
          }}>What is one specific thing you need to do now to either create or sustain your vision? </Text>
          <Text style={{
            fontSize: theme.fonts.sizes.small,
            color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[800],
            width: '80%',
            marginBottom: '4%', 
          }}>Put another way; What is a step I can take to overcome an obstacle I am facing</Text>
          <TextInput
            ref={inputRef}
            blurOnSubmit
            maxLength={85}
            keyboardAppearance="dark"
            returnKeyType="next"          
            enablesReturnKeyAutomatically
            multiline
            numberOfLines={4}
            style={styles.importanceInput}
            onChangeText={text => setConsiderationTitle(text)}
            placeholder=''
            onSubmitEditing={() => setQuestionIndex(questionIndex + 1)}
          /> 
          <Button
            disabled={!(considerationTitle.split(' ').length > 4)}
            color="green"
            title="Next"
            onPress={() => setQuestionIndex(questionIndex + 1)} />
          <Button
            color="red"
            title="Cancel"
            onPress={() => {
              modalDispatch({type: 'CLOSE_MODAL'})
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
            color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[800],
            width: '80%'
          }}>Why is this important to you?</Text>
          <TextInput
            ref={inputRef2}
            maxLength={800}
            keyboardAppearance="dark"
            blurOnSubmit
            returnKeyType="next"     
            enablesReturnKeyAutomatically    
            multiline
            numberOfLines={4}
            style={styles.importanceInput}
            onChangeText={text => setImportance(text)}
            onSubmitEditing={() => {
              setQuestionIndex(questionIndex + 1)
            }
            }
          />
          <Button
            disabled={!(importance.length > 25)}
            color="green"
            title="Next"
            onPress={() => {
              setQuestionIndex(questionIndex + 1)
            } 
            } />
          <Button
            color="red"
            title="Cancel"
            onPress={() => {
              modalDispatch({type: 'CLOSE_MODAL'})
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
              color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800],
              width: '80%'
            }}>Does this correspond with any of your aspects?</Text>
            <Picker
              selectedValue={aspectPicker}
              style={{width: '100%',}}
              onValueChange={(itemValue) =>
                setAspectPicker(itemValue)
              }
              itemStyle={{color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800]}}
            >
              <Picker.Item
                label='No Match'
                value='No Match' />
              {aspects.map(aspect => (
                <Picker.Item
                  key={aspect?.title}
                  label={aspect?.title}
                  value={aspect?.id} />
              ))}
            </Picker>
            <Button
              color="green"
              title="Create"
              onPress={() => submitNewConsideration()} />
            <Button
              color="red"
              title="Cancel"
              onPress={() => {
                close()
                resetForm()
              }} />
          </View>
        </Animated.View>
      </BlurView>
    </Modal>
  )
}

export default CreateShortTermConsideration