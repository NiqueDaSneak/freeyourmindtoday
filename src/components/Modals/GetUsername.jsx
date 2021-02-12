import React, {
  useState, useRef, useContext, useEffect
} from 'react'
import {
  Text, 
  Animated, 
  Button, 
  Easing, 
  TextInput,
  Keyboard,
  View
} from 'react-native'
import { BlurView } from 'expo-blur'
import {
  theme,
  useKeyboard
} from '../../assets/utils'
import {
  ThemeContext, AuthContext
} from '../../state';

const GetUsername = ({ visible, close }) => {
  const toggleSlide = useRef(new Animated.Value(-900)).current
  const [keyboardHeight, keyboardOpen] = useKeyboard()
  const usernameInputRef = useRef()
  const [username, setPhoneNumber] = useState('')
  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState
  const [authState, authDispatch] = useContext(AuthContext)

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
        usernameInputRef.current.focus()
      }
      
      if (!visible) {
        Animated.timing(
          toggleSlide, {
            toValue: -900,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
        Keyboard.dismiss()
      }
    }, [toggleSlide, visible]
  )

  return (
    <Animated.View style={{
      position: 'absolute',
      height: '100%',
      width: '100%',
      bottom: toggleSlide,
      zIndex: 1,
    }}>
      <BlurView
        tint={colorScheme}
        style={{
          position: 'absolute',
          width: '100%',
          height: visible ? '100%' : 0, 
          opacity: visible ? 1 : 0,
        }} />
      <Animated.View 
        style={[
          {
            bottom: keyboardHeight,
            width: '100%',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[300],
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: 'space-between',
            paddingBottom: 10,
            paddingTop: 30,
          },
        ]}>
        <Text style={{
          fontSize: theme.fonts.sizes.large,
          color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600], 
          paddingBottom: 20,
        }}>Choose a username</Text>
        <TextInput
          ref={usernameInputRef}
          value={username}
          keyboardAppearance={colorScheme}
          returnKeyType="next"      
          enablesReturnKeyAutomatically    
          style={{ 
            borderRadius: 10, 
            fontSize: theme.fonts.sizes.medium, 
            borderColor: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[100], 
            borderWidth: 1 ,
            paddingLeft: '2%',
            marginBottom: '4%', 
            width: '80%',
            textAlign: 'center',
            padding: '2%',
            color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600], 
          }}
          placeholder="Maybe your instagram name..."
          keyboardType='default'
          autoCompleteType="tel"
          onChangeText={text => setPhoneNumber(text)}
        /> 
        <View style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-evenly' 
        }}>
          <Button
            title="Save username"
            onPress={() => {
              authDispatch({
                type: 'SAVE_USERNAME',
                username
              })
              close()
            }} />
        </View>
      </Animated.View>
    </Animated.View>
  )
}

export default GetUsername