import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { theme } from '../assets/utils'
import { ModalContext } from '../state'


const AspectCard = ({ aspect, creator }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  // const [isExpanded, setIsExpanded] = useState(false)

  return creator ? (
    <TouchableOpacity onPress={() => modalDispatch({
      type: 'OPEN_MODAL',
      modalType: 'ADD_NEW_ASPECT' 
    })}>
      <View style={{
        ...styles.card,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: theme.layout.scheme.darkMode.accentGrey,
        backgroundColor: theme.layout.scheme.darkMode.black,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 50,
          color: theme.layout.scheme.darkMode.textColor
        }}>+</Text>
      </View>
    </TouchableOpacity>

  ) : (
    <TouchableOpacity onPress={() => modalDispatch({
      type: 'OPEN_MODAL',
      modalType: 'GET_ASPECT_DETAILS',
      modalData: aspect
    })}>
      <View style={styles.card}>
        <View style={styles.content}>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{aspect?.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: theme.fonts.sizes.small,
    color: theme.layout.scheme.darkMode.textColor,
    textAlign: 'center' 
  },
  titleContainer: {
    backgroundColor: theme.layout.scheme.darkMode.black, 
    color: 'white',
    width: '100%', 
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15,  
    padding: '4%'
  },
  content: {
    backgroundColor: theme.layout.scheme.darkMode.secondaryBackground, 
    height: '90%', 
    width: '100%', 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
  },
  card: {
    width: 175,
    height: 99,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 20,
    marginBottom: 60,
  },
})

export default AspectCard