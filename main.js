import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1b7InCyJf03f82MBrFCXNd_1lir3nWrQ",
  authDomain: "lil-testing.firebaseapp.com",
  databaseURL: "https://lil-testing-default-rtdb.firebaseio.com",
  projectId: "lil-testing",
  storageBucket: "lil-testing.appspot.com",
  messagingSenderId: "309006701748",
  appId: "1:309006701748:web:2cfa73093e14fbcc2af3e1"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const roomsList = document.getElementById('roomsList');

// Fetch available rooms from Firestore and display them
async function loadRooms() {
  const roomsSnapshot = await firestore.collection('calls').get();
  roomsSnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.id; // Display the room ID
    roomsList.appendChild(li);
  });
}

// Load rooms when the page is loaded
window.onload = loadRooms;
