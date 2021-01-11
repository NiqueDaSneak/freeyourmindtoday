import React, {
  useContext 
} from 'react'
import {
  Text, View, TouchableOpacity 
} from 'react-native'
import {
  theme 
} from '../assets/utils'
import {
  ModalContext, ThemeContext 
} from '../state'


const AspectCard = ({ aspect }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return (
    <TouchableOpacity
      style={{
        width: 180,
        height: 130,
        backgroundColor: theme.layout.scheme[colorScheme].secondary, 
        borderRadius: 15,
        marginRight: 20,
        marginBottom: 30,
      }}
      onPress={() => modalDispatch({
        type: 'OPEN_MODAL',
        modalType: 'GET_ASPECT_DETAILS',
        modalData: aspect
      })}>
      <View style={{height: '70%'}} />
      <View style={{
        backgroundColor: theme.layout.scheme[colorScheme].textContainer, 
        color: 'white',
        width: '100%', 
        height: '30%',
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15,  
        // padding: '4%'
      }}>
        <Text style={{
          fontSize: theme.fonts.sizes.small,
          color: theme.layout.scheme[colorScheme].textColor,
          textAlign: 'center', 
        }}>{aspect?.title}</Text>
      </View>

      {/* <View style={{
        width: 130,
        height: 130,
        backgroundColor: 'white',
        borderRadius: 15,
        marginRight: 20,
        marginBottom: 60,
      }}>
        <View style={{
          backgroundColor: theme.layout.scheme[colorScheme].secondary, 
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
      </View> */}
    </TouchableOpacity>
  )
}

export default AspectCard