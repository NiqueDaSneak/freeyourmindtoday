import React, {
  useState,
  useContext
} from 'react'
import { 
  View, 
  TouchableOpacity, 
  TextInput,
  Keyboard,
  Image,
  Text
} from 'react-native'
import { theme } from '../assets/utils'
import { ThemeContext } from '../state'

const EditableInput = ({
  editableValue,
  size,
  label,
  onSave
}) => {
  const [editable, setEditable] = useState(false)
  const [inputValue, setInputValue] = useState(editableValue)
  
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  const onPress = () => {
    try {
      onSave(inputValue)
    } catch (error) {
      console.log(
        'err: ', error
      )

    } finally {
      setEditable(false)
    }
  }
  const EditToggle = ({editable}) => editable ? (
    <TouchableOpacity onPress={onPress}>
      <Image 
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          resizeMode: 'contain',
          marginLeft: 30,
          height: 30,
          width: 30,
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
        }} 
        source={ colorScheme === 'dark' ? require('../assets/edit-dark.png') : require('../assets/edit-light.png')} />
    </TouchableOpacity> 
  )
  
  return (
    <>
      <Text style={{
        color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400],
        fontSize: theme.fonts.sizes.medium,
        marginBottom: '4%', 
        textAlign: 'left'
      }}>{label}</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
      }}>
        {size === 'large' ? (
          <TextInput
            editable={editable}
            keyboardAppearance={colorScheme}
            blurOnSubmit
            returnKeyType="done"          
            value={inputValue}
            multiline
            numberOfLines={4}
            style={[{ 
              height: 150,
              borderRadius: 10, 
              fontSize: theme.fonts.sizes.medium, 
              borderColor: colorScheme === 'dark' ?  theme.greyPalette[400] : theme.greyPalette[800], 
              borderWidth: 1 ,
              paddingLeft: '2%',
              width: '75%',
              padding: '2%',
              color: colorScheme === 'dark' ?  theme.greyPalette[100] : theme.greyPalette[800],
            
            }, 
            !editable ? {
              color: 'black',
              backgroundColor: 'darkgrey' 
            } : null
            ]}
            onChangeText={text => setInputValue(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />

        ) : (
          <TextInput
            editable={editable}
            keyboardAppearance={colorScheme}
            blurOnSubmit
            returnKeyType="done"          
            maxLength={41}
            value={inputValue}
            style={[{ 
              borderRadius: 10, 
              fontSize: theme.fonts.sizes.medium, 
              borderColor: colorScheme === 'dark' ?  theme.greyPalette[400] : theme.greyPalette[800], 
              borderWidth: 1 ,
              paddingLeft: '2%',
              width: '75%',
              padding: '2%',
              color: colorScheme === 'dark' ?  theme.greyPalette[100] : theme.greyPalette[800],
            
            }, 
            !editable ? {
              color: 'black',
              backgroundColor: 'darkgrey' 
            } : null
            ]}
            onChangeText={text => setInputValue(text)}
            onSubmitEditing={() => Keyboard.dismiss()}
          />

        )}
        <EditToggle editable={editable} />
      </View>
    </>
  )
}

export default EditableInput