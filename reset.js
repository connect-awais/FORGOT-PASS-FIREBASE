// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// 🔁 Step 1: Connect to your Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyBDp1aREeo5M9ZXopR-Wo4jDwuj-xzhv9o",
  authDomain: "signin-signup-e29b0.firebaseapp.com",
  projectId: "signin-signup-e29b0",
  storageBucket: "signin-signup-e29b0.firebasestorage.app",
  messagingSenderId: "896940003272",
  appId: "1:896940003272:web:6e902a1e9345f153653afd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Step 2: Get the reset code from the URL
const queryParams = new URLSearchParams(window.location.search);
const oobCode = queryParams.get("oobCode"); // This is sent in the email link

// ✅ Step 3: When user clicks the "Reset Password" button
document.getElementById("reset-btn").addEventListener("click", () => {
  const newPassword = document.getElementById("new-password").value;
  const message = document.getElementById("message");

  // Step 4: Check if user gave a new password and if code exists
  if (!newPassword || !oobCode) {
    message.textContent = "Missing password or reset code.";
    message.className = "error";
    return;
  }

  // ✅ Step 5: Tell Firebase to reset the password using the code and new password
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
