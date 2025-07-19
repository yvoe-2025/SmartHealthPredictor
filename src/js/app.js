import { auth } from './firebase.js';

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const guestBtn = document.getElementById('guestBtn');

// Event Listeners
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        window.location.href = 'symptoms.html';
    });
}

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        window.location.href = 'symptoms.html';
    });
}

if (guestBtn) {
    guestBtn.addEventListener('click', () => {
        window.location.href = 'symptoms.html';
    });
}

// Auth State Listener
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is logged in:', user.email);
    } else {
        console.log('No user is logged in');
    }
});