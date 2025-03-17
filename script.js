// List of daily challenges
const dailyChallenges = [
  "Take a 30-minute walk outside.",
  "Try a new recipe for dinner.",
  "Write down three things you're grateful for.",
  "Read for 30 minutes without distractions.",
  "Reach out to a friend you haven't spoken to in a while."
];

// DOM Elements
const dailyChallengeText = document.getElementById("daily-challenge-text");
const questionTimerText = document.getElementById("question-timer");
let questionTimer; // Variable to store the timer interval

// Function to generate a random daily challenge
function getDailyChallenge() {
  const storedDate = localStorage.getItem('challenge-date');
  const currentDate = new Date().toDateString();
  
  // Check if a challenge has already been shown today
  if (storedDate === currentDate) {
    dailyChallengeText.textContent = localStorage.getItem('daily-challenge');
  } else {
    const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
    const challenge = dailyChallenges[randomIndex];
    
    // Store the challenge and date in localStorage to persist until tomorrow
    localStorage.setItem('daily-challenge', challenge);
    localStorage.setItem('challenge-date', currentDate);
    
    dailyChallengeText.textContent = challenge;
  }
}

// Function to start the timer
function startTimer(duration) {
  let timer = duration, minutes, seconds;
  
  questionTimer = setInterval(function() {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;

    // Display the timer
    questionTimerText.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

    // If the timer reaches zero, stop it
    if (--timer < 0) {
      clearInterval(questionTimer);
      questionTimerText.textContent = "Time's up!";
      // Optionally show a response or prompt here
    }
  }, 1000);
}

// Function to generate a random icebreaker question
function generateIcebreaker() {
  const randomIndex = Math.floor(Math.random() * icebreakerQuestions.length);
  return icebreakerQuestions[randomIndex];
}

// Event Listener for Generate Button
generateBtn.addEventListener("click", () => {
  const question = generateIcebreaker();
  questionText.textContent = question;
  responseText.textContent = ""; // Clear previous response
  replyInput.value = ""; // Clear input field
  
  // Start the timer for 30 seconds (you can change the time as needed)
  startTimer(30);
});

// Event Listener for Submit Reply Button
submitReplyBtn.addEventListener("click", () => {
  const userReply = replyInput.value.trim();
  if (userReply) {
    const response = generateResponse(userReply);
    responseText.textContent = response;
  } else {
    responseText.textContent = "Please type a reply!";
  }
});

// Run the daily challenge function on page load
window.onload = function() {
  getDailyChallenge();
};
