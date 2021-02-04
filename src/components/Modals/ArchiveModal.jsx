import React, {
  useState, useContext
} from 'react'
import {
  Modal, 
  View, 
  Text, 
  Button, 
  ScrollView,
  Platform,
  FlatList 
} from 'react-native'
import { BlurView } from 'expo-blur'
import SegmentedControl from '@react-native-community/segmented-control';
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  useKeyboard, theme 
} from '../../assets/utils'
import {
  ThemeContext, AspectsContext, ExplainersContext, ConsiderationsContext
} from '../../state'
import HelpDropdown from '../HelpDropdown'
import Consideration from '../Consideration'
import { color } from 'react-native-reanimated';

const ArchiveModal = ({
  visible, close
}) => {
  const [date, setDate] = useState(new Date());

  const [aspectState, aspectsDispatch] = useContext(AspectsContext)
  const { aspects } = aspectState
  const [aspectPicker, setAspectPicker] = useState('No Match')
  const [keyboardHeight] = useKeyboard()
  const [segmentIndex, setSegmentIndex] = useState(0)
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  const {
    content, showAspectsHelper 
  } = explainersState
  const [considerationsState, considerationsDispatch] = useContext(ConsiderationsContext)
  const { considerations } = considerationsState
  
  const renderArchivedData = () => {
    // if (segmentIndex === 0) {
       
    // } 
    if (segmentIndex === 0) {
      return considerations.filter(consideration => consideration.completed && consideration.aspectId === aspectPicker)
    } 
  }

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
          width: '100%', 
          justifyContent: 'space-between'
        }}>
        <View style={{
          width: '100%',
          justifyContent: 'space-between',
          height: '55%',
          paddingTop: 30,
          paddingBottom: 30,

        }}>
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-around'}}
            contentContainerStyle={{padding: 20,}}
            keyExtractor={(
              item, index
            ) => `${index}`}
            numColumns={2}
            data={renderArchivedData()}
            renderItem={({ item: consideration }) => (
              <Consideration data={consideration} />
            )} />

        </View>
        <View style={{
          width: '100%',
          height: '45%',
          justifyContent: 'space-between',
          paddingBottom: 30,
        }}>
          <View style={{
            marginLeft: '5%',
            width: '90%',
            justifyContent: 'space-around',
          }}>
            <Text style={[theme.fonts.types.heading, {
              textAlign: 'center',
              color: colorScheme === 'dark' ? theme.greyPalette[100] : theme.greyPalette[700],
              // marginBottom: 10
            }]}>Archive</Text>
            {/* <HelpDropdown 
              visible={explainersState.showArchiveHelper}
              close={() => explainersDispatch({type: 'CLOSE_ARCHIVE_HELPER'})} 
              text={content.archiveHelper} /> */}
            <View style={{paddingTop: 20}}>
              <SegmentedControl
              // values={['By Date', 'By Aspect']}
                values={['By Aspect']}
                selectedIndex={segmentIndex}
                onChange={(event) => {
                  setSegmentIndex(event.nativeEvent.selectedSegmentIndex)
                }}
              />
            </View>
          </View>
          <View style={{
            width: '100%',
            justifyContent: 'center'
          }}>
            {/* {segmentIndex === 0 && (
              <View style={{width: '100%'}}>
                <DateTimePicker
                  textColor="white"
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour
                  display="spinner"
                  onChange={(
                    event, selectedDate
                  ) => setDate(selectedDate)} />
              </View>
            )} */}
            {segmentIndex === 0 && (
              <Picker
                selectedValue={aspectPicker}
                style={{
                  width: '100%',
                }}
                itemStyle={{color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800]}}
                onValueChange={(itemValue) => {
                  setAspectPicker(itemValue)
                }}
              >
                <Picker.Item
                  key='No Match'
                  label='No Match'
                  value='No Match' />
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