import React, { useState, useContext } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { theme } from '../assets/utils'
import { ExplainersContext } from '../state'

const HelpDropdown = ({ text, close, visible }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  // const { showAspectsHelper } = explainersState
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
        borderColor: 'darkgrey',
        borderWidth:  1,
        display: 'flex',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 10,
        marginBottom: 20,
        justifyContent: 'space-around',
      }}>
        <TouchableOpacity onPress={() => close()}>
          <Text style={{
            fontSize: theme.fonts.sizes.medium 
          }}>X</Text>
        </TouchableOpacity>
        <Text style={{
          width: '90%',
          fontSize: theme.fonts.sizes.xsmall
        }}>
          {renderText()}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default HelpDropdown