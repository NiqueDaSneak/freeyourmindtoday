import React, {
  useReducer, createContext, useEffect, useContext 
} from 'react'
import { db } from '../../firebase'
import { AuthContext } from './auth.context'

export const ConsiderationsContext = createContext()
const initialState = {
  considerations: [],
  needsSaved: {
    value: null,
    considerationData: null
  },
  needsSetPriority: {
    value: null,
    id: null
  },
  needsCompleted: {
    value: null,
    id: null
  },
}

const reducer = (
  state, action
) => {
  switch (action.type) {
  case 'SET_CONSIDERATIONS':
    return {
      ...state,
      considerations: [...action.considerationData]
    }
  case 'SET_PRIORITY':
    return {
      ...state,
      needsSetPriority: {
        value: true,
        id: action.id
      }
    }
  case 'PRIORITIZED':
    return {
      ...state,
      needsSetPriority: {
        value: false,
        id: null
      }
    }
  case 'SET_COMPLETE': 
    return {
      ...state,
      needsCompleted: {
        value: true,
        id: action.id
      }
    }
  case 'COMPLETED': 
    return {
      ...state,
      needsCompleted: {
        value: false,
        id: null
      }
    }
  case 'ADD_NEW':
    return {
      ...state,
      needsSaved: {
        value: true,
        considerationData: action.newConsideration,
      }
    }
  case 'SAVED_NEW':
    return {
      ...state,
      needsSaved: {
        value: false,
        considerationData: null
      }
    }
  default:
    throw new Error()
  }
}

export const ConsiderationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer, initialState
  )
  const [authState, authDispatch] = useContext(AuthContext)
  const {activeUser} = authState

  useEffect(
    () => {
      const subscriber = db.collection('Considerations').where(
        'userId', '==', activeUser.id
      ).onSnapshot(querySnapshot => {
        const considerationData = []
        querySnapshot.forEach((doc) => {
          const withId = {
            id: doc.id,
            ...doc.data()
          }
          considerationData.push(withId)
        })
        dispatch({
          type: 'SET_CONSIDERATIONS',
          considerationData
        })
      })
      return () => subscriber()
    }, [activeUser.id]
  )

  useEffect(
    () => {
      if (state.needsSaved.value) {
        const { considerationData } = state.needsSaved
        const newConsideration = {
          userId: activeUser.id,
          createdAt: Date.now(),
          completed: false,
          completedAt: null,
          deleted: false,
          deletedAt: null,
          priority: false,
          prioritizedAt: null,
          ...considerationData
        }
        db.collection('Considerations').add(newConsideration).then(() => {
          dispatch({type: 'SAVED_NEW'})
        })
      }
    }, [activeUser.id, state.needsSaved]
  )

  useEffect(
    () => {
      if (state.needsCompleted.value) {
        db.collection('Considerations').doc(state.needsCompleted.id).update({ completed: true }).then(() => {
          dispatch({type: 'COMPLETED'})
        })
      }
    }, [state.needsCompleted]
  )

  useEffect(
    () => {
      if (state.needsSetPriority.value) {
        db.collection('Considerations').doc(state.needsSetPriority.id).update({ priority: true }).then(() => {
          dispatch({type: 'PRIORITIZED'})
        })
      }
    }, [state.needsSetPriority]
  )

  return (
    <ConsiderationsContext.Provider value={[state, dispatch]}>
      {children}
    </ConsiderationsContext.Provider>
  )
}