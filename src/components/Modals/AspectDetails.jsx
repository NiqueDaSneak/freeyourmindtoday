import React, {
  useState, useContext, useRef 
} from 'react'
import { 
  Text, 
  View, 
  Button,
  Modal,
  ScrollView
} from 'react-native'
import { BlurView } from 'expo-blur'
import EditableInput from '../EditableInput'
import {
  theme, useKeyboard 
} from '../../assets/utils'
import {
  AspectsContext, ModalContext 
} from '../../state'
import ConsiderationsContainer from '../ConsiderationsContainer'

const AspectDetails = ({
  visible, close 
}) => {
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
        <ScrollView
          contentContainerStyle={{
            marginTop: 50,
            paddingLeft: '4%',
            paddingRight: '4%',
          }}>
          {aspect === 'No Match' ? (
            <Text style={[theme.fonts.types.heading, {
              fontSize: theme.fonts.sizes.medium,
              marginBottom: '4%', 
              color: 'white',
            }]}>No Match</Text>
          ) : (
            <>
              {/* <Text style={{
                color: 'white',
                fontSize: theme.fonts.sizes.medium,
                marginBottom: '4%', 
                textAlign: 'left'
              }}>Aspect Title</Text> */}
                <EditableInput
                  label='Aspect Title'
                editableValue={aspect?.title} />
              {/* <Text style={{
                fontSize: theme.fonts.sizes.medium,
                marginBottom: '4%', 
                color: 'white',
              }}></Text> */}
                <EditableInput
                  label='Why is this important to you?'
                editableValue={aspect?.importanceStatement}
                size="large" />
            </>
          )}
          <View style={{paddingTop: 10}}>
            <ConsiderationsContainer
              hideHelper
              hideActions
              singleAspectId={aspect?.id} />
          </View>
          <Button
            disabled={importanceEditable || titleEditable}
            color="red"
            title="Go Back"
            onPress={close} />
        </ScrollView>
      </BlurView>
    </Modal>
  )
}

export default AspectDetails