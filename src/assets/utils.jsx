import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const theme = { 
  greyPalette: {
    100: '#e1e1e1',
    200: '#cfcfcf',
    300: '#b1b1b1',
    400: '#9e9e9e',
    500: '#7e7e7e',
    600: '#626262',
    700: '#515151',
    800: '#3b3b3b',
    900: '#222220'
  },
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
        fontWeight: 'bold',
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