import firebase from 'firebase/app';
import 'firebase/database'; // Import Realtime Database

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

const database = firebase.database(); // Initialize Realtime Database
const roomsContainer = document.getElementById('roomsContainer');

// Fetch available rooms from Firebase Realtime Database and display them as buttons
async function loadRooms() {
  const roomsRef = database.ref('realtimeCalls');
  roomsRef.on('value', (snapshot) => {
    roomsContainer.innerHTML = ''; // Clear previous content
    snapshot.forEach((childSnapshot) => {
      const roomId = childSnapshot.key; // Unique room code
      const button = document.createElement('button');
      button.textContent = roomId; // Display the room ID
      button.className = 'room-button'; // Add class for styling
      button.onclick = () => {
        window.location.href = `/join.html?room=${roomId}`; // Redirect to join page
      };
      roomsContainer.appendChild(button);
    });
  });
}

// Load rooms when the page is loaded
window.onload = loadRooms;
