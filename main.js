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


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to fetch room codes and display them as buttons
function fetchRooms() {
    const roomsRef = database.ref('realtimeCalls');
    roomsRef.once('value', (snapshot) => {
        const rooms = snapshot.val();
        const roomsDiv = document.getElementById('rooms');
        roomsDiv.innerHTML = ''; // Clear existing buttons

        if (rooms) {
            Object.keys(rooms).forEach((roomCode) => {
                const button = document.createElement('button');
                button.textContent = `Join Room ${roomCode}`;
                button.onclick = () => joinRoom(roomCode);
                roomsDiv.appendChild(button);
            });
        } else {
            roomsDiv.innerHTML = '<p>No active rooms available.</p>';
        }
    });
}

// Function to handle joining a room (you can customize this)
function joinRoom(roomCode) {
    alert(`Joining room: ${roomCode}`);
    // Implement your room joining logic here
}

// Fetch rooms on page load
fetchRooms();
