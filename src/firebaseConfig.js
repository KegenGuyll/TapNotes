import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAOzatPT7TTI83Rv2Da2IZ-R5UU9uJ2Rpc',
  authDomain: 'tapnotes-a6b0c.firebaseapp.com',
  databaseURL: 'https://tapnotes-a6b0c.firebaseio.com',
  projectId: 'tapnotes-a6b0c',
  storageBucket: 'tapnotes-a6b0c.appspot.com',
  messagingSenderId: '193767894678'
};

const firebaseInit = firebase.initializeApp(config);
export default firebaseInit.firestore();
