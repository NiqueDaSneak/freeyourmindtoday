import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text, 
  View, 
  TouchableOpacity,
} from 'react-native'
import { theme } from '../assets/utils'

// const styles = StyleSheet.create({
//   footer: {
//     height: '10%',
//     width: '100%',
//     backgroundColor: 'grey',
//     position: 'absolute',
//     bottom: 0,
//     zIndex: 1
//   },
//   plus: {
//     fontSize: theme.fonts.sizes.xlarge,
//     color: 'white',
//     textAlign: 'center'
//   }
// })
const Footer = () => (
  <View style={{
    height: '10%',
    width: '100%',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    zIndex: 1
  }}>
    <SafeAreaView>
      <View style={{width: 40, height: 40, backgroundColor: 'pink', borderRadius: '100%'}}></View>
    </SafeAreaView>
  </View>
  // <View style={styles.footer}>
  //   <TouchableOpacity onPress={() => console.log('pressed')}>
  //     <Text style={styles.plus}>+</Text>
  //   </TouchableOpacity>
  // </View>
)

export default Footer