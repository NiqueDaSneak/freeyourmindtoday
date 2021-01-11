import React, {
  useContext
} from 'react'
import {
  Text, View, TouchableOpacity, Image 
} from 'react-native'
import {
  theme 
} from '../assets/utils'
import {
  ModalContext, ThemeContext 
} from '../state'

const CreatorCard = ({onPress, total, completed}) => {

  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  return (
    <View style={{
      width: 100,
      maxHeight: 290,
      // height: 170,
      // height: 166,
      // borderRadius: 15,
      bottom: 0,
      marginRight: 20,
      borderColor: theme.layout.scheme[colorScheme].black,
      // backgroundColor: 'pink',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <TouchableOpacity onPress={onPress}>
        <View style={{
          height: 60,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.layout.scheme[colorScheme].third,
          // backgroundColor: 'red',
          borderRadius: 15,
          marginBottom: 10
        }}>
          <Text style={{
            fontSize: theme.fonts.sizes.large,
            color: theme.layout.scheme[colorScheme].black
          }}>+</Text>
        </View>
      </TouchableOpacity>

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
            // marginBottom: 20,
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
    </View>
  )
}
  

export default CreatorCard