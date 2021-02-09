import React, {useContext} from 'react'
import {
  View, 
  TouchableOpacity, 
  Text
} from 'react-native'
import moment from 'moment'
import {theme} from '../assets/utils'
import {
  ConsiderationsContext,
  ModalContext,
  ThemeContext
} from '../state'
import showConsiderationActions from './Modals/showConsiderationActions'

const Consideration = ({
  style,
  data,
}) => {
  const [modalState,modalDispatch] = useContext(ModalContext)
  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

  return (
    <TouchableOpacity
      onPress={() => modalDispatch({
        type: 'OPEN',
        modalType: 'CONSIDERATION_DETAILS'
      })}
      // onPress={ () => showConsiderationActions(
      //   modalDispatch, considerationDispatch, data?.type, data 
      // ) }
      style={{
        ...style,
        backgroundColor: colorScheme === 'dark' ? 'grey' : theme.greyPalette[200],
        marginRight: 10,
        marginBottom: 20,
        width: 150,
        height: 170,
        borderRadius: 12,
        justifyContent: 'space-between'
      }}>
      <View style={{padding: 10,}}>
        <Text style={{
          fontSize: theme.fonts.sizes.small,
          color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800] 
        }}>{data?.title}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: theme.fonts.sizes.xsmall,
          color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800] 
        }}>
          {data?.type === 'long' && (
            `${moment(data?.createdAt).format("M/D/YYYY")}`
          )}
          {data?.type === 'short' && (
            `${moment(data?.createdAt).fromNow()}`
          )}
        </Text>
        <View style={{
          backgroundColor: data?.deleted ? 'red' : data?.completed ? 'green' : data?.priority ? 'gold' : colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[100],
          borderLeftWidth: 1,
          borderTopWidth: 1,
          borderColor: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[300],
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 4,
          paddingBottom: 4,
          marginLeft: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
          <Text style={{
            fontSize: theme.fonts.sizes.medium,
            color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[300]
          }}>
            {data?.type === 'long' ? "L" : "S"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Consideration