import React, {useContext} from 'react'
import {
  Image,
  View, 
  Text,
  Touchable
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/utils'
// import { theme } from '../assets/utils'
import { ThemeContext } from '../state'

const Footer = () => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  const route = useRoute()

  const tabs = [
    {
      label: 'Affirmations',
      icon: colorScheme === 'dark' ? require('../assets/affirmations-icon-dark.png') : require('../assets/affirmations-icon-light.png') 
    },
    {
      label: 'Aspects',
      icon: colorScheme === 'dark' ? require('../assets/aspects-icon-dark.png')  : require('../assets/aspects-icon-light.png') 
    },
    {
      label: 'Settings',
      icon: colorScheme === 'dark' ? require('../assets/settings-dark.png') : require('../assets/settings-light.png') 
    },
  ]

  const getCurrentBackgroundColor = (buttonText) => {
    const isActive = route.name === buttonText
    if (colorScheme === 'dark' && isActive) { 
      return theme.greyPalette[800]
    }
    if (colorScheme === 'light' && isActive) {
      return theme.greyPalette[100]
    }
    return null
  }
  return (
    <View style={{
      height: '10%',
      width: '100%',
      backgroundColor: colorScheme === 'dark' ? theme.greyPalette[700]: theme.greyPalette[200],
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: .2,
      borderColor: colorScheme === 'dark' ? theme.greyPalette[800]: theme.greyPalette[200]
    }}>
      {tabs.map(tab => (
        <TouchableOpacity key={tab.label}>
          <View
            style={{
              backgroundColor: getCurrentBackgroundColor(tab.label),
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: `${100 / tabs.length}%`,
              paddingBottom: 20,
            }}>
            <Image 
              resizeMode="contain"
              resizeMethod="resize"
              style={{
                resizeMode: 'contain',
                height: 22,
                width: 22,
                marginBottom: 10
              }} 
              source={tab.icon} />
            <Text style={{
              color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[900],
              fontSize: 10
            }}>{tab.label}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}


export default Footer