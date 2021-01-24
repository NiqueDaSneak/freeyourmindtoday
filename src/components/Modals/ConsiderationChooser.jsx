import React, {
  useState, useRef, useContext, useEffect
} from 'react'
import {
  Text, 
  View, 
  Animated, 
  Button, 
  Easing, 
  Pressable
} from 'react-native'
import { BlurView } from 'expo-blur'
import SegmentedControl from '@react-native-community/segmented-control';
import {theme} from '../../assets/utils'
import { ModalContext, ThemeContext } from '../../state';

const ConsiderationChooser = ({visible}) => {

  const toggleSlide = useRef(new Animated.Value(-400)).current

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
            toValue: -400,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.ease,
          }
        ).start()
      }
    }, [toggleSlide, visible]
  )

  const [segmentIndex, setSegmentIndex] = useState(0)
  const [modalState, modalDispatch] = useContext(ModalContext)

  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

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
        height: '45%',
        justifyContent: 'space-between',
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
        <SegmentedControl
          tintColor={colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[100]}
          values={['Long Term', 'Short Term']}
          selectedIndex={segmentIndex}
          onChange={(event) => {
            setSegmentIndex(event.nativeEvent.selectedSegmentIndex)
          }}
        />
        <View style={{height: 70,}}>
          <Text style={{
          color: colorScheme === 'dark' ? theme.greyPalette[300] : theme.greyPalette[900],
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
        <Button
          onPress={() => segmentIndex === 0 ? modalDispatch({
            type: 'OPEN',
            modalType: 'ADD_LONG_CONSIDERATION' 
          }): modalDispatch({
            type: 'OPEN',
            modalType: 'ADD_SHORT_CONSIDERATION' 
          })}
          title={`Create ${segmentIndex === 0 ? 'Long Term' : 'Short Term'} Consideraton`} />
        <Button
          title='Cancel'
          color='red'
          onPress={() => {
            modalDispatch({ type: 'CLOSE_MODAL' })
          }} />
      </Animated.View>
    </>
  )
}

export default ConsiderationChooser