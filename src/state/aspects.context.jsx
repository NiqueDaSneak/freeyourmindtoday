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
  aspects: [],
  needsSaved: {
    value: null,
    data: null
  },
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
  default:
    throw new Error()
  }
}

export const AspectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    reducer, initialState
  )
  const [authState, authDispatch] = useContext(AuthContext)
  const {activeUser} = authState

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