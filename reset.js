// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDp1aREeo5M9ZXopR-Wo4jDwuj-xzhv9o",
  authDomain: "signin-signup-e29b0.firebaseapp.com",
  projectId: "signin-signup-e29b0",
  storageBucket: "signin-signup-e29b0.appspot.com",
  messagingSenderId: "896940003272",
  appId: "1:896940003272:web:6e902a1e9345f153653afd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get the reset code from the URL
const queryParams = new URLSearchParams(window.location.search);
const oobCode = queryParams.get("oobCode");

// Handle the reset password form submission
document.getElementById("reset-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const newPassword = document.getElementById("new-password").value;
  const message = document.getElementById("message");

  if (!newPassword || !oobCode) {
    message.textContent = "Missing password or reset code.";
    message.className = "error";
    return;
  }

  // Confirm the password reset
  confirmPasswordReset(auth, oobCode, newPassword)
    .then(() => {
      message.textContent = "✅ Password has been reset!";
      message.className = "success";
    })
    .catch((error) => {
      message.textContent = "❌ " + error.message;
      message.className = "error";
    });
});
