import React, { useState, useContext, useRef } from 'react'
import { 
  Text, 
  View, 
  Button,
  Modal,
  ScrollView
} from 'react-native'
import { BlurView } from 'expo-blur'
import EditableInput from '../EditableInput'
import { theme, useKeyboard } from '../../assets/utils'
import { AspectsContext, ModalContext } from '../../state'
import ConsiderationsContainer from '../ConsiderationsContainer'

const AspectDetails = ({ visible, close }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)
  const aspect = modalState.modalData
  const [titleEditable, setTitleEditable] = useState(false)
  const [importanceEditable, setImportanceEditable] = useState(false)

  return(
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
          <ScrollView
            contentContainerStyle={{
              marginTop: '10%',
              height: '200%',
              paddingLeft: '4%'
            }}>
            <Text style={{
              color: 'white',
              fontSize: theme.fonts.sizes.medium,
              marginBottom: '4%', 
              textAlign: 'left'
            }}>Aspect Title</Text>
            <EditableInput
              aspect={aspect}
              editableValue={aspect?.title} />
            <Text style={{
              fontSize: theme.fonts.sizes.medium,
              marginBottom: '4%', 
              color: 'white',
            }}>Why is this important to you?</Text>
            <EditableInput
              aspect={aspect}
              editableValue={aspect?.importanceStatement}
              size="large" />
            <ConsiderationsContainer
              hideHelper
              singleAspectId={aspect?.id} />
            <Button
              disabled={importanceEditable || titleEditable}
              color="red"
              title="Go Back"
              onPress={close} />
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  )
}

export default AspectDetails