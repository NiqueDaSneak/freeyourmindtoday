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

const reducer = (state, action) => {
  switch (action.type) {
  case 'LOADING_CONSIDERATIONS':
    return {
      ...state,
      loading: action.value,
    }
  case 'ADD_NEW':
    if (action.considerationType === 'short') {
      return {
        ...state,
        shortTermConsiderations: [...state.shortTermConsiderations, action.newConsideration],
        needsSaved: {
          value: true,
          type: action.considerationType,
          considerationData: action.newConsideration
        }
      }
    } 
    if (action.considerationType === 'long') {
      return {
        ...state,
        longTermConsiderations: [...state.longTermConsiderations, action.newConsideration],
        needsSaved: {
          value: true,
          type: action.considerationType,
          considerationData: action.newConsideration
        }
      }
    } 
    break
  case 'SAVED_NEW_CONSIDERATION':
    return {
      ...state,
      needsSaved: {
        value: false,
        type: null,
        considerationData: null
      }
    }

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
        unloadedLongConsiderations.push(doc.data())
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
        unloadedShortConsiderations.push(doc.data())
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
    if (state.needsSaved.value) {
      const { type, considerationData } = state.needsSaved
      let newConsideration = {
        userId: activeUser.id,
        type: type,
        createdAt: Date.now(),
        ...considerationData
      }
      db.collection('Considerations').add(newConsideration)
        .then((docRef) => {
          dispatch({
            type: 'SAVED_NEW_CONSIDERATION' 
          })
        })

      // console.log(state.newestAspect)
    }
  }, [state.needsSaved])

  return (
    <ConsiderationsContext.Provider value={[state, dispatch]}>
      {children}
    </ConsiderationsContext.Provider>
  )
}
