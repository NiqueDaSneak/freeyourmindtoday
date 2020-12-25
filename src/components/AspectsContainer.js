import React, { useContext } from 'react'
import { Image, StyleSheet, View, Text, FlatList, Button } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/utils'
import AspectCard from './AspectCard'
import { AspectsContext, ModalContext, ExplainersContext } from '../state'
import PropTypes from 'prop-types'
import showAspectsTooltip from './Modals/showAspectsHelper'
import HelpDropdown from './HelpDropdown'

const AspectsContainer = () => {

  const [aspectState] = useContext(AspectsContext)
  const { aspects } = aspectState
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  const { content, showAspectsHelper } = explainersState

  return(
    <Container showAspectsHelper={showAspectsHelper}
     content={content} 
     modalDispatch={modalDispatch} 
     explainersDispatch={explainersDispatch}>
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

const Container = ({ children, modalDispatch, content, explainersDispatch, showAspectsHelper }) => (
  <View style={styles.container}>
    <View>
      <Text style={[theme.fonts.types.heading, {
        marginBottom: 20 
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
      // style={{backgroundColor: 'green'}}
      horizontal={true} 
      showsVerticalScrollIndicator={false} 
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  </View>
)

Container.propTypes = {
  children: PropTypes.any,
  modalDispatch: PropTypes.any
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    // height: 370,
    paddingLeft: '4%', 
    paddingRight: '4%', 
    // backgroundColor: 'pink',
    // display: 'flex',
    // flexDirection: 'column'
  },
})

export default AspectsContainer