// Your Firebase configuration
var firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);

// Reference Firebase Authentication
var auth = firebase.auth();

// Add event listener to the form for authentication
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  var email = document.getElementById("emailid").value;
  var password = document.getElementById("password").value;

  // Authenticate the user using Firebase Authentication (Login)
  auth.signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // User logged in successfully
      var user = userCredential.user;
      console.log("User logged in:", user);

      // Show the modal upon successful login
      document.getElementById("thankYouModal").style.display = "flex";

      // Redirect to the payment page after 2 seconds
      setTimeout(function () {
        window.location.href = 'D:/TYCS-OTA22/MainProject/GYM/GYM/payment.html';
      }, 2000);
    })
    .catch(function (error) {
      // Handle errors here (e.g., wrong password or email)
      var errorMessage = error.message;
      console.error("Error during login:", errorMessage);
      alert(errorMessage);
      // The modal will NOT be shown if there's an error.
    });
});

// Optional: Hide the modal when clicking the close button
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("thankYouModal").style.display = "none";
});
