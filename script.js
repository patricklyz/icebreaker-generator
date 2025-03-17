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
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const authMessage = document.getElementById("auth-message");
const profileEmail = document.getElementById("profile-email");
const favoriteQuestions = document.getElementById("favorite-questions");
const badgesSection = document.getElementById("badges-section"); // Section to display badges
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

// Assign Achievements and Badges
function assignBadge(user) {
  const userRef = db.collection("users").doc(user.uid);

  // Add a badge after the user logs in for the first time
  userRef.get().then((doc) => {
    if (doc.exists) {
      const userData = doc.data();
      const badges = userData.badges || [];

      // Example: Assign "First Login" badge if it's the first login
      if (!badges.includes("First Login")) {
        badges.push("First Login");
        userRef.update({ badges });
        console.log("Badge 'First Login' unlocked!");
      }

      // Example: Check if the user has generated 5 questions and unlock another badge
      if (userData.generatedQuestions && userData.generatedQuestions >= 5) {
        if (!badges.includes("Question Master")) {
          badges.push("Question Master");
          userRef.update({ badges });
          console.log("Badge 'Question Master' unlocked!");
        }
      }
      
      // Show badges in the profile
      badgesSection.innerHTML = "<h2>Achievements & Badges</h2>";
      badges.forEach(badge => {
        badgesSection.innerHTML += `<p>${badge}</p>`;
      });
    }
  });
}

// Login
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Log in user with email and password
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      authMessage.textContent = "Login successful!";
      showAppSection();

      // Assign and show achievements/badges
      assignBadge(user);
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

    // Load and assign badges
    assignBadge(user);
  } else {
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
    profileSection.classList.add("hidden");
  }
});
