import React, { useReducer, createContext, useEffect, useContext } from 'react'
import { db } from '../../firebase'
import { AuthContext } from './auth.context'

export const ConsiderationsContext = createContext()

const initialState = {
  longTermConsiderations: [],
  shortTermConsiderations: [],
  needsSaved: {
    value: null,
    type: null,
    considerationData: null
  },
  initialLoad: false,
}

const completeConsideration = (considerationType, id) => {
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
    completeConsideration(action.considerationType, action.id)
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
        type: action.considerationType,
        considerationData: action.newConsideration,
      }
    }
  case 'SAVED_NEW_CONSIDERATION':
    if (action.considerationType === 'short') {
      return {
        ...state,
        shortTermConsiderations: [...state.shortTermConsiderations, action.newConsideration],
        needsSaved: {
          value: false,
          type: null,
          considerationData: null
        }
      }
    }

    if (action.considerationType === 'long') {
      return {
        ...state,
        longTermConsiderations: [...state.longTermConsiderations, action.newConsideration],      
        needsSaved: {
          value: false,
          type: null,
          considerationData: null
        }
      }
    
    }
    break
  case 'LOADED_CONSIDERATIONS':
    return {
      ...state,
      longTermConsiderations: action.unloadedLongConsiderations,
      shortTermConsiderations: action.unloadedShortConsiderations
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
    let unloadedLongConsiderations = []
    let unloadedShortConsiderations = []
    let fbLongConsiderations =  db.collection('Considerations').where('userId', '==', activeUser.id).where('type', '==', 'long')
    let fbShortConsiderations =  db.collection('Considerations').where('userId', '==', activeUser.id).where('type', '==', 'short')

    dispatch({
      type: 'LOADING_CONSIDERATIONS',
      value: true 
    })
    fbLongConsiderations.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let consideration = {
          id: doc.id,
          ...doc.data()
        }
        unloadedLongConsiderations.push(consideration)
      })
      dispatch({
        type: 'LOADING_CONSIDERATIONS',
        value: false 
      })
    })

    dispatch({
      type: 'LOADING_CONSIDERATIONS',
      value: true 
    })
    fbShortConsiderations.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let consideration = {
          id: doc.id,
          ...doc.data()
        }
        unloadedShortConsiderations.push(consideration)
      })
      dispatch({
        type: 'LOADING_CONSIDERATIONS',
        value: false 
      })
    })

    dispatch({
      type: 'LOADED_CONSIDERATIONS',
      unloadedLongConsiderations,
      unloadedShortConsiderations 
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
      const { type, considerationData } = state.needsSaved
      let newConsideration = {
        userId: activeUser.id,
        type: type,
        createdAt: Date.now(),
        completed: false,
        deleted: false,
        ...considerationData
      }
      db.collection('Considerations').add(newConsideration)
        .then((docRef) => {
          let withId = {
            ...newConsideration,
            id: docRef.id
          }
          dispatch({
            type: 'SAVED_NEW_CONSIDERATION',
            considerationType: type,
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
