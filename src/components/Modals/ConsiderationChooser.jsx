import React, {
  useState, useRef, useContext, useEffect
} from 'react'
import {
  Modal, Text, View, Animated, Button, Easing 
} from 'react-native'
import { BlurView } from 'expo-blur'
import SegmentedControl from '@react-native-community/segmented-control';
import {
  theme, useKeyboard 
} from '../../assets/utils'
import { ModalContext } from '../../state';

const ConsiderationChooser = ({
  visible, close 
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleSlide = useRef(new Animated.Value(-400)).current

  useEffect(
    () => {
      if (visible) {
        Animated.timing(
          toggleSlide, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()

      }
      
      if (!visible) {
        Animated.timing(
          toggleSlide, {
            toValue: -400,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
    }, [visible]
  )

  const [segmentIndex, setSegmentIndex] = useState(0)
  const [modalState, modalDispatch] = useContext(ModalContext)
  return (
    <>
      <BlurView
        tint='dark'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%', 
          opacity: visible ? 1 : 0,
          display: visible ? 'inherit' : 'none' 
        }} />
      <Animated.View style={{
        position: 'absolute',
        height: '45%',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'black',
        bottom: toggleSlide,
        left: 0,
        zIndex: 1,
        paddingBottom: 30,
        paddingTop: 30,
      }}>
        <Text style={[{...theme.fonts.types.heading}, {
          color: 'white',
          textAlign: 'center'        
        }]}>Create Considerations</Text>
        <Text style={[{...theme.fonts.types.subHeading}, {
          fontSize: theme.fonts.sizes.small,
          color: 'white',
          textAlign: 'center',
          width: '90%',
          marginLeft: '5%'
        }]}>Once we understand who we are, we can ask questions, and create goals against the backdrop of what we already know about ourselves.</Text>
        <SegmentedControl
          values={['Long Term', 'Short Term']}
          selectedIndex={segmentIndex}
          onChange={(event) => {
            setSegmentIndex(event.nativeEvent.selectedSegmentIndex)
          }}
        />
        <View style={{
        // backgroundColor: 'pink',
          height: 70,
        }}>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            width: '90%',
            marginLeft: '5%'
          }}>
            {segmentIndex === 0 && (
              `Long term considerations should be questions we have; or answers to questions that have not revealed themselves.`
            )}
            {segmentIndex === 1 && (
              `Short term considerations should be actionable. The short term is more concrete than the future. We can use that concrete to build whatever we need.`
            )}
          </Text>
        </View>
        <Button title={`Create ${segmentIndex === 0 ? 'Long Term' : 'Short Term'} Consideraton`} />
        <Button
          title='Cancel'
          color='red'
          onPress={() => {
            // const promise = Promise.resolve(() => {
            //   Animated.timing(
            //     toggleSlide, {
            //       toValue: -400,
            //       duration: 100,
            //       useNativeDriver: false,
            //       easing: Easing.ease,
            //     }
            //   ).start()
            // })
            // promise.then(() => {
            modalDispatch({ type: 'CLOSE_MODAL' })
            // })
          }} />

      </Animated.View>
      {/* </BlurView> */}
    </>
  )
}

export default ConsiderationChooser