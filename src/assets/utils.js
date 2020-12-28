import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const theme = { 
  layout: {
    scheme: {
      darkMode: {
        background: '#212121',
        secondaryBackground: '#424242',
        textColor: '#BDBDBD',
        black: 'black',
        accentGrey: '#757575'
      },
      lightMode: {
        
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