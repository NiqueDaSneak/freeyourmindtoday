import React, {useState, useContext} from 'react'
import { Modal, View, Text, Button } from 'react-native'
import { BlurView } from 'expo-blur'
import SegmentedControl from '@react-native-community/segmented-control';
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useKeyboard, theme } from '../../assets/utils'
import {ThemeContext, AspectsContext, ExplainersContext} from '../../state'
import HelpDropdown from '../HelpDropdown'

const ArchiveModal = ({visible, close}) => {
  const [date, setDate] = useState(new Date());

  const [aspectPicker, setAspectPicker] = useState('Hello World')
  const [keyboardHeight] = useKeyboard()
  const [segmentIndex, setSegmentIndex] = useState(0)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [aspectState, aspectsDispatch] = useContext(AspectsContext)
  const { aspects } = aspectState
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  const { content, showAspectsHelper } = explainersState

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
        <View style={{
          position: 'absolute',
          width: '100%',
          bottom: keyboardHeight + 30,
        }}>
          <View style={{marginLeft: '5%', width: '90%', height: 150, justifyContent: 'space-around' }}>
            <Text style={[theme.fonts.types.heading, {
              textAlign: 'center',
              color: theme.layout.scheme[colorScheme].textColor
            }]}>Archive</Text>
            <HelpDropdown 
              visible={explainersState.showArchiveHelper}
              close={() => explainersDispatch({type: 'CLOSE_ARCHIVE_HELPER'})} 
              text={content.archiveHelper} />

            <SegmentedControl
              values={['By Date', 'By Aspect']}
              selectedIndex={segmentIndex}
              onChange={(event) => {
                setSegmentIndex(event.nativeEvent.selectedSegmentIndex)
              }}
            />
          </View>
          <View style={{height: 200, width: '100%', justifyContent: 'center'}}>
            {segmentIndex === 0 && (
              <View style={{width: '100%'}}>
                <DateTimePicker
                  textColor="white"
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour
                  display="spinner"
                  onChange={(event, selectedDate) => setDate(selectedDate)} />
              </View>
            )}
            {segmentIndex === 1 && (
              <Picker
                selectedValue={aspectPicker}
                style={{
                  width: '100%',
                  height: '100%'
                }}
                itemStyle={{
                  color: 'white'
                }}
                onValueChange={(itemValue) => {
                  setAspectPicker(itemValue)
                }}
              >
                {aspects.map(aspect => (
                  <Picker.Item
                    key={aspect?.title}
                    label={aspect?.title}
                    value={aspect?.id} />
                ))}

              </Picker>

            )}
          </View>

          <Button
            color="red"
            title="Close"
            onPress={close} />
        </View>
      </BlurView>
        
    </Modal>
  )
}

export default ArchiveModal