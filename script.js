// Get elements
const generateBtn = document.getElementById("generate-btn");
const questionText = document.getElementById("question-text");
const questionTimer = document.getElementById("question-timer");
const timerBar = document.getElementById("timer-bar");
const replyInput = document.getElementById("reply-input");
const submitReplyBtn = document.getElementById("submit-reply");
const responseText = document.getElementById("response-text");
const scoreDisplay = document.getElementById("score-display");
const badgeSection = document.getElementById("badge-section");
const badges = document.getElementById("badges");

// Score and Badges variables
let score = 0;
let badgesEarned = [];
let timeLeft = 30; // Set initial timer to 30 seconds
let timer;

// List of questions
const icebreakerQuestions = [
  "What’s your favorite hobby?",
  "If you could travel anywhere, where would you go?",
  "If you could meet any famous person, who would it be?",
  "What’s your favorite food?",
  "If you could live in any era of history, when would it be?",
  "What’s one thing you couldn’t live without?",
  "What’s the best piece of advice you’ve ever received?",
  "What’s something you’ve always wanted to learn?",
  "If you could have dinner with any historical figure, who would it be?",
  "What’s your favorite book or movie?"
];

// Custom Badge Names
const badgeNames = [
  "Hypertyper", 
  "Commander Answerer", 
  "Quick Thinker", 
  "Master Responder", 
  "The Oracle", 
  "Answer Machine", 
  "Speedster", 
  "The Sage", 
  "Trivia King", 
  "Problem Solver"
];

// Function to generate random question
function generateIcebreaker() {
  const randomIndex = Math.floor(Math.random() * icebreakerQuestions.length);
  return icebreakerQuestions[randomIndex];
}

// Function to start the timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 30; // Reset timer to 30 seconds
  updateTimerDisplay();
  updateTimerBar();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timer);
      responseText.textContent = "You ran out of time! Please generate a new question.";
    }
  }, 1000);
}

// Function to update timer display
function updateTimerDisplay() {
  questionTimer.textContent = `Time Left: ${timeLeft}s`;
}

// Function to update timer bar
function updateTimerBar() {
  const width = (timeLeft / 30) * 100;
  timerBar.style.width = `${width}%`;
  // Add crazy color changes
  timerBar.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
}

// Function to check if the response is gibberish
function isGibberish(response) {
  // Check if the response contains only random letters and numbers
  const validWords = /^[a-zA-Z\s]+$/;
  return !validWords.test(response);
}

// Function to check if the response is one of the non-answer terms (like idk)
function isNonAnswer(response) {
  const nonAnswers = ["idk", "don't know", "meh", "no", "nothing", "whatever", "na", "naah"];
  return nonAnswers.includes(response.trim().toLowerCase());
}

// Function to calculate the response points and handle answers
function handleAnswer(userReply) {
  const trimmedReply = userReply.trim().toLowerCase();

  // If the answer is gibberish or too short
  if (isGibberish(trimmedReply) || trimmedReply.length < 3 || isNonAnswer(trimmedReply)) {
    score += 10;
    responseText.textContent = "Your answer seems unclear or like a non-answer. 10 points for trying!";
    return false;
  }

  // If answer is valid
  score += 50;
  responseText.textContent = "Great answer! You've earned 50 points!";
  return true;
}

// Function to update score and badges
function updateScore() {
  scoreDisplay.textContent = `Score: ${score} points`;

  // Award badges every 100 points up to 10,000 points
  for (let i = 100; i <= score && i <= 10000; i += 100) {
    if (!badgesEarned.includes(`Badge ${i} points`)) {
      badgesEarned.push(`Badge ${i} points`);
      displayBadge(i);
    }
  }
}

// Function to display the badge on the page
function displayBadge(points) {
  // Select a random badge name for each score milestone
  const randomBadgeName = badgeNames[Math.floor(Math.random() * badgeNames.length)];

  const badge = document.createElement("div");
  badge.classList.add("badge");
  badge.textContent = `${randomBadgeName} (${points} points)`;
  badges.appendChild(badge);
}

// Function to handle new question and timer restart
generateBtn.addEventListener("click", () => {
  const question = generateIcebreaker();
  questionText.textContent = question;
  responseText.textContent = ""; // Clear previous response
  replyInput.value = ""; // Clear input field
  startTimer(); // Restart the timer
});

// Function to handle submit answer and stop timer
submitReplyBtn.addEventListener("click", () => {
  const userReply = replyInput.value.trim();
  if (userReply) {
    // Stop the timer when answer is submitted
    clearInterval(timer);
    handleAnswer(userReply);
    updateScore(); // Update score after submitting answer
  } else {
    responseText.textContent = "Please provide an answer!";
  }
});

// Function to show rewards and badges
badgeSection.addEventListener("click", () => {
  alert("Here are your badges! You can claim a new badge when you reach certain points.");
});

// On page load, set the timer to 30 seconds
window.onload = () => {
  questionTimer.textContent = "Time Left: 30s";
};

