import React, {
  useContext, useState, useEffect, useRef 
} from 'react'
import {
  View, Text, FlatList, Animated, Easing, Button
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import SegmentedControl from '@react-native-community/segmented-control';
import { BlurView } from 'expo-blur'
import {
  theme, useKeyboard 
} from '../assets/utils'
import {
  AspectsContext, ModalContext, ConsiderationsContext, ExplainersContext, ThemeContext 
} from '../state'
import Consideration from './Consideration'
import ArchiveToggle from './ArchiveToggle'
import HelpDropdown from './HelpDropdown'
import ItemOptions from './ItemOptions'
import CreatorCard from './CreatorCard'

const ConsiderationsContainer = ({
  type, singleAspectId, hideHelper 
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aspectsState, aspectsDispatch] = useContext(AspectsContext)
  const {
    aspects 
  } = aspectsState
  const [disabled, setDisabled] = useState(aspects.length <= 2)
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [considerationsState, considerationsDispatch] = useContext(ConsiderationsContext)
  const {
    considerations 
  } = considerationsState
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  const {
    content, showConsiderationsHelper, 
     
  } = explainersState
  const [themeState] = useContext(ThemeContext)
  const {
    colorScheme 
  } = themeState

  const [keyboardHeight] = useKeyboard()
  useEffect(
    () => {
      if (aspects.length <= 2) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
    }, [aspects]
  )
  
  const renderData = () => {
    if (singleAspectId) {
      return considerations.filter(consideration => consideration.aspectId === singleAspectId) 
    } 
    return considerations
  }
  const slideUp = useRef(new Animated.Value(0)).current
  // Animated.timing(slideLeft, {
  //   toValue: -400,
  //   duration: 300,
  //   useNativeDriver: false,
  //   easing: Easing.ease,
  // }).start()
  // console.log('slideUp: ', slideUp)
  const [segmentIndex, setSegmentIndex] = useState(0)
  return(
    <View style={{ marginBottom: 20 }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row', 
        marginBottom: 20,  
      }}>
        <View style={{ width: '100%'}}>
          <View style={{
            width: '100%',
            marginBottom: 20,
            paddingRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between' 
          }}>
            <Text style={[theme.fonts.types.subHeading, {
              // marginBottom: 10,
              color: theme.layout.scheme[colorScheme].textColor, 
            }]}>
            Considerations
            </Text>
            {/* <ItemOptions /> */}
            <ArchiveToggle
              total={considerations?.length}
              completed={considerations?.length} />
            <CreatorCard
              onPress={() => {
                modalDispatch({
                  type: 'OPEN_MODAL',
                  modalType: 'CHOOSE_CONSIDERATION_TYPE'
                })
                setMenuOpen(true)
                // Animated.timing(
                //   slideUp, {
                //     toValue: 300,
                //     duration: 100,
                //     useNativeDriver: false,
                //     easing: Easing.ease,
                //   }
                // ).start()
              }} />
          </View>
          {/* <HelpDropdown
            hidden={hideHelper || disabled} 
            visible={showConsiderationsHelper}
            close={() => explainersDispatch({type: 'CLOSE_CONSIDERATION_HELPER'})}
            text={content.considerationsHelper} 
          /> */}
        </View>
      </View>
      <ScrollView 
        horizontal 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        {/* {!singleAspectId && (
          <>
            <ItemOptions
              creatorOnPress={() => modalDispatch({
                type: 'OPEN_MODAL',
                modalType: type === 'short' ? 'ADD_SHORT_CONSIDERATION' : 'ADD_LONG_CONSIDERATION' 
              })} 
              archiveCompleted={0}
              archiveTotal={considerations?.length || [].length}
            />
          </>
        )} */}
        <FlatList 
          contentContainerStyle={{
            display: 'flex',
            justifyContent: 'space-between' 
          }}
          key={considerations?.length || [].length}
          keyExtractor={(
            item, index
          ) => `${index}`}
          numColumns={Math.ceil(considerations?.length / 3) || [].length}
          data={renderData()}
          renderItem={({
            item: consideration 
          }) => (
            <Consideration
              type={consideration.type}
              data={consideration} />
          )}
        />
      </ScrollView>
    </View>
  )
}

export default ConsiderationsContainer