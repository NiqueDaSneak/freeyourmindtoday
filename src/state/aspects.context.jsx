import React, { useReducer, createContext, useEffect, useContext } from 'react'
import { db } from '../../firebase'
import { AuthContext } from './auth.context'

export const AspectsContext = createContext()

const initialState = {
  aspects: [],
  needsSaved: null,
  loading: true,
  initialLoad: false,
}

const reducer = (state, action) => {
  switch (action.type) {
  case 'ASPECT_NEEDS_SAVED':
    return {
      ...state,
      needsSaved: action.payload
    }
  case 'SAVED_NEW_ASPECT':
    return {
      ...state,
      aspects: [...state.aspects, action.newAspect],
      needsSaved: null
    }
  case 'LOADING_ASPECTS': 
    return {
      ...state,
      loading: action.value
    }
  case 'LOADED_ASPECTS':
    return {
      ...state,
      initialLoad: true,
      aspects: action.unloadedAspects
    }
  default:
    throw new Error()
  }
}

export const AspectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { initialLoad } = state
  const [authState, authDispatch] = useContext(AuthContext)
  const { activeUser, isAuthenticated } = authState

  const getAspectsOnInitialLoad = () => {
    dispatch({
      type: 'LOADING_ASPECTS',
      value: true 
    })
    const unloadedAspects = []
    const fbAspects =  db.collection('Aspects').where('userId', '==', activeUser.id)
    
    fbAspects.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const aspect = {
          id: doc.id,
          ...doc.data()
        }
        unloadedAspects.push(aspect)
      })
      dispatch({
        type: 'LOADED_ASPECTS',
        value: false,
        unloadedAspects
      })
    })
  }

  useEffect(() => {
    if (!initialLoad && isAuthenticated) {
      getAspectsOnInitialLoad()
    }
  }, [initialLoad, isAuthenticated])

  useEffect(() => {
    if (state.needsSaved !== null) {

      const newAspect = {
        userId: authState.activeUser.id,
        createdAt: Date.now(),
        completed: false,
        ...state.needsSaved
      }

      db.collection('Aspects').add(newAspect)
        .then((doc) => {
          dispatch({
            type: 'SAVED_NEW_ASPECT', 
            newAspect: {
              ...newAspect,
              id: doc.id
            }
          })
        })
    }
  }, [state.needsSaved])

  return (
    <AspectsContext.Provider value={[state, dispatch]}>
      {children}
    </AspectsContext.Provider>
  )
}
