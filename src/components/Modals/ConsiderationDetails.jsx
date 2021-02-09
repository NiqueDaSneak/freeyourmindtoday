import React, {useContext} from 'react'
import {
  Modal, Platform , Button
} from 'react-native'
import { BlurView } from 'expo-blur'
import { ThemeContext } from '../../state'

const ConsiderationDetails = ({ visible, close }) => {
  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState
  return (
    <Modal
      animationType='slide'
      transparent={Platform.OS !== 'android'}
      visible={visible}
    >
      <BlurView
        tint={colorScheme}
        intensity={100}
        style={{
          height: '100%',
          width: '100%' 
        }}>
        <Button
          color="red"
          title="Go Back"
          onPress={() => {
            close()
            // modalDispatch({type: 'CLOSE'})
            // resetForm()
          }} />
      </BlurView>
    </Modal>
  )
}

export default ConsiderationDetails