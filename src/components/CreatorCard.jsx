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
        backgroundColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[200],
        borderRadius: 15,
      }}>
        <Text style={{
          fontSize: theme.fonts.sizes.large,
          color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[500]
        }}>+</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CreatorCard