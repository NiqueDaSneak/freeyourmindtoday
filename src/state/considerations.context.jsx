import React, {
  useReducer, createContext, useEffect, useContext 
} from 'react'
import { db } from '../../firebase'
import { AuthContext } from './auth.context'

export const ConsiderationsContext = createContext()

const initialState = {
  needsSaved: {
    value: null,
    considerationData: null
  },
  initialLoad: false,
}

const completeConsideration = (id) => {
  try {
    db.collection('Considerations').doc(id).update({
      completed: true,
    })
  } catch (err) {
    console.log('err: ', err)
  }
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'SET_COMPLETE_CONSIDERATION': 
    completeConsideration(action.id)
    return {
      ...state,
    }
  case 'LOADING_CONSIDERATIONS':
    return {
      ...state,
      loading: action?.value,
    }
  case 'ADD_NEW':
    return {
      ...state,
      needsSaved: {
        value: true,
        considerationData: action.newConsideration,
      }
    }
  case 'SAVED_NEW_CONSIDERATION':
    return {
      ...state,
      considerations: [...state.considerations, action.newConsideration],      
      needsSaved: {
        value: false,
        type: null,
        considerationData: null
      }
    }
  case 'LOADED_CONSIDERATIONS':
    return {
      ...state,
      considerations: action.unloadedConsiderations,
    }
  default:
    throw new Error()
  }
}

export const ConsiderationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [authState, authDispatch] = useContext(AuthContext)
  const { initialLoad } = state
  const { activeUser, isAuthenticated } = authState

  const getConsiderationsOnInitialLoad = () => {
    const unloadedConsiderations = []
    const considerations =  db.collection('Considerations').where('userId', '==', activeUser.id)

    dispatch({
      type: 'LOADING_CONSIDERATIONS',
      value: true 
    })
    considerations.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const consideration = {
          id: doc.id,
          ...doc.data()
        }
        unloadedConsiderations.push(consideration)
      })
      dispatch({
        type: 'LOADING_CONSIDERATIONS',
        value: false 
      })
    })

    dispatch({
      type: 'LOADED_CONSIDERATIONS',
      unloadedConsiderations,
    })
  }

  useEffect(() => {
    if (!initialLoad && isAuthenticated) {
      getConsiderationsOnInitialLoad()
    }
  }, [initialLoad, isAuthenticated])

  useEffect(() => {
    // need to set id here
    if (state.needsSaved.value) {
      const { considerationData } = state.needsSaved
      const newConsideration = {
        userId: activeUser.id,
        createdAt: Date.now(),
        completed: false,
        deleted: false,
        ...considerationData
      }
      db.collection('Considerations').add(newConsideration)
        .then((docRef) => {
          const withId = {
            ...newConsideration,
            id: docRef.id
          }
          dispatch({
            type: 'SAVED_NEW_CONSIDERATION',
            newConsideration: withId 
          })
        })
    }
  }, [state.needsSaved])

  return (
    <ConsiderationsContext.Provider value={[state, dispatch]}>
      {children}
    </ConsiderationsContext.Provider>
  )
}
