import React, {useContext} from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native'
import { theme } from '../assets/utils'
import EditableInput from '../components/EditableInput'
import Footer from '../components/Footer'
import {ThemeContext} from '../state'

const Settings = () => {
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
        <Text style={{
          ...theme.fonts.types.heading,
          marginTop: 20,
          marginBottom: 20 
        }}>Settings</Text>
        <EditableInput
          label="Change Phone Number to Log In:"
          editableValue="5132917758" />
        <View
          style={{ marginTop: 90 }}>
          <Button
            title='Log Out'
            color='red' />
        </View>
        {/* <AspectsContainer />
        <ConsiderationsContainer /> */}
      </ScrollView>
      <Footer />
    </SafeAreaView>
  )
}

export default Settings