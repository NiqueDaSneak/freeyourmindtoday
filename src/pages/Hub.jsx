import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import AspectsContainer from '../components/AspectsContainer'
import ConsiderationsContainer from '../components/ConsiderationsContainer'

const Hub = () => (
  <SafeAreaView>
    <ScrollView 
      contentContainerStyle={{
        paddingLeft: '4%',
        paddingBottom: '12%',
      }}>
      <AspectsContainer />
      <ConsiderationsContainer type='long' />
      <ConsiderationsContainer type='short' />
    </ScrollView>
  </SafeAreaView>
)

export default Hub