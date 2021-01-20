import { Alert } from 'react-native'

const showConsiderationsHelper = (modalDispatch, type) => {
  const alertTitle = type === 'short' ? 'Short Term Considerations' : 'Long Term Considerations'
  const alertText = type === 'long' ? 
    'Once we understand who we are, we can ask questions, and create goals against the backdrop of what we already know about ourselves. \n\nLong term considerations should be questions we have; or answers to questions that have not revealed themselves.' 
    : 'Short term considerations should be actionable. The short term is more concrete then the future. We can use that concrete to build whatever we need.' 

  Alert.alert(
    `${alertTitle}`,
    `${alertText}`,
    [
      {
        text: 'Create A Consideration',
        onPress: () => modalDispatch({
          type: 'OPEN',
          modalType: 'ADD_NEW_ASPECT' 
        }),
      },
      {
        text: 'Go Back',
        onPress: () => console.log('Go Back'), 
        style: 'destructive'
      }
    ],
  )
}

export default showConsiderationsHelper