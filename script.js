// Variables
const generateBtn = document.getElementById("generate-btn");
const questionText = document.getElementById("question-text");
const questionTimer = document.getElementById("question-timer");
const timerBar = document.getElementById("timer-bar");
const replyInput = document.getElementById("reply-input");
const submitReplyBtn = document.getElementById("submit-reply");
const responseText = document.getElementById("response-text");
const pointsDisplay = document.getElementById("points-display"); // Points display
const badgesDisplay = document.getElementById("badges-display"); // Badges display

let timer;
let timeLeft = 30; // Time set to 30 seconds
let points = 0; // Points counter

// Badge thresholds and names
const badgeThresholds = [100, 200, 300, 400, 500, 1000];
const badges = [
  "Hypertyper",
  "Commander Answerer",
  "Fast Thinker",
  "Master Respondent",
  "Speed Demon",
  "Top Performer",
];

// Add a badge at the respective thresholds
function updateBadges() {
  badgeThresholds.forEach((threshold, index) => {
    if (points >= threshold) {
      const badge = document.createElement("span");
      badge.classList.add("badge");
      badge.textContent = badges[index];
      badgesDisplay.appendChild(badge);
    }
  });
}

// Function to Generate a Random Question
const icebreakerQuestions = [
  "What’s your favorite hobby?",
  "If you could travel anywhere, where would you go?",
  "What’s the best piece of advice you’ve received?",
  "What book has had the most impact on you?",
  "If you could meet any historical figure, who would it be?",
  "What’s your favorite food?",
];

function generateIcebreaker() {
  const randomIndex = Math.floor(Math.random() * icebreakerQuestions.length);
  return icebreakerQuestions[randomIndex];
}

// Function to Start the Timer
function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();
  updateTimerBar();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timer);
      responseText.textContent = "You ran out of time! Click 'Generate Question' to try again.";
    }
  }, 1000);
}

// Function to Update Timer Display
function updateTimerDisplay() {
  questionTimer.textContent = `Timer: ${timeLeft}s`;
}

// Function to Update Timer Bar
function updateTimerBar() {
  const width = (timeLeft / 30) * 100 + "%";
  timerBar.style.width = width;
  timerBar.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color for crazy effect
}

// Function to Detect User's Answer and Award Points
function generateResponse(userReply) {
  const sarcasticResponses = [
    "Wow, groundbreaking answer. Truly inspiring.",
    "Oh, because that’s exactly what I was hoping for.",
    "Cool story, bro. Tell it again.",
    "Wow, you really put a lot of thought into that, huh?",
  ];
  const complimentResponses = [
    "That’s a fantastic answer! You’re really thoughtful.",
    "I love that! You’re so creative.",
    "Great response! You’re full of great ideas.",
    "Amazing! You’re really good at this.",
  ];
  const confusedResponses = [
    "Uh... what?",
    "I have no idea what that means.",
    "Are you speaking in code?",
    "Hmmm... not sure how to respond to that.",
  ];

  // Detect if the response is nonsense (e.g., random letters or "idk")
  const userReplyLower = userReply.toLowerCase();
  if (userReplyLower === "idk" || !userReply.match(/[a-zA-Z]/)) {
    points += 10; // Award 10 points for invalid answers
    return confusedResponses[Math.floor(Math.random() * confusedResponses.length)];
  }

  // Detect Sarcasm
  if (userReplyLower.includes("obviously") || userReplyLower.includes("sarcasm")) {
    return sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)];
  }

  // Default to a compliment if it's a reasonable answer
  points += 50; // Award 50 points for a valid answer
  return complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
}

// Event Listener for Generating a New Question
generateBtn.addEventListener("click", () => {
  const question = generateIcebreaker();
  questionText.textContent = question;
  responseText.textContent = "";
  replyInput.value = "";
  startTimer(); // Restart the timer
});

// Event Listener for Submitting an Answer
submitReplyBtn.addEventListener("click", () => {
  const userReply = replyInput.value.trim();
  if (userReply) {
    clearInterval(timer); // Stop timer when answer is submitted
    responseText.textContent = "You answered before time ran out! " + generateResponse(userReply);
    updatePointsDisplay();
    setTimeout(() => {
      responseText.textContent = "Great! Click 'Generate Question' for another one!";
      updateBadges();
    }, 3000);
  } else {
    responseText.textContent = "Please provide an answer!";
  }
});

// Function to Update the Points Display
function updatePointsDisplay() {
  pointsDisplay.textContent = `Points: ${points}`;
}

