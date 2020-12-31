import React, { useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { theme } from '../assets/utils'
import { ConsiderationsContext, ModalContext, ThemeContext } from '../state'
import showConsiderationActions from './Modals/showConsiderationActions'
const Consideration = ({ style, data, creator, type }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return creator ? (
    <TouchableOpacity onPress={() => modalDispatch({
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
        backgroundColor: theme.layout.scheme[colorScheme].textContainer,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        width: 90,
      }}>
        <Text style={{
          fontSize: 50,
          color: theme.layout.scheme[colorScheme].textColor
        }}>+</Text>
      </View>
    </TouchableOpacity>
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