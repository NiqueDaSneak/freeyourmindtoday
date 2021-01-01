import React, { useContext } from 'react'
import { ScrollView } from 'react-native'
import { theme } from '../assets/utils'
import AspectsContainer from '../components/AspectsContainer'
import ConsiderationsContainer from '../components/ConsiderationsContainer'
import { ThemeContext } from '../state'
const Hub = () => {
  // const [themeState] = useContext(ThemeContext)
  // const { colorScheme } = themeState

  return(
    <ScrollView 
      contentContainerStyle={{
        // backgroundColor: theme.layout.scheme[colorScheme].background,
        paddingLeft: '4%',
        paddingTop: '12%',
      }}>
      <AspectsContainer />
      <ConsiderationsContainer type='long' />
      <ConsiderationsContainer type='short' />
    </ScrollView>
  )
}

export default Hub