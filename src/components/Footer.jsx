import React from 'react'
import {
  SafeAreaView,
  View, 
} from 'react-native'
import { theme } from '../assets/utils'

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
      <View style={{
        width: 40,
        height: 40,
        backgroundColor: 'pink',
        borderRadius: '100%'
      }} />
    </SafeAreaView>
  </View>
)

export default Footer