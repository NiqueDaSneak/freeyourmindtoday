import React, {useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Button,
  ScrollView,
  Text,
  View
} from 'react-native'
import { theme } from '../assets/utils'
import EditableInput from '../components/EditableInput'
import Footer from '../components/Footer'
import {AuthContext, ThemeContext} from '../state'

const Settings = () => {
  const [themeState] = useContext(ThemeContext)
  const { colorScheme } = themeState

  const [authState, authDispatch] = useContext(AuthContext)
  const {phone} = authState.activeUser
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
          color: colorScheme === 'dark' ? theme.greyPalette[400] : theme.greyPalette[400],
          marginTop: 20,
          marginBottom: 20 
        }}>Settings</Text>
        {/* <EditableInput
          label="Change Phone Number to Log In:"
          editableValue={phone.replace('+1', '')}
          onSave={(val) => console.log(`+1${val}`)}        
        /> */}
        <View
          style={{ marginTop: 90 }}>
          <Button
            onPress={() => authDispatch({type: 'LOG_OUT'})}
            title='Log Out'
            color='red' />
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  )
}

export default Settings