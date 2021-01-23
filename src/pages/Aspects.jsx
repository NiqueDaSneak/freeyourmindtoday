import React, {useContext} from 'react'
import {
  SafeAreaView,
  ScrollView
} from 'react-native'
import { theme } from '../assets/utils'
import AspectsContainer from '../components/AspectsContainer'
import ConsiderationsContainer from '../components/ConsiderationsContainer'
import Footer from '../components/Footer'
import {
  ThemeContext 
} from '../state'

const Aspects = () => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  return (
    <SafeAreaView>
      <ScrollView 
        contentContainerStyle={{
          paddingLeft: '4%',
          paddingBottom: '12%',
          minHeight: '100%',
          backgroundColor: colorScheme === 'dark' ? theme.greyPalette[900] : theme.greyPalette[100],
        }}>
        <AspectsContainer />
        <ConsiderationsContainer />
      </ScrollView>
      <Footer />
    </SafeAreaView>
  )
}

export default Aspects