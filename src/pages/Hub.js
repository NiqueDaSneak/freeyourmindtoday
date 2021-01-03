import React, { useContext } from 'react'
import { ScrollView } from 'react-native'
import AspectsContainer from '../components/AspectsContainer'
import ConsiderationsContainer from '../components/ConsiderationsContainer'
const Hub = () => {

  return(
    <ScrollView 
      contentContainerStyle={{
        paddingLeft: '4%',
        paddingTop: '12%',
        paddingBottom: '12%',
      }}>
      <AspectsContainer />
      <ConsiderationsContainer type='long' />
      <ConsiderationsContainer type='short' />
    </ScrollView>
  )
}

export default Hub