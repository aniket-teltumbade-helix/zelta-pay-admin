const { default: firebase } = require('firebase')
var admin = require('firebase-admin')
const { Storage } = require('@google-cloud/storage')
const db = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://zpay-a2806-default-rtdb.firebaseio.com'
})

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAOD_1b7II_ZmVyaviegrPDWBHGr1B9DWY',
  authDomain: 'zpay-a2806.firebaseapp.com',
  databaseURL: 'https://zpay-a2806-default-rtdb.firebaseio.com',
  projectId: 'zpay-a2806',
  storageBucket: 'zpay-a2806.appspot.com',
  messagingSenderId: '959593349545',
  appId: '1:959593349545:web:fa466c723aab24efea44b8',
  measurementId: 'G-6TL45L5SG6'
})
const sBucket = new Storage({
  projectId: 'zpay-a2806',
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})
module.exports = { db, app, sBucket }
