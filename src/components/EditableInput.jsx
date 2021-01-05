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
import { theme, useKeyboard } from '../assets/utils'

const EditableInput = ({ aspect, editableValue, size }) => {
  const [editable, setEditable] = useState(false)
  const [inputValue, setInputValue] = useState(editableValue)

  const EditToggle = ({ type, editable }) => {
    return editable ? (
      <TouchableOpacity onPress={() => {
        setEditable(false)
      }}>
        <Image 
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            resizeMode: 'contain',
            marginLeft: 30,
            height: 30,
            width: 30,
            marginBottom: 20
          }} 
          // will be save button
          source={require('../assets/check.png')} />
      </TouchableOpacity> 
    ) : (
      <TouchableOpacity onPress={() => {
        setEditable(true)
      }}>
        <Image 
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            resizeMode: 'contain',
            marginLeft: 30,
            height: 30,
            width: 30,
            marginBottom: 20
          }} 
          source={require('../assets/edit.png')} />
      </TouchableOpacity> 
    )
  }
  return(
    <View style={{
      display: 'flex',
      flexDirection: 'row', 
      alignItems: 'center' 
    }}>
      <TextInput
        editable={editable}
        keyboardAppearance={'dark'}
        blurOnSubmit
        returnKeyType={'done'}          
        maxLength={41}
        value={inputValue}
        multiline={size === 'large' ? true : false}
        numberOfLines={4}
        style={[{ 
          height: size === 'large' ? 150 : null,
          borderRadius: 10, 
          fontSize: theme.fonts.sizes.medium, 
          borderColor: 'gray', 
          borderWidth: 1 ,
          paddingLeft: '2%',
          // marginBottom: '4%', 
          width: '75%',
          // textAlign: 'center',
          padding: '2%',
          color: 'white',
        }, 
        !editable ? {
          color: 'black',
          backgroundColor: 'darkgrey' 
        } : null
        ]}
        onChangeText={text => setInputValue(text)}
        onSubmitEditing={() => Keyboard.dismiss()}
      />

      <EditToggle editable={editable} />
    </View>

  )

}

export default EditableInput