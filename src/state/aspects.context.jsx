import React, {
  useReducer,
  createContext,
  useEffect,
  useContext 
} from 'react'
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
      aspects: [...action.data]
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
  default:
    throw new Error()
  }
}

export const AspectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer, initialState
  )
  const [authState, authDispatch] = useContext(AuthContext)
  const { activeUser } = authState
  
  useEffect(
    () => {
      if (state.needsUpdatedTitle.value) { 
        try {
          db.collection('Aspects').doc(state.needsUpdatedTitle.id).update({ title:  state.needsUpdatedTitle.title}).then(() => {
            dispatch({ type: 'UPDATED' })
          })
        } catch (error) {
          console.log(
            'err in update: ', error
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
        } catch (error) {
          console.log(
            'err in update: ', error
          )
        }
      }
    }, [state.needsUpdatedImportance]
  )
  
  useEffect(
    () => {
      const subscriber = db.collection('Aspects').where(
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
      return () => subscriber()
    }, [activeUser.id]
  )

  useEffect(
    () => {
      if (state.needsSaved.value) {

        const newAspect = {
          userId: activeUser.id,
          createdAt: Date.now(),
          deleted: false,
          ...state.needsSaved.data
        }

        db.collection('Aspects').add(newAspect)
          .then(() => {
            dispatch({type: 'SAVED_NEW'})
          })
      }
    }, [activeUser.id, state.needsSaved]
  )

  return (
    <AspectsContext.Provider value={[state, dispatch]}>
      {children}
    </AspectsContext.Provider>
  )
}