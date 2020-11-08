import { Alert } from 'react-native'

const showConsiderationActions = (modalDispatch, type, data ) => {
  const alertBodyText = type === 'long' ? `${data.title}` : `${data.title}\n\n${data.importanceStatement}`
  Alert.alert(
    'Consideration Details',
    alertBodyText,
    [
      {
        text: 'Delete',
        onPress: () => console.log('Learn More')
      },
      {
        text: 'Mark As Complete',
        onPress: () => modalDispatch({
          type: 'OPEN_MODAL',
          modalType: 'ADD_NEW_ASPECT' 
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