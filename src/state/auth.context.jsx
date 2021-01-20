import React, {
  createContext, 
  useReducer, 
  useEffect, 
  useRef,
  useCallback, 
  useState 
} from 'react'
// import useThunkReducer from 'react-hook-thunk-reducer'
// import { ModalContext } from '../state/modal.context'
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
  activeUser: {id: null,}
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
      activeUser: {id: action.id},
      isAuthenticated: true,
      newUserData: null,
      creatingNewUser: false
    }
  case 'AUTHENTICATING':
    return {
      ...state,
      authenticating: action.value,
      newUserLogin: action.newUserLogin,
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

  // const sendVerification = useCallback(() => {
  //   }, [state.phoneLogin.phoneNumber])

  const confirmCode = useCallback(() => firebase.auth.PhoneAuthProvider.credential(
    firebaseVerificationResponse,
    state.phoneLogin?.verificationCode
  ), [firebaseVerificationResponse, state.phoneLogin.verificationCode])


  const onAuthStateChange = () => firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('The user is logged in')
      dispatch({
        type: 'LOGIN_USER', 
        id: user.uid
      })
    } else {
      console.log('The user is not logged in')
    }
  })
  
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
                // .then(() => {
                //   dispatch({
                //     type: 'LOGIN_USER', 
                //     id: result.user.uid
                //   })
                // })
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
