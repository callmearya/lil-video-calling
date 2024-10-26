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

// Function to fetch and display available rooms
const fetchRooms = async () => {
    const roomsRef = database.ref('rooms');
    roomsRef.on('value', (snapshot) => {
        const roomsContainer = document.getElementById('roomsContainer');
        roomsContainer.innerHTML = ''; // Clear previous rooms

        snapshot.forEach((childSnapshot) => {
            const roomId = childSnapshot.key;
            const roomData = childSnapshot.val();

            // Create a button for each room
            const button = document.createElement('button');
            button.textContent = roomId;

            // Check if the room has reached the participant limit (2 participants)
            if (roomData.participants && roomData.participants >= 2) {
                button.disabled = true; // Greyed out if full
                button.classList.add('full'); // Add a class for styling
            } else {
                button.onclick = () => {
                    window.location.href = `your_call_page.html?roomId=${roomId}`; // Navigate to call page
                };
            }

            roomsContainer.appendChild(button);
        });
    });
};

// Fetch rooms when the page loads
fetchRooms();
