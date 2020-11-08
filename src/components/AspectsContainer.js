import React, { useContext } from 'react'
import { Image, StyleSheet, View, Text, FlatList } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/utils'
import AspectCard from './AspectCard'
import { AspectsContext, ModalContext } from '../state'
import PropTypes from 'prop-types'
import showAspectsTooltip from './Modals/showAspectsHelper'

const AspectsContainer = () => {

  const [aspectState] = useContext(AspectsContext)
  const { aspects } = aspectState
  const [modalState, modalDispatch] = useContext(ModalContext)

  return(
    <Container modalDispatch={modalDispatch}>
      
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

const Container = ({ children, modalDispatch }) => (
  <View style={styles.container}>
    <View style={{
      display: 'flex',
      flexDirection: 'row', 
      alignItems: 'center',
      paddingBottom: '4%' 

    }}>
      <Text style={theme.fonts.types.heading}>Aspects</Text>
      <TouchableOpacity onPress={() => showAspectsTooltip(modalDispatch)}>
        <Image 
          resizeMode="contain"
          resizeMethod="resize"
          style={{
            resizeMode: 'contain',
            marginLeft: 10,
            height: 20,
            width: 20
          }} source={require('../assets/information.png')} />
      </TouchableOpacity>
    </View>
    <ScrollView 
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
    height: 370,
    paddingLeft: '4%', 
  },
})

export default AspectsContainer