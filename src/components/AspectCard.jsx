import React, {useContext} from 'react'
import {
  Text, 
  View, 
  TouchableOpacity, 
  Touchable
} from 'react-native'
import { color } from 'react-native-reanimated'
import {theme} from '../assets/utils'
import {
  ModalContext,
  ThemeContext,
  ConsiderationsContext
} from '../state'

const AspectCard = ({
  aspect,
  noMatch,
  index
}) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  const {considerations} = considerationState
  // console.log(' considerations.filter', )

  const renderGradientBackgrounds = () => {
    // if (index + 1) {}
    // console.log('index % 1', index % 1)
    return theme.greyPalette[600]
  }
  return (
    <TouchableOpacity
      onPress={() => modalDispatch({
        type: 'OPEN',
        modalType: 'GET_ASPECT_DETAILS',
        modalData: noMatch ? 'No Match' : aspect
      })}
      style={{
        marginRight: 10,
        marginBottom: 20,
        width: 200,
        height: 160,
        borderRadius: 12,
      }}>
      <View
        style={{
          backgroundColor: renderGradientBackgrounds(),
          // backgroundColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[300],
          width: '100%',
          height: '70%',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12
        }} />
      <View style={{
        borderColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[100],
        borderTopWidth: 1,
        width: '100%',
        height: '30%',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colorScheme === 'dark' ? theme.greyPalette[700] : theme.greyPalette[200],
      }}>
        <View style={{
          width: '86%',
          justifyContent: 'center',
          borderBottomLeftRadius: 12
        }}>
          <Text style={{
            paddingLeft: 10,
            paddingRight: 10,
            textAlign: 'left',
            color: colorScheme === 'dark' ? theme.greyPalette[300]: theme.greyPalette[700],
          }}>{noMatch ? 'No Match' : aspect?.title}</Text>
        </View>
        <View style={{
          borderLeftWidth: 1,
          borderColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[100],
          paddingTop: 4,
          paddingBottom: 4,
          width: '14%',
          justifyContent: 'center',
          // backgroundColor:  colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[300],
          borderBottomRightRadius: 12
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: theme.fonts.sizes.medium,
            color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[500],
          }}>{considerations.filter(el => el.aspectId === aspect?.id).length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default AspectCard