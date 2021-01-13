import React, {useContext} from 'react'
import {
  View, TouchableOpacity, Text
} from 'react-native'
import {theme} from '../assets/utils'
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
  const {
    colorScheme 
  } = themeState

  // console.log(data)
  return (
    <TouchableOpacity style={{
      backgroundColor: 'grey',
      marginRight: 10,
      marginBottom: 20,
      width: 150,
      height: 170,
      borderRadius: 12,
      justifyContent: 'space-between'
      // borderWidth: 2,
      // borderColor: 'black'
    }}>
      <View style={{
        padding: 10,
      }}>
        <Text style={{fontSize: theme.fonts.sizes.small}}>{data?.title}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: theme.fonts.sizes.xsmall
        }}>10 days ago</Text>
        <View style={{
          backgroundColor: 'red',
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 4,
          paddingBottom: 4,
          marginLeft: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
          <Text style={{
            fontSize: theme.fonts.sizes.medium
          }}>
            {type === 'long' ? "L" : "S"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
  // return (
  //   <TouchableOpacity 
  //     onPress={() => showConsiderationActions(modalDispatch, considerationDispatch, type, data )}
  //     key={data?.title}
  //     style={[{
  //       height: 80,
  //       marginRight: 10,
  //       marginBottom: 20,
  //       padding: 4,
  //       borderColor: theme.layout.scheme[colorScheme].accentGrey,
  //       backgroundColor: theme.layout.scheme[colorScheme].secondary,
  //       borderWidth: 1, 
  //       borderRadius: 20,
  //       display: 'flex',
  //       flexDirection: 'row',
  //       alignItems: 'center',
  //       justifyContent: 'space-around'
  //     }, style]}>
  //     <View>
  //       <Text style={{
  //         fontSize: theme.fonts.sizes.large,
  //         color: theme.layout.scheme[colorScheme].textColor
  //       }}>+</Text>
  //     </View>
  //     <View style={{
  //       paddingLeft: 20,
  //       width: 200,
  //       fontSize: theme.fonts.sizes.small,
  //     }}>
  //       <Text style={{
  //         color: theme.layout.scheme[colorScheme].textColor
  //       }}>{data?.title}</Text>
  //     </View>
  //   </TouchableOpacity>  
  // )
}

export default Consideration