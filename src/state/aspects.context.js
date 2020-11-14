import React, { useReducer, createContext, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { db } from '../../firebase'
import { AuthContext } from './auth.context'
export const AspectsContext = createContext()

const initialState = {
  aspects: [],
  needsSaved: null
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
  default:
    throw new Error()
  }
}

export const AspectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [authState, authDispatch] = useContext(AuthContext)
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