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
  AspectsContext, ModalContext, ThemeContext 
} from '../../state'
import ConsiderationsContainer from '../ConsiderationsContainer'

const AspectDetails = ({
  visible, close 
}) => {
  const [aspectsState, aspectsDispatch] = useContext(AspectsContext)

  const [modalState, modalDispatch] = useContext(ModalContext)
  const aspect = modalState.modalData
  const [titleEditable, setTitleEditable] = useState(false)
  const [importanceEditable, setImportanceEditable] = useState(false)
  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

  return(
    <Modal
      animationType='slide'
      transparent
      visible={visible}
    >
      <BlurView
        tint={colorScheme}
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
              color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400],
            }]}>No Match</Text>
          ) : (
            <View style={{
              height: 300,
              justifyContent: 'space-evenly',
            }}>
              <EditableInput
                label='Aspect Title'
                editableValue={aspect?.title} 
                onSave={(val) => {
                  aspectsDispatch({
                    type: 'UPDATE_TITLE',
                    id: aspect?.id,
                    newTitle: val
                  })
                } 
                }                  
              />
              <EditableInput
                label='Why is this important to you?'
                editableValue={aspect?.importanceStatement}
                size="large"
                onSave={(val) => aspectsDispatch({
                  type: 'UPDATE_IMPORT',
                  id: aspect?.id,
                  newImport: val
                })} />
            </View>
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