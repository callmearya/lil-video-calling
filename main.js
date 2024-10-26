import './style.css';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD1b7InCyJf03f82MBrFCXNd_1lir3nWrQ",
  authDomain: "lil-testing.firebaseapp.com",
  databaseURL: "https://lil-testing-default-rtdb.firebaseio.com",
  projectId: "lil-testing",
  storageBucket: "lil-testing.appspot.com",
  messagingSenderId: "309006701748",
  appId: "1:309006701748:web:2cfa73093e14fbcc2af3e1"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const roomsContainer = document.getElementById('roomsContainer');

// Fetch room codes from Firebase Realtime Database
async function fetchRooms() {
  const roomsRef = database.ref('rooms');

  roomsRef.on('value', (snapshot) => {
    roomsContainer.innerHTML = ''; // Clear previous room display
    const rooms = snapshot.val();

    if (rooms) {
      Object.keys(rooms).forEach((roomId) => {
        const roomData = rooms[roomId];

        // Create a div to display each room
        const roomDiv = document.createElement('div');
        roomDiv.textContent = `Room ID: ${roomId}, Participants: ${roomData.participants}`;
        
        roomsContainer.appendChild(roomDiv); // Append the room info to the container
      });
    } else {
      roomsContainer.textContent = 'No available rooms.'; // Message if no rooms
    }
  });
}

// Initialize fetching of rooms
fetchRooms();
