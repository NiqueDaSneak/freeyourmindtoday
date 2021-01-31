import React, {
  useReducer,
  createContext,
  useEffect,
  useContext, 
  useState
} from 'react'
import {Alert} from 'react-native'
import { ModalContext } from './modal.context'
import { db } from '../../firebase'
import { AuthContext } from './auth.context'

export const AspectsContext = createContext()

const initialState = {
  loading: false,
  aspects: [],
  needsSaved: {
    value: false,
    data: null
  },
  needsUpdatedTitle: {
    value: false,
    title: null,
    id: null    
  },
  needsUpdatedImportance: {
    value: false,
    importance: null,
    id: null    
  }
}

const reducer = (
  state, action
) => {
  switch (action.type) {
  case 'SET_ASPECTS':
    return {
      ...state,
      aspects: action.data
    }
  case 'NEEDS_SAVED':
    return {
      ...state,
      needsSaved: {
        value: true,
        data: action.payload
      }
    }
  case 'SAVED_NEW':
    return {
      ...state,
      needsSaved: {
        value: false,
        data: null
      }
    }
  case 'UPDATE_TITLE':
    return {
      ...state,
      loading: true,
      needsUpdatedTitle: {
        value: true,
        title: action.newTitle,
        id: action.id    
      }
    }
  case 'UPDATE_IMPORT':
    return {
      ...state,
      loading: true,
      needsUpdatedImportance: {
        value: true,
        importance: action.newImport,
        id: action.id    
      }
    }
  case 'UPDATED':
    return {
      ...state,
      loading: false,
      needsUpdatedImportance: {
        value: false,
        importance: null,
        id: null  
      },
      needsUpdatedTitle: {
        value: false,
        title: null,
        id: null  
      }
    }
  case 'SET_PRECREATED':
    return {
      ...state,
      aspects: [...action.payload]
    }
  default:
    throw new Error()
  }
}

export const AspectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer, initialState
  )
  const [authState, authDispatch] = useContext(AuthContext)
  const [modalState, modalDispatch] = useContext(ModalContext)

  const {
    activeUser, newUserLogin 
  } = authState
  
  const [precreatedAspects, setPrecreatedAspects] = useState([
    {
      importanceStatement: "",
      title: "Health",
      precreated: true,
    },
    {
      importanceStatement: "",
      title: "Career",
      precreated: true,
    },
    {
      importanceStatement: "",
      title: "Relationships",
      precreated: true,
    }
  ])
  
  useEffect(
    () => {
      if (newUserLogin) {
        try {
          precreatedAspects.forEach(aspect => {
            const precreatedAspect = {
              userId: activeUser.id,
              createdAt: Date.now(),
              deleted: false,
              ...aspect
            }
            db.collection('Aspects').add(precreatedAspect)
          })  
        } catch (err) {
          console.log(err)
          Alert.alert(
            'Error saving aspect',
            `${err}`
              [
                {
                  text: 'Go Back',
                  style: 'destructive'
                }
              ],
          )        
        } finally {
          authDispatch({type: 'NEW_USER_LOGGED_IN'})
        }
      }
    }, [activeUser.id, authDispatch, newUserLogin, precreatedAspects]
  )

  useEffect(
    () => {
      if (state.needsUpdatedTitle.value) { 
        try {
          db.collection('Aspects').doc(state.needsUpdatedTitle.id).update({ title:  state.needsUpdatedTitle.title}).then(() => {
            dispatch({ type: 'UPDATED' })
          })
        } catch (err) {
          console.log(
            'err in update: ', err
          )
          Alert.alert(
            'Error updating title',
            `${err}`
              [
                {
                  text: 'Go Back',
                  style: 'destructive'
                }
              ],
          )        
        }
      }
    }, [state.needsUpdatedTitle]
  )

  useEffect(
    () => {
      if (state.needsUpdatedImportance.value) { 
        try {
          db.collection('Aspects').doc(state.needsUpdatedImportance.id).update({ importanceStatement:  state.needsUpdatedImportance.importance}).then(() => {
            dispatch({ type: 'UPDATED' })
          })
        } catch (err) {
          console.log(
            'err in update: ', err
          )
          Alert.alert(
            'Error updating importance',
            `${err}`
              [
                {
                  text: 'Go Back',
                  style: 'destructive'
                }
              ],
          )        
        }
      }
    }, [state.needsUpdatedImportance]
  )
  
  useEffect(
    () => {
      let subscriber 
      try {
        subscriber = db.collection('Aspects').where(
          'userId', '==', activeUser.id
        ).onSnapshot(querySnapshot => {
          const aspectData = []
          querySnapshot.forEach((doc) => {
            const withId = {
              id: doc.id,
              ...doc.data()
            }
            aspectData.push(withId)
          })
          dispatch({
            type: 'SET_ASPECTS',
            data: aspectData
          })
        })
      } catch (err) {
        Alert.alert(
          'Error Creating Aspect',
          `${err}`
            [
              {
                text: 'Go Back',
                style: 'destructive'
              }
            ],
        )        
        console.log('err')
      }
      return () => subscriber()
    }, [activeUser.id]
  )

  useEffect(
    () => {
      if (state.needsSaved.value) {
        try {
          const newAspect = {
            userId: activeUser.id,
            createdAt: Date.now(),
            deleted: false,
            ...state.needsSaved.data
          }
  
          db.collection('Aspects').add(newAspect)
            .then((doc) => {
              modalDispatch({
                type: 'OPEN',
                modalType: 'GET_ASPECT_DETAILS',
                modalData: {
                  id: doc.id,
                  ...newAspect
                }
              })
            })
          
        } catch (err) {
          console.log(err)
          Alert.alert(
            'Error saving aspect',
            `${err}`
              [
                {
                  text: 'Go Back',
                  style: 'destructive'
                }
              ],
          )        

        }
      }
    }, [activeUser.id, modalDispatch, state.needsSaved]
  )

  return (
    <AspectsContext.Provider value={[state, dispatch]}>
      {children}
    </AspectsContext.Provider>
  )
}