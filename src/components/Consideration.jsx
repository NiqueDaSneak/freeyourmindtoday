import React, {
 useContext 
} from 'react'
import {
 View, TouchableOpacity, Text, StyleSheet 
} from 'react-native'
import {
 theme 
} from '../assets/utils'
import {
 ConsiderationsContext, ModalContext, ThemeContext 
} from '../state'
import showConsiderationActions from './Modals/showConsiderationActions'

const Consideration = ({
 style, data, type, disabled 
}) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return (
    <TouchableOpacity 
      onPress={() => showConsiderationActions(modalDispatch, considerationDispatch, type, data )}
      key={data?.title}
      style={[{
        height: 80,
        marginRight: 10,
        marginBottom: 20,
        padding: 4,
        borderColor: theme.layout.scheme[colorScheme].accentGrey,
        backgroundColor: theme.layout.scheme[colorScheme].secondary,
        borderWidth: 1, 
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      }, style]}>
      <View>
        <Text style={{
          fontSize: theme.fonts.sizes.large,
          color: theme.layout.scheme[colorScheme].textColor
        }}>+</Text>
      </View>
      <View style={{
        paddingLeft: 20,
        width: 200,
        fontSize: theme.fonts.sizes.small,
      }}>
        <Text style={{
          color: theme.layout.scheme[colorScheme].textColor
        }}>{data?.title}</Text>
      </View>
    </TouchableOpacity>  
  )
}

export default Consideration