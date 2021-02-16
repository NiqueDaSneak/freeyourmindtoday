import React, {
  useContext,
  useState,
  useRef,
  useEffect
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
  Image,
  TextInput,
  Keyboard
} from 'react-native'
import { BlurView } from 'expo-blur'
import { QRCode } from 'react-native-custom-qr-codes-expo'
import {
  AuthContext,
  ConsiderationsContext,
  ModalContext,
  ThemeContext 
} from '../../state'
import EditableInput from '../EditableInput'
import { theme } from '../../assets/utils'
import CreatorCard from '../CreatorCard'
import { useReference } from '../../state/considerations.context'

const ConsiderationDetails = ({
  visible, 
  close, 
  aspect,
  considerationId
}) => {
  const [authState, authDispatch] = useContext(AuthContext)
  const {activeUser} = authState
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState
  const [shareActive, setShareActive] = useState(false)
  const [modalState, modalDispatch] = useContext(ModalContext)

  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  const { considerations } = considerationState
  const consideration = considerations?.find(el => el.id === considerationId) || {}
  const refConsideration = useReference(consideration?.refId) || {}
  const [whyInputActive, setWhyInputActive] = useState(false)

  const [whyInput, setWhyInput] = useState('')
  const whyInputRef = useRef()

  const {
    participants, whys, adminId
  } = refConsideration

  const selfParticipant = participants?.find(person => person.id === activeUser.id)

  useEffect(
    () => {
      if (whyInputActive) {
        whyInputRef.current.focus()
      } else {
        setWhyInputActive(false)
        Keyboard.dismiss()
      }
    }, [whyInputActive]
  )

  // {console.log('consideration: ', consideration)}
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
          paddingTop: 40,
          padding: '4%'
        }}>
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
          }}>
            <View style={{ width: '100%' }}>
              <Text style={[theme.fonts.types.subHeading, {
                marginBottom: 20,
                color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400]
              }]}>Why is this important to us?</Text>
              <View style={{
                display: 'flex',
                flexDirection: 'row', 
                alignItems: 'center',
                justifyContent: 'space-between', 
              }}>
                <TextInput
                  ref={whyInputRef}
                  editable={whyInputActive}
                  placeholder='...whats your why'
                  keyboardAppearance={colorScheme}
                  blurOnSubmit
                  returnKeyType="done"          
                  maxLength={41}
                  value={whyInput}
                  style={{ 
                    borderRadius: 10, 
                    fontSize: theme.fonts.sizes.medium, 
                    borderColor: colorScheme === 'dark' ?  theme.greyPalette[400] : theme.greyPalette[800], 
                    borderWidth: 1 ,
                    paddingLeft: '2%',
                    width: '70%',
                    padding: '2%',
                    color: colorScheme === 'dark' ?  theme.greyPalette[100] : theme.greyPalette[800],
                  }}
                  onChangeText={text => setWhyInput(text)}
                />
                {whyInputActive && (
                  <TouchableOpacity onPress={() => {
                    considerationDispatch({
                      type: 'UPDATE_SHARED_ADD_WHY',
                      id: consideration?.refId,
                      text: whyInput,
                      oldWhys: whys 
                    })
                    setWhyInputActive(false)
                    setWhyInput('')
                    Keyboard.dismiss()
                  }}>
                    <Image
                      resizeMode="contain"
                      resizeMethod="resize"
                      style={{
                        resizeMode: 'contain',
                        height: 34,
                        width: 34,
                      }}
                      source={require('../../assets/check.png')} 
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => {
                  if (!whyInputActive) {
                    setWhyInputActive(true)
                  }
                    
                  if (whyInputActive){
                    setWhyInputActive(false)
                    setWhyInput('')
                  }
                }}>
                  <View style={[{
                    width: 44,
                    height: 44,
                    backgroundColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[200],
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                  },
                  whyInputActive && (
                    {
                      transform: [{ rotate: "45deg" }],
                      backgroundColor: 'red'
                    }
                  ),
                  !whyInputActive && (
                    {
                      transform: [{ rotate: "0deg" }],
                      backgroundColor: colorScheme === 'dark' ? theme.greyPalette[600] : theme.greyPalette[200],
                    }
                  )
                  ]}>
                    <Text style={[theme.fonts.types.heading, {
                      color: 'white',
                      textAlign: 'center'
                    }]}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ display: whyInputActive ? 'flex' : 'none' }} />
            </View>
          </View>
          <ScrollView 
            contentContainerStyle={{marginTop: 10}}
            horizontal 
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}>
            {whys?.map(el => (
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
                }}>@{el.username}</Text>
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
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}>
              <View style={{
                backgroundColor: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[900], 
                padding: 8,
                alignItems: 'center',
                borderRadius: 10,
                marginRight: 12
              }}>
                <QRCode
                  ecl='M'
                  // logoSize={80}
                  // logo={colorScheme === 'dark' ? require('../../assets/logo-dark.png') : require('../../assets/logo-light.png')}
                  color={colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[100]}
                  size={120}
                  content={JSON.stringify({
                    adminId,
                    refId: consideration?.refId,
                    title: consideration?.title,
                    inviter: activeUser.id
                  })}
                />
              </View>
              <Text style={{
                color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800],
                width: '40%',
                fontSize: theme.fonts.sizes.xsmall
              }}>Morbi felis lorem, imperdiet a sem a, lacinia blandit turpis. Fusce tempor elit non imperdiet aliquam. Suspendisse potenti.</Text>
            </View>
          )}
          <View>
            {participants?.map((participant) => (
              <View
                key={participant?.username}
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
                }}>@{participant?.username}</Text>
                <Text style={{
                  color: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[100],
                  fontSize: theme.fonts.sizes.small 
                }}>Count: {participant?.count}</Text>
                <Text style={{
                  color: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[100],
                  fontSize: theme.fonts.sizes.small 
                }}>{participant?.weeklyAvg}/week</Text>
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
              modalDispatch({
                type: 'OPEN',
                modalType: 'GET_ASPECT_DETAILS',
                modalData: aspect
              })
            }} />
        </ScrollView>
      </BlurView>
    </Modal>
  )
}

export default ConsiderationDetails