import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { theme } from '../assets/utils'
import { AspectsContext, ModalContext, ConsiderationsContext, ExplainersContext, ThemeContext } from '../state'
import Consideration from './Consideration'
import HelpDropdown from './HelpDropdown'

const ConsiderationsContainer = ({ type, singleAspectId, hideHelper }) => {

  const [aspectsState, aspectsDispatch] = useContext(AspectsContext)
  const { aspects } = aspectsState
  const [disabled, setDisabled] = useState(aspects.length <= 2)
  const [modalState, modalDispatch] = useContext(ModalContext)
  const [considerationsState, considerationsDispatch] = useContext(ConsiderationsContext)
  const { longTermConsiderations, shortTermConsiderations } = considerationsState
  const [explainersState, explainersDispatch] = useContext(ExplainersContext)
  const {
    content, showShortTermConsiderationsHelper, 
    showLongTermConsiderationsHelper 
  } = explainersState
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  useEffect(() => {
    if (aspects.length <= 2) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [aspects])

  const getConsiderations = (type) => {
    return type === 'short' ? shortTermConsiderations : longTermConsiderations
  }
  
  return(
    <View>
      <View style={{
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        paddingBottom: '4%', 
        marginTop: '4%'
      }}>
        <View style={{
          display: 'flex',
        }}>
          <Text style={[theme.fonts.types.subHeading, {
            marginBottom: 10,
            color: theme.layout.scheme[colorScheme].textColor, 
          }]}>
            {type === 'long' ? 'Long Term Considerations' : 'Short Term Considerations'}
          </Text>
          <HelpDropdown
            hidden={hideHelper || disabled} 
            visible={type === 'long' ? showLongTermConsiderationsHelper : showShortTermConsiderationsHelper}
            close={() => {
              type === 'long' ? explainersDispatch({
                type: 'CLOSE_LONG_CONSIDERATION_HELPER' 
              }) : explainersDispatch({
                type: 'CLOSE_SHORT_CONSIDERATION_HELPER' 
              })
            }}
            text={type === 'long' ? content.longTermConsiderationsHelper : content.shortTermConsiderationsHelper} />

        </View>
        {/* <TouchableOpacity onPress={() => showConsiderationsHelper(modalDispatch, type)}>
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
        horizontal={true} 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        <Consideration disabled={disabled} creator type={type} />
        <FlatList 
          contentContainerStyle={{
            // height: 140,
            display: 'flex',
            justifyContent: 'space-between' 
          }}
          key={getConsiderations(type).length}
          keyExtractor={(item, index) => `${index}`}
          numColumns={Math.ceil(getConsiderations(type).length / 2)}
          data={getConsiderations(type)}
          renderItem={({ item: consideration }) => (
            <Consideration type={type} data={consideration} />
          )}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: '10%',
    // height: 220,
    paddingLeft: '4%',     
  },
})

export default ConsiderationsContainer