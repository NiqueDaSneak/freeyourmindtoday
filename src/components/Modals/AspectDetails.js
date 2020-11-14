import React, { useState, useContext, useRef } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput,
  Button,
  Modal,
  Keyboard,
  Image
} from 'react-native'
import { BlurView } from 'expo-blur'

import { theme, useKeyboard } from '../../assets/utils'
import { AspectsContext, ModalContext } from '../../state'

const AspectDetails = ({ visible }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const aspect = modalState.modalData
  const [aspectsState, aspectsDispatch] = useContext(AspectsContext)
  const [keyboardHeight] = useKeyboard()

  const [aspectTitle, setAspectTitle] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [importance, setImportance] = useState('')
  const [titleEditable, setTitleEditable] = useState(false)
  const [importanceEditable, setImportanceEditable] = useState(false)

  const inputRef = useRef()

  const EditToggle = ({ type, editable }) => {
    return editable ? (
      <TouchableOpacity onPress={() => {
        if (type === 'title') {
          setTitleEditable(false)
        } else {
          setImportanceEditable(false)
        }
      }}>
        <Image 
          resizeMode="contain"
          resizeMethod="resize"
          style={styles.toggleIcon} 
          // will be save button
          source={require('../../assets/check.png')} />
      </TouchableOpacity> 
    ) : (
      <TouchableOpacity onPress={() => {
        if (type === 'title') {
          setTitleEditable(true)
        } else {
          setImportanceEditable(true)
        }
      }}>
        <Image 
          resizeMode="contain"
          resizeMethod="resize"
          style={styles.toggleIcon} 
          source={require('../../assets/edit.png')} />
      </TouchableOpacity> 
    )
  }

  return(
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
    >
      <BlurView tint='dark' intensity={100} style={{
        height: '100%',
        width: '100%', 
      }}>
        <View 
          style={{
            position: 'absolute',
            width: '100%',
            bottom: keyboardHeight + 40,
            alignItems: 'center',
          }}>
          <Text style={{
            color: 'white',
            fontSize: theme.fonts.sizes.medium,
            marginBottom: '4%', 
            textAlign: 'left'
          }}>Aspect Title</Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row', 
            alignItems: 'center' 
          }}>
            <TextInput
              editable={titleEditable}
              blurOnSubmit
              maxLength={41}
              value={aspect?.title}
              keyboardAppearance={'dark'}
              returnKeyType={'done'}          
              style={[styles.titleInput, 
                !titleEditable ? {
                  color: 'black',
                  backgroundColor: 'darkgrey' 
                } : null
              ]}
              onChangeText={text => setAspectTitle(text)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <EditToggle type="title" editable={titleEditable} />
          </View>
          <Text style={{
            fontSize: theme.fonts.sizes.medium,
            marginBottom: '4%', 
            marginTop: '12%', 
            color: 'white',
          }}>Why is this important to you?</Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row', 
            alignItems: 'center' 
          }}>
            <TextInput
              editable={importanceEditable}
              keyboardAppearance={'dark'}
              blurOnSubmit
              returnKeyType={'done'}       
              value={aspect?.importanceStatement}  
              multiline={true}
              numberOfLines={4}
              style={[styles.importanceInput,
                !importanceEditable ? {
                  color: 'black',
                  backgroundColor: 'darkgrey' 
                } : null
              ]}
              onChangeText={text => setImportance(text)}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
            <EditToggle type="importance" editable={importanceEditable} />
          </View>
          <Button disabled={importanceEditable || titleEditable} 
            color="red" 
            title="Go Back" 
            onPress={() => modalDispatch({
              type: 'CLOSE_MODAL'
            })} />
        </View>
      </BlurView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  titleInput: { 
    borderRadius: 10, 
    fontSize: theme.fonts.sizes.medium, 
    borderColor: 'gray', 
    borderWidth: 1 ,
    paddingLeft: '2%',
    marginBottom: '4%', 
    width: '75%',
    textAlign: 'center',
    padding: '2%',
    color: 'white',
  },
  importanceInput: { 
    borderRadius: 10, 
    height: 150, 
    width: '75%',
    marginBottom: '4%', 
    fontSize: theme.fonts.sizes.medium, 
    borderColor: 'gray', 
    borderWidth: 1,
    padding: '4%',
    color: 'white',
  },
  toggleIcon: {
    resizeMode: 'contain',
    marginLeft: 30,
    height: 30,
    width: 30,
    marginBottom: 20
  }

})

export default AspectDetails