import { 
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from './firebase.js';

// DOM Elements
const googleLoginBtn = document.getElementById('googleLoginBtn');
const emailLoginBtn = document.getElementById('emailLoginBtn');
const guestBtn = document.getElementById('guestBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authState = document.getElementById('authState');
const unauthState = document.getElementById('unauthState');
const userEmailSpan = document.getElementById('userEmail');
const toast = document.getElementById('toast');

// Google Sign-In
googleLoginBtn.addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    showToast('Signed in successfully!', 'success');
  } catch (error) {
    showToast(getErrorMessage(error), 'error');
  }
});

// Email Login (redirect)
emailLoginBtn.addEventListener('click', () => {
  window.location.href = '/login.html'; // Create this page
});

// Guest Access
guestBtn.addEventListener('click', () => {
  window.location.href = '/symptoms.html';
  showToast('Continuing as guest', 'success');
});

// Logout
logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    showToast('Signed out successfully', 'success');
  } catch (error) {
    showToast(getErrorMessage(error), 'error');
  }
});

// Auth State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    authState.style.display = 'block';
    unauthState.style.display = 'none';
    userEmailSpan.textContent = user.email;
  } else {
    // User is logged out
    authState.style.display = 'none';
    unauthState.style.display = 'block';
  }
});

// Helper Functions
function showToast(message, type = 'info') {
  toast.textContent = message;
  toast.className = `toast ${type} visible`;
  
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}

function getErrorMessage(error) {
  switch (error.code) {
    case 'auth/popup-closed-by-user':
      return 'Login popup was closed';
    case 'auth/network-request-failed':
      return 'Network error occurred';
    case 'auth/popup-blocked':
      return 'Popup was blocked by your browser';
    default:
      return 'Authentication failed. Please try again.';
  }
}