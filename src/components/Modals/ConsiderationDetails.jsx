import React, {useContext} from 'react'
import {
  Modal, Platform , Button, SafeAreaView, Text, View, ScrollView, TouchableOpacity
} from 'react-native'
import { BlurView } from 'expo-blur'
import { ThemeContext } from '../../state'
import EditableInput from '../EditableInput'
import { theme } from '../../assets/utils'
import CreatorCard from '../CreatorCard'

const ConsiderationDetails = ({
  visible, close 
}) => {
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
        <SafeAreaView style={{margin: '4%'}}>
          <EditableInput
            label='Shared Task Title'
            editableValue='Hello world'
            size="small"
            // onSave={(val) => aspectsDispatch({
            //   type: 'UPDATE_IMPORT',
            //   id: aspect?.id,
            //   newImport: val
            // })}
          />
          <View style={{
            display: 'flex',
            flexDirection: 'row', 
            marginBottom: 20,  
            alignItems: 'center',
            justifyContent: 'space-between', 
            marginRight: 10,
          }}>
            <Text style={[theme.fonts.types.subHeading, {color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400]}]}>
              Why is this important to us?
            </Text>
            <CreatorCard
              // onPress={() => {
              //   modalDispatch({
              //     type: 'OPEN',
              //     modalType: 'CHOOSE_TYPE',
              //     modalData: singleAspect
              //   })
              // }} 
            />
          </View>
          {/* <View style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap'
          }}> */}
          <ScrollView 
            contentContainerStyle={{marginTop: 10}}
            horizontal 
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}
          >
            {[{
              text: 'Proin tellus mauris, sodales nec mollis at, mollis tincidunt ligula.',
              username: '@niquedasneak'
            }].map(el => (
              <View style={{
                backgroundColor: colorScheme === 'dark' ? 'grey' : theme.greyPalette[200],
                marginRight: 10,
                marginBottom: 20,
                width: 150,
                height: 170,
                borderRadius: 12,
                padding: 10,
                justifyContent: 'space-between'
              }}>
                <Text style={{
                  fontSize: theme.fonts.sizes.small,
                  color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800] 
                }}>{el.text}</Text>
                <Text style={{
                  fontSize: theme.fonts.sizes.xsmall,
                  color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800] 
                }}>{el.username}</Text>
              </View>
            ))}
          </ScrollView>
          {/* </View> */}
          <View style={{
            display: 'flex',
            flexDirection: 'row', 
            marginBottom: 20,  
            alignItems: 'center',
            justifyContent: 'space-between', 
            marginRight: 10,
          }}>
            <Text style={[theme.fonts.types.subHeading, {color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400]}]}>
              Participants
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center', 
            }}>
              <Text style={[{
                fontSize: theme.fonts.sizes.small,
                paddingRight: '4%',
                color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400]
              }]}>Invite More</Text>
              <TouchableOpacity onPress={() => console.log('share')}>
                <View style={{
                  height: 60,
                  width: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[200],
                  borderRadius: 15,
                }}>
                  <Text style={{
                    fontSize: theme.fonts.sizes.large,
                    color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[500]
                  }}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            color="red"
            title="Go Back"
            onPress={() => {
              close()
            // modalDispatch({type: 'CLOSE'})
            // resetForm()
            }} />
        </SafeAreaView>
      </BlurView>
    </Modal>
  )
}

export default ConsiderationDetails