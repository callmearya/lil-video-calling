// main.js
import { database } from './firebase.js';

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

function joinRoom(roomCode) {
    alert(`Joining room: ${roomCode}`);
}

// Fetch rooms on page load
fetchRooms();
