import React, {useContext} from 'react'
import {
  View, Image, Text, TouchableOpacity 
} from 'react-native'
import {
  ThemeContext, ModalContext 
} from '../state'
import {theme} from '../assets/utils'

const ArchiveToggle = ({
  completed,
  total
}) => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [modalState, modalDispatch] = useContext(ModalContext)

  return (    
    <TouchableOpacity onPress={() => modalDispatch({
      type: 'OPEN',
      modalType: 'ARCHIVE'
    })}>
      <View style={{
        backgroundColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[200],
        height: 60,
        width: 70,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            resizeMode: 'contain',
            height: 20,
            width: 20,
            marginBottom: 4,
          }}
          source={colorScheme === 'dark' ? require('../assets/archive-dark.png') : require('../assets/archive-light.png')} />
        <Text style={{
          fontSize: theme.fonts.sizes.small,
          color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[700]
        }}>
          {completed !== undefined ? (
            <Text>{`${completed}/${total}`} </Text> 
          ): (
            <Text>{`${total}`} </Text> 
          )}
        </Text>
      </View>
    </TouchableOpacity>
  )

}

export default ArchiveToggle