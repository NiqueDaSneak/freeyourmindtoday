import React from 'react'
import { Button, View } from 'react-native'

const ExplainOrCreateAspect = () => {
  return(
    <View style={{
      backgroundColor: 'lightgrey',
      paddingTop: 25,
      paddingBottom: 50,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center' 
    }}>
      <Button  title='Explain' />
      <Button  title='Create Aspect' />
    </View>
  )
}

export default ExplainOrCreateAspect