import React, {useContext} from 'react'
import { View, Image, Text } from 'react-native'
import { ThemeContext } from '../state'
import {
  theme 
} from '../assets/utils'

const ArchiveToggle = ({completed, total}) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return (    
    <View style={{
      backgroundColor: theme.layout.scheme[colorScheme].third,
      width: '100%',
      height: 80,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image 
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          resizeMode: 'contain',
          height: 30,
          width: 30,
        }} 
        source={require('../assets/archive.png')} />
      <Text style={{
        fontSize: theme.fonts.sizes.small
      }}>
        {completed !== undefined ? (
          <Text>{`${completed}/${total}`} </Text> 
        ): (
          <Text>{`${total}`} </Text> 
        )}
      </Text>
    </View>
  )

}

export default ArchiveToggle