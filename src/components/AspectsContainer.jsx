import React, { useContext } from 'react'
import { ScrollView, StyleSheet, View, Text, FlatList } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/utils'
import AspectCard from './AspectCard'
import { AspectsContext, ModalContext, ExplainersContext, ThemeContext } from '../state'
import HelpDropdown from './HelpDropdown'

const AspectsContainer = () => {

  const [aspectState] = useContext(AspectsContext)
  const { aspects } = aspectState
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  const { content, showAspectsHelper } = explainersState
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return(
    <Container showAspectsHelper={showAspectsHelper}
      content={content} 
      modalDispatch={modalDispatch} 
      explainersDispatch={explainersDispatch}
      colorScheme={colorScheme}>
      <AspectCard creator /> 
      <FlatList
        key={aspects.length}        
        keyExtractor={(item, index) => `${index}`}
        numColumns={Math.ceil(aspects.length / 2)}
        data={aspects}
        renderItem={({ item: aspect }) => (
          <AspectCard aspect={aspect} />
        )}
      />
    </Container>
  ) 
}

const Container = ({ children, modalDispatch, content, explainersDispatch, showAspectsHelper, colorScheme }) => (
  <View style={{paddingRight: '4%'}}>
    <View>
      <Text style={[theme.fonts.types.heading, {
        marginBottom: 20,
        color: theme.layout.scheme[colorScheme].textColor
      }]}>Aspects</Text>
      <HelpDropdown 
        visible={showAspectsHelper}
        close={() => explainersDispatch({
          type: 'CLOSE_ASPECTS_HELPER' 
        })} 
        text={content.aspectsHelper} />
      {/* <TouchableOpacity onPress={() => showAspectsTooltip(modalDispatch)}>
        <Image 
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            resizeMode: 'contain',
            marginLeft: 10,
            height: 20,
            width: 20
          }} source={require('../assets/information.png')} />
      </TouchableOpacity> */}
    </View>
    <ScrollView 
      horizontal 
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  </View>
)

export default AspectsContainer