import { 
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from './firebase.js';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const forgotPasswordLinks = document.querySelectorAll('.forgot-password');
const toast = document.getElementById('toast');

// Login Form Submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = loginForm['loginEmail'].value;
  const password = loginForm['loginPassword'].value;
  
  try {
    const loginBtn = loginForm.querySelector('button[type="submit"]');
    loginBtn.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Signing in...';
    loginBtn.disabled = true;
    
    await signInWithEmailAndPassword(auth, email, password);
    showToast('Login successful! Redirecting...', 'success');
    
    // Redirect to dashboard after short delay
    setTimeout(() => {
      window.location.href = '/symptoms.html';
    }, 1500);
    
  } catch (error) {
    showToast(getAuthErrorMessage(error), 'error');
    const loginBtn = loginForm.querySelector('button[type="submit"]');
    loginBtn.innerHTML = '<i class="ph ph-sign-in"></i> Login';
    loginBtn.disabled = false;
  }
});

// Password Reset
forgotPasswordLinks.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = prompt('Please enter your email address:');
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        showToast('Password reset email sent!', 'success');
      } catch (error) {
        showToast(getAuthErrorMessage(error), 'error');
      }
    }
  });
});

// Helper Functions
function showToast(message, type = 'info') {
  toast.textContent = message;
  toast.className = `toast ${type} visible`;
  
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 3000);
}

function getAuthErrorMessage(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/too-many-requests':
      return 'Account temporarily locked. Try again later or reset password';
    default:
      return 'Login failed. Please try again.';
  }
}