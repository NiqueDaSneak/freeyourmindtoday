import React from 'react'
import { ScrollView } from 'react-native'
import { theme } from '../assets/utils'
import AspectsContainer from '../components/AspectsContainer'
import ConsiderationsContainer from '../components/ConsiderationsContainer'

const Hub = () => {

  return(
    <ScrollView 
      contentContainerStyle={{
        backgroundColor: theme.layout.scheme.darkMode.background,
      }}>
      <AspectsContainer />
      <ConsiderationsContainer type='long' />
      <ConsiderationsContainer type='short' />
    </ScrollView>
  )
}

export default Hub