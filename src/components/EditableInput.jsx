import React, { useState } from 'react'
import { 
  View, 
  TouchableOpacity, 
  TextInput,
  Keyboard,
  Image,
  Text
} from 'react-native'
import { theme } from '../assets/utils'

const EditableInput = ({
  editableValue,
  size,
  label
}) => {
  const [editable, setEditable] = useState(false)
  const [inputValue, setInputValue] = useState(editableValue)

  const EditToggle = ({editable}) => editable ? (
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
          // marginBottom: 20
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
          // marginBottom: 20
        }} 
        source={require('../assets/edit.png')} />
    </TouchableOpacity> 
  )
  
  return (
    <>
      <Text style={{
        color: 'white',
        fontSize: theme.fonts.sizes.medium,
        marginBottom: '4%', 
        textAlign: 'left'
      }}>{label}</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
      }}>
        <TextInput
          editable={editable}
          keyboardAppearance="dark"
          blurOnSubmit
          returnKeyType="done"          
          maxLength={41}
          value={inputValue}
          multiline={size === 'large'}
          numberOfLines={4}
          style={[{ 
            height: size === 'large' ? 150 : null,
            borderRadius: 10, 
            fontSize: theme.fonts.sizes.medium, 
            borderColor: 'gray', 
            borderWidth: 1 ,
            paddingLeft: '2%',
            width: '75%',
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
    </>
  )
}

export default EditableInput