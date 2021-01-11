import React from 'react'
import { Modal, View, Text, Button } from 'react-native'
import { BlurView } from 'expo-blur'
import SegmentedControl from '@react-native-community/segmented-control';
import ArchiveToggle from '../ArchiveToggle'

const ArchiveModal = ({visible, close}) => {
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
          <SegmentedControl
            values={['One', 'Two']}
            // selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              // this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
          />
          <Text>P</Text>
          <Button color="red" title="Close" onPress={close} />
        </View>
      </BlurView>
        
    </Modal>
  )
}

export default ArchiveModal