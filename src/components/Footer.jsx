import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
} from 'react-native'
import { theme } from '../assets/utils'
// import {useModal} from '../hooks/modal.hook'

const Footer = () => {
  
  return(
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => console.log('pressed')}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  footer: {
    height: '10%',
    width: '100%',
    backgroundColor: 'grey',
    position: 'absolute',
    bottom: 0,
    zIndex: 1
  },
  plus: {
    fontSize: theme.fonts.sizes.xlarge,
    color: 'white',
    textAlign: 'center'
  }
})

export default Footer