import React, {useContext} from 'react'
import {
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native'
import {theme} from '../assets/utils'
import {
  ModalContext,
  ThemeContext 
} from '../state'

const AspectCard = ({
  aspect,
  noMatch 
}) => {
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
        type: 'OPEN',
        modalType: 'GET_ASPECT_DETAILS',
        modalData: noMatch ? 'No Match' : aspect
      })}>
      <View style={{height: '70%'}} />
      <View style={{
        backgroundColor: theme.layout.scheme[colorScheme].textContainer, 
        color: 'white',
        width: '100%', 
        height: '30%',
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15,  
      }}>
        <Text style={{
          fontSize: theme.fonts.sizes.small,
          color: theme.layout.scheme[colorScheme].textColor,
          textAlign: 'center', 
        }}>{noMatch ? 'No Match' : aspect?.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AspectCard