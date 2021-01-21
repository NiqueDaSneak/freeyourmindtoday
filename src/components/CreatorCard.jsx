import React, {useContext} from 'react'
import {
  Text,
  View,
  TouchableOpacity 
} from 'react-native'
import {theme} from '../assets/utils'
import { ThemeContext } from '../state'

const CreatorCard = ({onPress}) => {

  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        height: 60,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.layout.scheme[colorScheme].third,
        borderRadius: 15,
      }}>
        <Text style={{
          fontSize: theme.fonts.sizes.large,
          color: theme.layout.scheme[colorScheme].black
        }}>+</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CreatorCard