import React, { useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { theme } from '../assets/utils'
import { ConsiderationsContext, ModalContext, ThemeContext } from '../state'
import showConsiderationActions from './Modals/showConsiderationActions'
const Consideration = ({ style, data, creator, type, disabled }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return creator ? (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <TouchableOpacity disabled={disabled} onPress={() => modalDispatch({
        type: 'OPEN_MODAL',
        modalType: type === 'short' ? 'ADD_SHORT_CONSIDERATION' : 'ADD_LONG_CONSIDERATION' 
      })}>
        <View style={{
          minHeight: 80,
          marginBottom: 10,
          marginRight: 10,
          padding: 10,
          borderRadius: 20,
          flexDirection: 'row',
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: theme.layout.scheme[colorScheme].accentGrey,
          backgroundColor: disabled ? 'grey' : theme.layout.scheme[colorScheme].textContainer,
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          width: 90,
        }}>
          <Text style={{
            fontSize: 50,
            color: disabled ? 'darkgrey' : theme.layout.scheme[colorScheme].textColor
          }}>+</Text>
        </View>
      </TouchableOpacity>
      {disabled && (
        <Text style={{
          width: '50%',
          fontSize: theme.fonts.sizes.small,
          color: theme.layout.scheme[colorScheme].textColor 
        }}>You must add at least three Aspects before you can create considerations.</Text>
      )}
    </View>
  ) : (
    <TouchableOpacity 
      onPress={() => showConsiderationActions(modalDispatch, considerationDispatch, type, data )}
      key={data?.title} 
      style={[{
        height: 80,
        marginBottom: 10,
        marginRight: 10,
        padding: 4,
        borderColor: theme.layout.scheme[colorScheme].accentGrey,
        backgroundColor: theme.layout.scheme[colorScheme].secondaryBackground,
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

// const styles = StyleSheet.create({
//   containerStyle: {
//     minHeight: 80,
//     marginBottom: 10,
//     marginRight: 10,
//     padding: 10,
//     borderColor: theme.layout.scheme[colorScheme].accentGrey,
//     backgroundColor: theme.layout.scheme[colorScheme].secondaryBackground,
//     borderWidth: 1, 
//     borderRadius: 20,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around'
//   },
//   taskBtn: {
//     fontSize: theme.fonts.sizes.large,
//     color: theme.layout.scheme[colorScheme].textColor
//   },
//   taskText: {
//     paddingLeft: 20,
//     width: 200,
//     fontSize: theme.fonts.sizes.small,
//   }
// })
export default Consideration