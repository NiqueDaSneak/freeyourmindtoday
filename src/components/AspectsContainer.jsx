import React, {useContext} from 'react'
import {
  ScrollView, 
  View,
  Text, 
  FlatList 
} from 'react-native'
import {theme} from '../assets/utils'
import AspectCard from './AspectCard'
import {
  AspectsContext, 
  ModalContext,
  ExplainersContext, 
  ThemeContext 
} from '../state'
import HelpDropdown from './HelpDropdown'
import CreatorCard from './CreatorCard'

const AspectsContainer = () => {

  const [aspectState] = useContext(AspectsContext)
  const {aspects} = aspectState
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  const {
    content, showAspectsHelper 
  } = explainersState
  const [themeState] = useContext(ThemeContext)
  const {colorScheme} = themeState

  return(
    <View>
      <View>
        <View style={{
          display: 'flex',
          flexDirection: 'row', 
          marginTop: 40,  
          marginBottom: 20,  
          width: '100%',
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'space-between' 
        }}>
          <Text style={[theme.fonts.types.heading, {color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400]}]}>
            Aspects
          </Text>
          <CreatorCard
            onPress={() => {
              modalDispatch({
                type: 'OPEN',
                modalType: 'ADD_NEW_ASPECT'
              })
            }} />
        </View>
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
        {/* {aspects.length > 0 && (
          <AspectCard noMatch />
        )} */}
        <FlatList
          key={aspects.length}        
          keyExtractor={(
            item, index
          ) => `${index}`}
          numColumns={Math.ceil(aspects.length / 2)}
          data={aspects}
          renderItem={({item: aspect, index}) => (
            <AspectCard index={index} aspect={aspect} />
          )}
        />
      </ScrollView>
    </View>
  ) 
}

export default AspectsContainer