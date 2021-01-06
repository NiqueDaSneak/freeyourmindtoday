import React, { useContext, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { theme } from '../assets/utils'
import { ModalContext, ThemeContext } from '../state'


const AspectCard = ({ aspect, creator }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  // const [isExpanded, setIsExpanded] = useState(false)

  return creator ? (
    <TouchableOpacity onPress={() => modalDispatch({
      type: 'OPEN_MODAL',
      modalType: 'ADD_NEW_ASPECT' 
    })}>
      <View style={{
        width: 175,
        height: 99,
        borderRadius: 15,
        marginRight: 20,
        marginBottom: 60,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: theme.layout.scheme[colorScheme].accentGrey,
        backgroundColor: theme.layout.scheme[colorScheme].textContainer,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 50,
          color: theme.layout.scheme[colorScheme].textColor
        }}>+</Text>
      </View>
    </TouchableOpacity>

  ) : (
    <TouchableOpacity onPress={() => modalDispatch({
      type: 'OPEN_MODAL',
      modalType: 'GET_ASPECT_DETAILS',
      modalData: aspect
    })}>
      <View style={{
        width: 175,
        height: 99,
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 20,
        marginBottom: 60,
      }}>
        <View style={{
          backgroundColor: theme.layout.scheme[colorScheme].secondaryBackground, 
          height: '90%', 
          width: '100%', 
          borderTopLeftRadius: 15, 
          borderTopRightRadius: 15, 
        }} />
        <View style={{
          backgroundColor: theme.layout.scheme[colorScheme].textContainer, 
          color: 'white',
          width: '100%', 
          borderBottomLeftRadius: 15, 
          borderBottomRightRadius: 15,  
          padding: '4%'
        }}>
          <Text style={{
            fontSize: theme.fonts.sizes.small,
            color: theme.layout.scheme[colorScheme].textColor,
            textAlign: 'center', 
          }}>{aspect?.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default AspectCard