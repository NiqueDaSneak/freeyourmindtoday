import React from 'react'
import { TouchableOpacity,
  View,
  Image,
  Text,StyleSheet } from 'react-native'

  const styles = StyleSheet.create({
    loginIcon: {
      resizeMode: 'contain',
      height: 15,
      width: 15
    },
    loginButtonContainer: {
      width: 220,
      height:  45,
      borderRadius: 10,
      backgroundColor: 'black', 
      flexDirection: 'row',
      justifyContent: 'space-evenly', 
      alignItems: 'center',
      marginTop: '10%'
    },
  })
  
const PhoneLogin = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.loginButtonContainer}>
        <Image 
          resizeMode="contain"
          resizeMethod="resize"
          style={styles.loginIcon} source={require('../assets/phone.png')} />
        <Text style={{
          color: 'white' 
        }}>Sign in with phone number</Text>
      </View>
    </TouchableOpacity>
)
  
export default PhoneLogin