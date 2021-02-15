import React, {
  useRef, 
  useContext, 
  useEffect
} from 'react'
import {
  Text, 
  View, 
  Animated, 
  Button, 
  Easing, 
  Image,
  TouchableOpacity
} from 'react-native'
import { BlurView } from 'expo-blur'
import { theme } from '../../assets/utils'
import {
  ModalContext,
  ThemeContext 
} from '../../state'

const ConsiderationChooser = ({ visible }) => {
  const [modalState, modalDispatch] = useContext(ModalContext)

  const toggleSlide = useRef(new Animated.Value(-600)).current
  const aspect = modalState.modalData
  
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  useEffect(
    () => {
      if (visible) {
        Animated.timing(
          toggleSlide, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
      
      if (!visible) {
        Animated.timing(
          toggleSlide, {
            toValue: -600,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
    }, [toggleSlide, visible]
  )

  const considerationTypes = {
    types: ['Question',
      'Mood Tracking',
      'Reminders',
      'Shared'],
    'Question': {
      icon: {
        dark: require('../../assets/question-dark.png'),
        light: require('../../assets/question-light.png')
      }
    },
    'Mood Tracking': {
      icon: {
        dark: require('../../assets/mood-dark.png'),
        light: require('../../assets/mood-light.png')
      }
    },
    'Reminders': {
      icon: {
        dark: require('../../assets/bell-dark.png'),
        light: require('../../assets/bell-light.png')
      }
    },
    'Shared': {
      onClick: () => {
        modalDispatch({
          type: 'OPEN',
          modalType: 'CREATE_SHARED',
          modalData: aspect
        })
      },
      icon: {
        dark: require('../../assets/share-dark.png'),
        light: require('../../assets/share-light.png')
      }
    },
  }

  return (
    <>
      <BlurView
        tint={colorScheme}
        style={{
          position: 'absolute',
          width: '100%',
          height: visible ? '100%' : 0, 
          opacity: visible ? 1 : 0,
        }} />
      <Animated.View style={{
        position: 'absolute',
        width: '100%',
        backgroundColor: colorScheme === 'dark' ? theme.greyPalette[800] : theme.greyPalette[300],
        bottom: toggleSlide,
        left: 0,
        zIndex: 1,
        paddingBottom: 30,
        paddingTop: 30,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}>
        <Text style={[{...theme.fonts.types.heading}, {
          color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[800],
          textAlign: 'center'        
        }]}>Create Considerations</Text>
        <Text style={[{...theme.fonts.types.subHeading}, {
          fontSize: theme.fonts.sizes.small,
          color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600],
          textAlign: 'center',
          width: '90%',
          marginLeft: '5%'
        }]}>Once we understand who we are, we can ask questions, and create goals against the backdrop of what we already know about ourselves.</Text>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {considerationTypes.types.map(type => (
            <TouchableOpacity
              onPress={() => considerationTypes[type].onClick()}
              style={{
                width: '50%',
                alignItems: 'center',
                padding: '6%',
                justifyContent: 'space-between'
              }}
              key={type}>
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                style={{
                  resizeMode: 'contain',
                  height: 90,
                  width: 90,
                }}
                source={considerationTypes[type].icon[colorScheme]} 
              />
              <Text style={[theme.fonts.types.subHeading, {
                textAlign: 'center',
                marginTop: 20,
                color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[600],
              }]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          color="red"
          title="Go Back"
          onPress={() => modalDispatch({
            type: 'OPEN',
            modalType: 'GET_ASPECT_DETAILS',
            modalData: aspect
          })} />
      </Animated.View>
    </>
  )
}

export default ConsiderationChooser