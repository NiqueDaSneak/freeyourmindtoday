import React, { useReducer, createContext, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
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
  case 'ADD_NEW_ASPECT':
    return {
      ...state,
      aspects: [...state.aspects, action.payload],
      needsSaved: action.payload
    }
  case 'SAVED_NEW_ASPECT':
    return {
      ...state,
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
    console.log('inside func')
    dispatch({
      type: 'LOADING_ASPECTS',
      value: true 
    })
    let unloadedAspects = []
    console.log('activeUser.id: ', activeUser.id)
    let fbAspects =  db.collection('Aspects').where('userId', '==', activeUser.id)
    fbAspects.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        unloadedAspects.push(doc.data())
        console.log(doc.id, ' => ', doc.data())
      })
      dispatch({
        type: 'LOADING_ASPECTS',
        value: false 
      })
    })
    dispatch({
      type: 'LOADED_ASPECTS',
      unloadedAspects 
    })
  }

  useEffect(() => {
    if (!initialLoad && isAuthenticated) {
      console.log('in use effect')
      getAspectsOnInitialLoad()
      // console.log(getAspectsOnInitialLoad())
      // dispatch({
      //   type: 'LOADED_ASPECTS' 
      // })
      
    }
  }, [initialLoad, isAuthenticated])

  useEffect(() => {
    if (state.aspects.length > 0 && state.needsSaved !== null) {
      let newAspect = {
        userId: authState.activeUser.id,
        ...state.needsSaved
      }
      db.collection('Aspects').add(newAspect)
        .then((docRef) => {
          dispatch({
            type: 'SAVED_NEW_ASPECT' 
          })
        })

      console.log(state.newestAspect)
    }
  }, [state.needsSaved])

  return (
    <AspectsContext.Provider value={[state, dispatch]}>
      {children}
    </AspectsContext.Provider>
  )
}

AspectsContextProvider.propTypes = {
  children: PropTypes.any
}