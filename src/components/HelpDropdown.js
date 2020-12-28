import React, { useState, useContext } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { theme } from '../assets/utils'
import { ExplainersContext, ThemeContext } from '../state'

const HelpDropdown = ({ text, close, visible }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  // const { showAspectsHelper } = explainersState
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  const renderText = () => {
    return isExpanded ? text : `${text?.substring(0, 100)}...` 
  }

  return (
    <View style={{
      display: visible ? 'inherit' : 'none'
    }}>
      <TouchableOpacity onPress={() => {
        setIsExpanded(!isExpanded)
      }
      } style={{
        maxWidth: '100%',
        borderColor: theme.layout.scheme[colorScheme].accentGrey,
        borderWidth:  1,
        display: 'flex',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 10,
        marginBottom: 20,
        justifyContent: 'space-around',
        backgroundColor: theme.layout.scheme[colorScheme].textContainer
      }}>
        <TouchableOpacity onPress={() => close()}>
          <Text style={{
            fontSize: theme.fonts.sizes.medium,
            color: theme.layout.scheme[colorScheme].textColor 
          }}>X</Text>
        </TouchableOpacity>
        <Text style={{
          width: '90%',
          fontSize: theme.fonts.sizes.xsmall,
          color: theme.layout.scheme[colorScheme].textColor 
        }}>
          {renderText()}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default HelpDropdown