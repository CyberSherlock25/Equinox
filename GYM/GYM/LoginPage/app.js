// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq_PyPgxIiVeeDfpbbzDhmp_deIf9uAe4",
  authDomain: "equinox-gym.firebaseapp.com",
  databaseURL: "https://equinox-gym-default-rtdb.firebaseio.com",
  projectId: "equinox-gym",
  storageBucket: "equinox-gym.firebasestorage.app",
  messagingSenderId: "415549063164",
  appId: "1:415549063164:web:d7451b5b810a1583db3c79",
  measurementId: "G-YXN3BJ2KM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Reference to the form
const signupForm = document.getElementById("signupForm");

// Add event listener for form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Validate form
  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  if (!validateEmail(email)) {
    showMessage("Invalid email address.", "error");
    return;
  }

  // Create user with Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Save user data to Firebase Realtime Database
      const userData = {
        name: name,
        surname: surname,
        email: email,
        password:password,
      };

      set(ref(database, "users/" + user.uid), userData)
        .then(() => {
          showMessage("Sign up successful! Redirecting...", "success");
          setTimeout(() => {
            window.location.href = "./Test.html"; // Redirect to homepage or dashboard
          }, 2000);
        })
        .catch((error) => {
          showMessage("Error saving user data: " + error.message, "error");
        });
    })
    .catch((error) => {
      showMessage("Error during sign up: " + error.message, "error");
    });
});

// Helper function to validate email
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Helper function to show messages
function showMessage(message, type) {
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");

  if (type === "error") {
    errorMessage.textContent = message;
    successMessage.textContent = "";
  } else if (type === "success") {
    successMessage.textContent = message;
    errorMessage.textContent = "";
  }
}