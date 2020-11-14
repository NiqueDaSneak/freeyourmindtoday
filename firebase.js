import Constants from 'expo-constants'
import * as firebase from 'firebase'
import '@firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(Constants.manifest.extra.firebase)
export const db = firebase.firestore()

export default firebase