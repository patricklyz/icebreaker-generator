// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const profileSection = document.getElementById("profile-section");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const authMessage = document.getElementById("auth-message");
const profileEmail = document.getElementById("profile-email");
const favoriteQuestions = document.getElementById("favorite-questions");
const backToAppBtn = document.getElementById("back-to-app-btn");

// Show App Section When Logged In
function showAppSection() {
  authSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  profileSection.classList.add("hidden");
}

// Show Profile Section
function showProfileSection() {
  authSection.classList.add("hidden");
  appSection.classList.add("hidden");
  profileSection.classList.remove("hidden");
}

// Sign Up
signupBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Sign up user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      authMessage.textContent = "Sign up successful!";
      console.log("Sign up successful!");
      showAppSection();
    })
    .catch((error) => {
      authMessage.textContent = error.message;
      console.error("Sign up error: ", error.message);
    });
});

// Login
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Log in user with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      authMessage.textContent = "Login successful!";
      console.log("Login successful!");
      showAppSection();
    })
    .catch((error) => {
      authMessage.textContent = error.message;
      console.error("Login error: ", error.message);
    });
});

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    profileSection.classList.add("hidden");
    console.log("User logged out.");
  });
});

// Load Profile Data
backToAppBtn.addEventListener("click", showAppSection);

// Check Auth State
auth.onAuthStateChanged((user) => {
  if (user) {
    showAppSection();
    profileEmail.textContent = user.email;
    console.log("User logged in: ", user.email);

    // Load favorite questions from Firestore
    db.collection("users").doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          favoriteQuestions.textContent = doc.data().favorites.join(", ");
        }
      })
      .catch((error) => {
        console.error("Error loading user data: ", error.message);
      });
  } else {
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    profileSection.classList.add("hidden");
    console.log("No user logged in.");
  }
});

  appSection.classList.remove("hidden");
  profileSection.classList.add("hidden");
}

// Show Profile Section
function showProfileSection() {
  authSection.classList.add("hidden");
  appSection.classList.add("hidden");
  profileSection.classList.remove("hidden");
}

// Sign Up
signupBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      authMessage.textContent = "Sign up successful!";
      showAppSection();
    })
    .catch((error) => {
      authMessage.textContent = error.message;
    });
});

// Login
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      authMessage.textContent = "Login successful!";
      showAppSection();
    })
    .catch((error) => {
      authMessage.textContent = error.message;
    });
});

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    profileSection.classList.add("hidden");
  });
});

// Load Profile Data
backToAppBtn.addEventListener("click", showAppSection);

// Check Auth State
auth.onAuthStateChanged((user) => {
  if (user) {
    showAppSection();
    profileEmail.textContent = user.email;
    // Load favorite questions from Firestore
    db.collection("users").doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          favoriteQuestions.textContent = doc.data().favorites.join(", ");
        }
      });
  } else {
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    profileSection.classList.add("hidden");
  }
});
