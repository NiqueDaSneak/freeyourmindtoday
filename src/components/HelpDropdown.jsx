import React, {
  useState,
  useContext 
} from 'react'
import {
  TouchableOpacity, Text, View 
} from 'react-native'
import { theme } from '../assets/utils'
import { ThemeContext } from '../state'

const HelpDropdown = ({
  text, 
  close, 
  visible, 
  hidden 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  const renderText = () => isExpanded ? text : `${text?.substring(
    0, 100
  )}...`
  return (
    <View style={{
      opacity: visible && !hidden ? 1 : 0,
      height: visible && !hidden ? 80 : 0,
      zIndex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 10,
    }}>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded)
        }}
        style={{
          maxWidth: '100%',
          // borderColor: theme.layout.scheme[colorScheme].accentGrey,
          // borderWidth:  1,
          display: 'flex',
          borderRadius: 15,
          flexDirection: 'row',
          alignItems: 'center', 
          padding: 10,
          justifyContent: 'space-around',
          backgroundColor: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[900],
          marginRight: 10
        }}>
        <Text style={{
          width: '90%',
          fontSize: theme.fonts.sizes.xsmall,
          color: colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[200]
        }}>
          {renderText()}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={close}
        style={{
          backgroundColor: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[900],
          padding: 10,
          borderRadius: 15,
        }}>
        <Text style={{
          fontSize: theme.fonts.sizes.medium,
          color: colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[200]
        }}>X</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HelpDropdown