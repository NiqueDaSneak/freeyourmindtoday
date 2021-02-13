import React, {
  useContext, useState, useRef, useEffect
} from 'react'
import {
  View, 
  TouchableOpacity, 
  Text,
  Image,
  Animated,
  Easing,
  useWindowDimensions
} from 'react-native'
import moment from 'moment'
import {theme} from '../assets/utils'
import {
  ConsiderationsContext,
  ModalContext,
  ThemeContext
} from '../state'
import showConsiderationActions from './Modals/showConsiderationActions'

const Consideration = ({
  data, parent
}) => {
  const [modalState,modalDispatch] = useContext(ModalContext)
  const [considerationState, considerationDispatch] = useContext(ConsiderationsContext)
  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

  const [expanded, setExpanded] = useState(false)
  const [screenHeight, setScreenHeight] = useState(useWindowDimensions().height)
  const [screenWidth, setScreenWidth] = useState(useWindowDimensions().width)

  const growHeight = useRef(new Animated.Value(150)).current
  const growWidth = useRef(new Animated.Value(150)).current

  const renderIcon = () => {
    switch (data.type) {
    case 'shared':
      return colorScheme === 'dark' ? require('../assets/share-dark.png') : require('../assets/share-light.png')
    default:
      break;
    }
  }

  useEffect(
    () => {
      if (expanded) {
        Animated.timing(
          growHeight, {
            toValue: screenHeight,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
        Animated.timing(
          growWidth, {
            toValue: screenWidth,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
      
      if (!expanded) {
        Animated.timing(
          growHeight, {
            toValue: 150,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
        Animated.timing(
          growWidth, {
            toValue: 150,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()

      }
    }, [expanded, growHeight, growWidth, screenHeight, screenWidth]
  )
  return (
    <TouchableOpacity
      onPress={() => modalDispatch({
        type: 'OPEN',
        modalType: 'CONSIDERATION_DETAILS',
        modalData: {
          considerationId: data?.id,
          aspect: parent
        }
      })
      }
      style={{
        backgroundColor: colorScheme === 'dark' ? 'grey' : theme.greyPalette[200],
        marginRight: 10,
        marginBottom: 20,
        width: 150,
        height: 110,
        borderRadius: 12,
        justifyContent: 'space-between'
      }}>
      <View style={{padding: 10}}>
        <Text style={{
          fontSize: theme.fonts.sizes.small,
          color: colorScheme === 'dark' ? theme.greyPalette[200] : theme.greyPalette[800] 
        }}>{data?.title}</Text>
      </View>
      <View style={{
        backgroundColor: data?.deleted ? 'red' : data?.completed ? 'green' : data?.priority ? 'gold' : colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[100],
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderColor: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[300],
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: '4%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto'
      }}>
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            resizeMode: 'contain',
            height: 20,
            width: 20,
          }}
          source={renderIcon()} 
        />
      </View>
    </TouchableOpacity>
  )
}

export default Consideration