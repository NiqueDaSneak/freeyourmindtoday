import { Alert } from 'react-native'

const showConsiderationActions = ( modalDispatch, considerationDispatch, type, data ) => {
  const alertBodyText = type === 'long' ? `${data.title}` : `${data.title}\n\n${data.importanceStatement}`
  Alert.alert(
    'Consideration Details',
    alertBodyText,
    [
      {
        text: 'Mark As Complete',
        onPress: () => considerationDispatch({
          type: 'SET_COMPLETE_CONSIDERATION',
          id: data.id
        }),
      },
      {
        text: 'Go Back',
        onPress: () => console.log('Go Back'), 
        style: 'destructive'
      },
    ]
  )
}

export default showConsiderationActions