import React from 'react'
import { ScrollView } from 'react-native'
import AspectsContainer from '../components/AspectsContainer'
import ConsiderationsContainer from '../components/ConsiderationsContainer'

const Hub = () => {

  return(
    <ScrollView 
      contentContainerStyle={{
        height: 1000 
      }}>
      <AspectsContainer />
      <ConsiderationsContainer type='long' />
      <ConsiderationsContainer type='short' />
    </ScrollView>
  )
}

export default Hub