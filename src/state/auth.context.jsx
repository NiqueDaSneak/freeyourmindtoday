import React, {
  createContext, 
  useReducer, 
  useEffect, 
  useRef,
  useCallback, 
  useState 
} from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import fb from 'firebase'
import firebase, {db} from '../../firebase'

export const AuthContext = createContext()

const initialState = {
  phoneLogin: {
    loggingIn: false,
    verifyingCode: false,
    phoneNumber: null,
    verificationCode: ''
  },
  isAuthenticated: false,
  authenticating: false,
  newUserLogin: false,
  newUserData: null,
  activeUser: { id: null },
  loggingOut: false,
}

const reducer = (
  state, action
) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return {
      ...state,
      phoneLogin: {
        loggingIn: false,
        verifyingCode: false,
        phoneNumber: null,
        verificationCode: ''
      },
      activeUser: {
        id: action.id,
        phone: action.phone
      },
      isAuthenticated: true,
      newUserData: null,
      creatingNewUser: false
    }
  case 'PHONE_VERIFICATION':
    return {
      ...state,
      phoneLogin: {
        loggingIn: true,
        phoneNumber: action.phoneNumber
      }
    }
  case 'VERIFY_PHONE':
    return {
      ...state,
      phoneLogin: {
        verifyingCode: true,
        verificationCode: action.verifyCode
      }
    }
  case 'LOG_OUT':
    return {
      ...state,
      loggingOut: true
    }
  case 'LOGGED_OUT':
    return {
      ...state,
      isAuthenticated: false,
      loggingOut: false,
      activeUser: {id: null}
    }
  case 'NEW_USER_LOGIN':
    return {
      ...state,
      newUserLogin: true,
      activeUser: {id: action.id,}
    }
  case 'NEW_USER_LOGGED_IN':
    return {
      ...state,
      newUserLogin: false
    }
  default:
    throw new Error()
  }
}

export const AuthContextProvider = ({ children }) => {
  const [firebaseVerificationResponse, setFirebaseVerificationResponse] = useState('')

  const [state, dispatch] = useReducer(
    reducer, initialState
  )
  const recaptchaVerifier = useRef(null)

  const confirmCode = useCallback(
    () => firebase.auth.PhoneAuthProvider.credential(
      firebaseVerificationResponse,
      state.phoneLogin?.verificationCode
    ), [firebaseVerificationResponse, state.phoneLogin.verificationCode]
  )

  const onAuthStateChange = () => firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(
        'The user is logged in', user.phoneNumber
      )
      dispatch({
        type: 'LOGIN_USER', 
        id: user.uid,
        phone: user.phoneNumber
      })
    } else {
      console.log('The user is not logged in')
      dispatch({
        type: 'LOGGED_OUT', 
        // id: user.uid
      })
    }
  })

  useEffect(
    () => {
      if (state.loggingOut) {
        firebase.auth().signOut().then(() => {
          console.log('inside log out')
        })
        // (firebase.auth().currentUser())
      }
    }, [state.loggingOut]
  )
  
  useEffect(
    () => {
      const unsubscribe = onAuthStateChange()
      return () => {
        unsubscribe()
      }
    }, []
  )

  useEffect(
    () => {
      if (state.phoneLogin.loggingIn) {
        const phoneProvider = new fb.auth.PhoneAuthProvider()
        phoneProvider
          .verifyPhoneNumber(
            `+1${state.phoneLogin.phoneNumber}`, recaptchaVerifier.current
          )
          .then(val => setFirebaseVerificationResponse(val))
  
      }
    }, [state.phoneLogin.loggingIn, state.phoneLogin.phoneNumber]
  )

  useEffect(
    () => {
      if (state.phoneLogin.verifyingCode) {
        const credential = confirmCode()
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            if (result.additionalUserInfo.isNewUser) {
              const newUser = {firebaseId: result.user.uid,}
              db.collection('Users').add(newUser)
              dispatch({
                type: 'NEW_USER_LOGIN',
                id: result.user.uid
              })
            }
          })
      }
    }, [confirmCode, state.phoneLogin.verifyingCode]
  )

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      {children}
    </AuthContext.Provider>
  )
}
