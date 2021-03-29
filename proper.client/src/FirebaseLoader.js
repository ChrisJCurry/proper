import firebase from 'firebase/app'
import Storage from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDSeYaWTpFDfZRyWiTxc8ywkalJ3X60JOA',
  authDomain: 'proper-capstone.firebaseapp.com',
  projectId: 'proper-capstone',
  storageBucket: 'proper-capstone.appspot.com',
  messagingSenderId: '803927515408',
  appId: '1:803927515408:web:192f1b08478acaff2f0595'
}

firebase.initializeApp(firebaseConfig)

export const storage = firebase.storage()
