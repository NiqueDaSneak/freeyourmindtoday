import React, { useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { theme } from '../assets/utils'
import { ConsiderationsContext, ModalContext } from '../state'
import showConsiderationActions from './Modals/showConsiderationActions'
const Consideration = ({ style, data, creator, type }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  return creator ? (
    <TouchableOpacity onPress={() => modalDispatch({
      type: 'OPEN_MODAL',
      modalType: type === 'short' ? 'ADD_SHORT_CONSIDERATION' : 'ADD_LONG_CONSIDERATION' 
    })}>
      <View style={{
        ...styles.containerStyle,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'lightgrey',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        width: 90,
        // height: 80
      }}>
        <Text style={{
          fontSize: 50,
          color: 'grey' 
        }}>+</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity 
      onPress={() => showConsiderationActions(modalDispatch, considerationDispatch, type, data )}
      key={data?.title} 
      style={[styles.containerStyle, style]}>
      <View>
        <Text style={styles.taskBtn}>+</Text>
      </View>
      <View style={styles.taskText}>
        <Text>{data?.title}</Text>
      </View>
    </TouchableOpacity>  
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    minHeight: 80,
    marginBottom: 10,
    marginRight: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  taskBtn: {
    fontSize: theme.fonts.sizes.large,
  },
  taskText: {
    paddingLeft: 20,
    width: 200,
    fontSize: theme.fonts.sizes.small
  }
})
export default Consideration