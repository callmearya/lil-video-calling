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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const roomsContainer = document.getElementById('roomsContainer');

// Fetch room codes from Firebase Realtime Database
async function fetchRooms() {
  const roomsRef = database.ref('rooms');
  
  roomsRef.on('value', (snapshot) => {
    roomsContainer.innerHTML = ''; // Clear previous room buttons
    const rooms = snapshot.val();
    
    if (rooms) {
      Object.keys(rooms).forEach((roomId) => {
        const roomData = rooms[roomId];
        const button = document.createElement('button');
        button.textContent = roomId;

        // Check participant count and enable/disable button
        if (roomData.participants >= 2) {
          button.disabled = true; // Greyed out if full
          button.classList.add('full'); // Optional: Add a class for styling
        } else {
          button.onclick = () => {
            // Logic to join the room goes here
            console.log(`Joining room: ${roomId}`);
            // Here you can add code to actually join the room (e.g., redirecting to another page or setting up WebRTC)
          };
        }

        roomsContainer.appendChild(button);
      });
    } else {
      roomsContainer.textContent = 'No available rooms.';
    }
  });
}

// Initialize fetching of rooms
fetchRooms();
