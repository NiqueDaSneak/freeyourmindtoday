import React, {useContext} from 'react'
import {
  ScrollView, View, Text, FlatList 
} from 'react-native'
import {theme} from '../assets/utils'
import AspectCard from './AspectCard'
import {
  AspectsContext, ModalContext, ExplainersContext, ThemeContext 
} from '../state'
import HelpDropdown from './HelpDropdown'
import ItemOptions from './ItemOptions'

const AspectsContainer = () => {

  const [aspectState] = useContext(AspectsContext)
  const {
    aspects 
  } = aspectState
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  const {
    content, showAspectsHelper 
  } = explainersState
  const [themeState] = useContext(ThemeContext)
  const {
    colorScheme 
  } = themeState

  return(
    <View>
      <View>
        <Text style={[theme.fonts.types.heading, {
          marginBottom: 20,
          color: theme.layout.scheme[colorScheme].textColor
        }]}>Aspects</Text>
        <HelpDropdown 
          visible={showAspectsHelper}
          close={() => explainersDispatch({type: 'CLOSE_ASPECTS_HELPER'})} 
          text={content.aspectsHelper} />
      </View>
      <ScrollView 
        contentContainerStyle={{marginTop: 10}}
        horizontal 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        {/* <ItemOptions
          creatorOnPress={() => modalDispatch({
            type: 'OPEN_MODAL',
            modalType: 'ADD_NEW_ASPECT'
          })}
          archiveTotal={aspects.length} /> */}
        <FlatList
          key={aspects.length}        
          keyExtractor={(
            item, index
          ) => `${index}`}
          numColumns={Math.ceil(aspects.length / 2)}
          data={aspects}
          renderItem={({
            item: aspect 
          }) => (
            <AspectCard aspect={aspect} />
          )}
        />
      </ScrollView>
    </View>
  ) 
}

export default AspectsContainer