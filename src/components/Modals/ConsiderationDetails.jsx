import React, {
  useContext, useState
} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Modal, 
  Platform , 
  Button, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image
} from 'react-native'
import { BlurView } from 'expo-blur'
import { QRCode } from 'react-native-custom-qr-codes-expo'
import {
  AuthContext,
  ModalContext,
  ThemeContext 
} from '../../state'
import EditableInput from '../EditableInput'
import { theme } from '../../assets/utils'
import CreatorCard from '../CreatorCard'

const ConsiderationDetails = ({
  visible, 
  close, 
  aspect,
  consideration = {} 
}) => {
  const [authState, authDispatch] = useContext(AuthContext)
  const {activeUser} = authState
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [shareActive, setShareActive] = useState(false)
  const [modalState, modalDispatch] = useContext(ModalContext)
  const {
    participants, admin
  } = consideration

  const selfParticipant = participants?.find(person => person.id === activeUser.id)

  return (
    <Modal
      animationType='slide'
      transparent={Platform.OS !== 'android'}
      visible={visible}>
      <BlurView
        tint={colorScheme}
        intensity={100}
        style={{
          height: '100%',
          width: '100%' 
        }}>
        <ScrollView contentContainerStyle={{
          paddingBottom: 80,
          padding: '4%'
        }}>
          <SafeAreaView>
            <EditableInput
              label='Shared Task Title'
              editableValue={consideration?.title}
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
              marginTop: 20,  
              marginBottom: 20,  
              alignItems: 'center',
              justifyContent: 'space-between', 
              // marginRight: 10,
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
                <View
                  key={el.text}
                  style={{
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
            <View style={{
              flexDirection: 'row',
              width: '100%',
              height: '14%',
              marginBottom: '4%'
            }}>

              <View style={{
                justifyContent: 'space-evenly',
                width: '50%'
              }}>
                <Text style={{
                  ...theme.fonts.types.subHeading,
                  color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400]
                }}>Personal Stats</Text>
                <Text style={{
                  color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400],
                  fontSize: theme.fonts.sizes.small,
                }}>Count: {selfParticipant?.count}</Text>
                <Text style={{
                  color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400],
                  fontSize: theme.fonts.sizes.small,
                }}>Weekly Average: 4.2</Text>
              </View>
              <View style={{
                width: '50%',
                // backgroundColor: 'blue',
                // alignContent: 'center',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}>
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
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row', 
              marginBottom: 20,  
              alignItems: 'center',
              justifyContent: 'space-between', 
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
                }]}>{shareActive ? 'Hide Code' : 'Invite More' }</Text>
                <TouchableOpacity onPress={() => setShareActive(!shareActive)}>
                  <View style={{
                    height: 60,
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[200],
                    borderRadius: 15,
                  }}>
                    {!!shareActive && (
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{
                          resizeMode: 'contain',
                          height: 24,
                          width: 24,
                        }}
                        source={colorScheme === 'dark' ? require('../../assets/go-back-arrow-dark.png') : require('../../assets/go-back-arrow-light.png')} 
                      />
                    )}
                    {!shareActive && (
                      <Image
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{
                          resizeMode: 'contain',
                          height: 24,
                          width: 24,
                        }}
                        source={colorScheme === 'dark' ? require('../../assets/share-dark.png') : require('../../assets/share-light.png')} 
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {shareActive && (
              <View style={{
                width: '100%',
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <View style={{
                  backgroundColor: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[900], 
                  padding: 8,
                  alignItems: 'center',
                  borderRadius: 10
                }}>
                  <QRCode
                    logoSize={40}
                    logo={colorScheme === 'dark' ? require('../../assets/logo-dark.png') : require('../../assets/logo-light.png')}
                    color={colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[100]}
                    size={120}
                    content='https://reactnative.com'
                  />
                </View>
                <Text style={{
                  color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800],
                  width: '50%',
                  fontSize: theme.fonts.sizes.small
                }}>Morbi felis lorem, imperdiet a sem a, lacinia blandit turpis. Fusce tempor elit non imperdiet aliquam. Suspendisse potenti.</Text>
              </View>
            )}
            <View>
              {consideration?.participants?.map((participant) => (
                <View
                  key={participant.username}
                  style={{
                    borderRadius: 12,
                    backgroundColor: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800],
                    padding: '4%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginBottom: '1%'
                  }}>
                  <View style={{
                    backgroundColor: 'black',
                    width: 40,
                    height: 40,
                    borderRadius: 50 
                  }} />
                  <Text style={{
                    width: '24%',
                    color: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[100],
                    fontSize: theme.fonts.sizes.small 
                  }}>@{participant.username}</Text>
                  <Text style={{
                    color: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[100],
                    fontSize: theme.fonts.sizes.small 
                  }}>Count: {participant.count}</Text>
                  <Text style={{
                    color: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[100],
                    fontSize: theme.fonts.sizes.small 
                  }}>{participant.weeklyAvg}/week</Text>
                  <Image
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={{
                      resizeMode: 'contain',
                      height: 24,
                      width: 24,
                    }}
                    source={colorScheme === 'dark' ? require('../../assets/more-dark.png') : require('../../assets/more-light.png')} 
                  />
                </View>
              ))}
            </View>
            <Button
              color="red"
              title="Go Back"
              onPress={() => {
                // close()
                modalDispatch({
                  type: 'OPEN',
                  modalType: 'GET_ASPECT_DETAILS',
                  modalData: aspect
                })
                // modalDispatch({type: 'CLOSE'})
                // resetForm()
              }} />
          </SafeAreaView>
        </ScrollView>
      </BlurView>
    </Modal>
  )
}

export default ConsiderationDetails