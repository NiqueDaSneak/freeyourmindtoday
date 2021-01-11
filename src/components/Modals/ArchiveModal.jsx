import React from 'react'
import { Modal, View, Text } from 'react-native'
import { BlurView } from 'expo-blur'
import ArchiveToggle from '../ArchiveToggle'

const ArchiveModal = ({visible}) => {
  console.log('here')
  return (
    <Modal
      animationType='slide'
      transparent
      visible={visible}
    >
      <BlurView
        tint='dark'
        intensity={100}
        style={{
          height: '100%',
          width: '100%', 
        }}>

        <View 
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}>
          <Text>P</Text>
        </View>
      </BlurView>
        
    </Modal>
  )
}

export default ArchiveModal