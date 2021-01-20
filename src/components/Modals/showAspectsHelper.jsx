import { Alert } from 'react-native'

const showAspectsTooltip = (modalDispatch) => {
  Alert.alert(
    'What Is An Aspect?',
    'Writing out the different aspects of ourselves is a good way to organize what is important to us. Things that are important we tend to want to improve, or at least observe and understand.',
    [
      {
        text: 'Create An Aspect',
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

export default showAspectsTooltip