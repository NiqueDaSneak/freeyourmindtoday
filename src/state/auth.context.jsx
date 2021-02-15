import React, {
  createContext, 
  useReducer, 
  useEffect, 
  useRef,
  useCallback, 
  useState,
  Alert
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
  activeUser: {
    id: null,
    phone: null,
    username: null
  },
  loggingOut: false,
  needSaveUsername: {
    value: false,
    username: null
  }
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
      activeUser: action.user,
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
      activeUser: {
        id: null,
        phone: null,
        username: null
      }
    }
  case 'NEW_USER_LOGIN':
    return {
      ...state,
      newUserLogin: true,
      activeUser: {id: action.id}
    }
  case 'NEW_USER_LOGGED_IN':
    return {
      ...state,
      newUserLogin: false
    }
  case 'SAVE_USERNAME':
    return {
      ...state,
      needSaveUsername: {
        value: true,
        username: action.username 
      }
    }
  case 'SAVED_USERNAME':
    return {
      ...state,
      activeUser: {
        ...state.activeUser,
        username: action.username
      },
      needSaveUsername: {
        value: false,
        username: null
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

  const confirmCode = useCallback(
    () => firebase.auth.PhoneAuthProvider.credential(
      firebaseVerificationResponse,
      state.phoneLogin?.verificationCode
    ), [firebaseVerificationResponse, state.phoneLogin.verificationCode]
  )

  useEffect(
    () => {
      if (state.needSaveUsername.value) {
        try {
          db.collection('Users').doc(state.activeUser.id).update({ username: state.needSaveUsername.username }).then(() => {
            dispatch({
              type: 'SAVED_USERNAME',
              username: state.needSaveUsername.username  
            })
          })
        } catch (err) {
          console.log(
            'err: ', err
          )
        }
      }
    }, [state.activeUser.id, state.needSaveUsername]
  )
  
  useEffect(
    () => {
      if (state.loggingOut) {
        firebase.auth().signOut()
      }
    }, [state.loggingOut]
  )

  const onAuthStateChange = useCallback(
    () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(
            'The user is logged in', user.phoneNumber, user.uid
          )
          try {
            db.collection('Users').where(
              'firebaseId', '==', user.uid
            ).get().then(snapshot => {
              snapshot.forEach(userDoc => {
                dispatch({
                  type: 'LOGIN_USER', 
                  user: userDoc.data()
                })
              })
            })
          } catch (err) {
            console.log(
              'err: ', err
            )
          }
        } else {
          console.log('The user is not logged in')
          dispatch({type: 'LOGGED_OUT'})
        }
      })
    },
    []
  )

  useEffect(
    () => {
      onAuthStateChange()
      return () => onAuthStateChange()

    }, [onAuthStateChange]
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
              const newUser = {
                firebaseId: result.user.uid,
                phone: result.user.phoneNumber,
              }
              db.collection('Users').add(newUser).then(docRef => {
                db.collection('Users').doc(docRef.id).update({ id: docRef.id }).then(() => {
                  try {
                    [
                      {
                        importanceStatement: "",
                        title: "Health",
                        precreated: true,
                      },
                      {
                        importanceStatement: "",
                        title: "Career",
                        precreated: true,
                      },
                      {
                        importanceStatement: "",
                        title: "Relationships",
                        precreated: true,
                      }
                    ].forEach(aspect => {
                      const precreatedAspect = {
                        userId: docRef.id,
                        createdAt: Date.now(),
                        deleted: false,
                        ...aspect
                      }
                      db.collection('Aspects').add(precreatedAspect)
                    })  
                  } catch (err) {
                    console.log(err)
                    Alert.alert(
                      'Error saving aspect',
                      `${err}`
                        [
                          {
                            text: 'Go Back',
                            style: 'destructive'
                          }
                        ],
                    )        
                  } finally {
                    dispatch({
                      type: 'LOGIN_USER', 
                      user:                     
                    {
                      id: docRef.id,
                      phone: result.user.phoneNumber,
                      username: null
                    }
                    })
                  }
                })
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