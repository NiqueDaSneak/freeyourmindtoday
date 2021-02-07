import React, {
  useContext, useState, useEffect 
} from 'react'
import {
  View, 
  Text, 
  FlatList,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {theme} from '../assets/utils'
import {
  AspectsContext,
  ModalContext,
  ConsiderationsContext,
  ThemeContext 
} from '../state'
import Consideration from './Consideration'
import ArchiveToggle from './ArchiveToggle'
import CreatorCard from './CreatorCard'

const ConsiderationsContainer = ({
  singleAspect,
  hideActions
}) => {
  const [aspectsState] = useContext(AspectsContext)
  const {aspects} = aspectsState
  const [disabled, setDisabled] = useState(aspects.length <= 2)
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [considerationsState, considerationsDispatch] = useContext(ConsiderationsContext)
  const {considerations} = considerationsState
  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

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
    if (singleAspect.id) {
      return considerations.filter(consideration => !consideration.completed && consideration.aspectId === singleAspect.id) 
    } 
    return considerations.filter(consideration => !consideration.completed)
  }
  return (
    <View style={{
      marginBottom: 20,
      width: '100%' 
    }}>
      {!disabled && (
        <>
          <View style={{
            display: 'flex',
            flexDirection: 'row', 
            marginBottom: 20,  
            alignItems: 'center',
            justifyContent: 'space-between', 
            marginRight: 10,
          }}>
            <Text style={[theme.fonts.types.subHeading, {color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400]}]}>
          Considerations
            </Text>
            {!hideActions && (
              <>
                {considerations?.filter(el => el.completed).length !== 0 && (
                  <ArchiveToggle
                    total={considerations?.length}
                    completed={considerations?.filter(el => el.completed).length} />
                )}
                <CreatorCard
                  onPress={() => {
                    modalDispatch({
                      type: 'OPEN',
                      modalType: 'CHOOSE_TYPE',
                      modalData: singleAspect
                    })
                  }} />
              </>
            )}
          </View>
          <ScrollView 
            horizontal 
            showsVerticalScrollIndicator={false} 
            showsHorizontalScrollIndicator={false}
          >
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
              renderItem={({item: consideration}) => (
                <Consideration
                  type={consideration.type}
                  data={consideration} />
              )}
            />
          </ScrollView>
        </>
      )}
    </View>
  )
}

export default ConsiderationsContainer