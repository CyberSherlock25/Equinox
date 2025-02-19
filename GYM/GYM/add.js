// Firebase Configuration
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
  firebase.initializeApp(firebaseConfig);
  
  // Reference to Firebase database
  var gymAdmissionDB = firebase.database().ref("gymAdmissions");
  
  // Function to get element value
  function getElementVal(id) {
    return document.getElementById(id).value;
  }
  
  // Function to save form data to Firebase
  function saveFormDataToFirebase() {
    var name = getElementVal("name");
    var email = getElementVal("email");
    var phone = getElementVal("phone");
    var program = getElementVal("program");
    var message = getElementVal("message");
  
    if (name === "" || email === "" || phone === "" || program === "") {
      alert("Please fill in all required fields.");
      return;
    }
  
    var newFormEntry = gymAdmissionDB.push();
    newFormEntry.set({
      name: name,
      email: email,
      phone: phone,
      program: program,
      message: message,
      submissionDate: new Date().toLocaleString() // Add timestamp
    });
  }
  
  // Show popup on form submission
  function handleFormSubmit() {
      document.getElementById('popup-box').style.display = 'block';
      document.getElementById('popup-overlay').style.display = 'block';
      saveFormDataToFirebase(); // Call the function to save form data
      return false; // Prevent form submission
  }
  
  function closePopup() {
      document.getElementById('popup-box').style.display = 'none';
      document.getElementById('popup-overlay').style.display = 'none';
  }
  