import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const theme = { 
  layout: {
    scheme: {
      dark: {
        background: '#212121',
        secondary: '#424242',
        third: '#9E9E9E',
        textColor: '#BDBDBD',
        textContainer: 'black',
        accentGrey: '#757575',
      },
      light: {
        background: 'white',
        secondary: '#EEEEEE',
        third: '#9E9E9E',
        textColor: 'black',
        textContainer: '#E0E0E0',
        accentGrey: '#757575',
      },
    },
    flex: {
      row: {
        display: 'flex',
        flexDirection: 'row'
      }
    }
  },
  fonts: {
    types: {
      heading: {
        fontSize: 30, 
        fontWeight: 'bold'
      },
      subHeading: {
        fontSize: 20, 
        fontWeight: 'bold'
      }
    },
    sizes: {
      xsmall: 10,
      small: 15,
      medium: 20,
      large: 30,
      xlarge: 50
    }
  }
}

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  function onKeyboardWillShow(e) {
    setKeyboardHeight(e.endCoordinates.height)
  }

  function onKeyboardWillHide() {
    setKeyboardHeight(0)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardWillShow)
    Keyboard.addListener('keyboardWillHide', onKeyboardWillHide)
    return () => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardWillShow)
      Keyboard.removeListener('keyboardWillHide', onKeyboardWillHide)
    }
  }, [])

  useEffect(() => {
    if (keyboardHeight > 0) {
      setKeyboardOpen(true)
    } else {
      setKeyboardOpen(false)
    }
  })

  return [keyboardHeight, keyboardOpen]
}