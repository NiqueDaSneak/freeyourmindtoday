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
  ModalContext
} from '../state'
import showConsiderationActions from './Modals/showConsiderationActions'

const Consideration = ({
  style,
  data,
}) => {
  const [modalDispatch] = useContext(ModalContext)
  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  
  return (
    <TouchableOpacity
      onPress={ () => showConsiderationActions(
        modalDispatch, considerationDispatch, data?.type, data 
      ) }
      style={{
        ...style,
        backgroundColor: 'grey',
        marginRight: 10,
        marginBottom: 20,
        width: 150,
        height: 170,
        borderRadius: 12,
        justifyContent: 'space-between'
      }}>
      <View style={{padding: 10,}}>
        <Text style={{fontSize: theme.fonts.sizes.small}}>{data?.title}</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
        <Text style={{ fontSize: theme.fonts.sizes.xsmall }}>
          {data?.type === 'long' && (
            `${moment(data?.createdAt).format("M/D/YYYY")}`
          )}
          {data?.type === 'short' && (
            `${moment(data?.createdAt).fromNow()}`
          )}
        </Text>
        <View style={{
          backgroundColor: data?.deleted ? 'red' : data?.completed ? 'green' : data?.priority ? 'gold' : 'white',
          borderLeftWidth: 1,
          borderTopWidth: 1,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 4,
          paddingBottom: 4,
          marginLeft: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
        }}>
          <Text style={{fontSize: theme.fonts.sizes.medium}}>
            {data?.type === 'long' ? "L" : "S"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Consideration