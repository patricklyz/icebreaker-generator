let points = 0;
let badges = [];

// Badge thresholds and names
const badgeThresholds = [
  { points: 100, name: "Hypertyper" },
  { points: 200, name: "Commander Answerer" },
  { points: 300, name: "Master of Icebreakers" },
  { points: 400, name: "Quiz King" },
  { points: 500, name: "Word Wizard" },
  { points: 1000, name: "Ultimate Answerer" },
  { points: 5000, name: "Icebreaker Legend" },
  { points: 10000, name: "The Grandmaster" }
];

const pointsDisplay = document.getElementById('points-display');
const badgeDisplay = document.getElementById('badge-display');
const questionText = document.getElementById('question-text');
const replyInput = document.getElementById('reply-input');
const submitReplyBtn = document.getElementById('submit-reply');
const generateBtn = document.getElementById('generate-btn');
const timerBar = document.getElementById('timer-bar');
const responseText = document.getElementById('response-text');
const timerDisplay = document.getElementById('timer-display');

// Define icebreaker questions
const icebreakerQuestions = [
  "What's your favorite hobby?",
  "If you could travel anywhere, where would you go?",
  "What’s your favorite movie and why?",
  "If you could have any superpower, what would it be?",
  "What’s a fun fact about you?"
];

// Timer variables
let timeLeft = 30;
let timer;

function generateIcebreaker() {
  const randomIndex = Math.floor(Math.random() * icebreakerQuestions.length);
  return icebreakerQuestions[randomIndex];
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimerDisplay();
  updateTimerBar();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    updateTimerBar();
    if (timeLeft <= 0) {
      clearInterval(timer);
      responseText.textContent = "You ran out of time!";
      points += 10;  // Give 10 points if time is up
      updatePoints();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = `Time: ${timeLeft}s`;
}

function updateTimerBar() {
  timerBar.style.width = (timeLeft / 30) * 100 + "%";
  timerBar.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

function checkAnswer(userAnswer) {
  const lowerAnswer = userAnswer.toLowerCase().trim();
  const invalidAnswers = ['idk', 'nothing', 'meh', 'no', 'i don’t know'];

  // Check for invalid answers
  if (invalidAnswers.includes(lowerAnswer)) {
    return "Hmm... not the most exciting answer, but okay.";
  }
  
  // Check for nonsense (very short or random text)
  if (lowerAnswer.length < 3 || !/^[a-zA-Z]+$/.test(lowerAnswer)) {
    return "Please provide a more thoughtful answer!";
  }

  return "Great answer! Keep it up!";
}

function generateResponse(userReply) {
  return checkAnswer(userReply);
}

function updatePoints() {
  pointsDisplay.textContent = `Points: ${points}`;
  // Check for badge achievements
  checkBadges();
}

function checkBadges() {
  badgeDisplay.innerHTML = ''; // Clear previous badges
  badgeThresholds.forEach(threshold => {
    if (points >= threshold.points && !badges.includes(threshold.name)) {
      badges.push(threshold.name);
      const badge = document.createElement('div');
      badge.classList.add('badge');
      badge.textContent = threshold.name;
      badgeDisplay.appendChild(badge);
    }
  });
}

// Event Listener for Generating a New Question
generateBtn.addEventListener('click', () => {
  const question = generateIcebreaker();
  questionText.textContent = question;
  responseText.textContent = ""; // Clear previous response
  replyInput.value = ""; // Clear input field
  startTimer(); // Restart the timer
});

// Event Listener for Submitting an Answer
submitReplyBtn.addEventListener('click', () => {
  const userReply = replyInput.value.trim();
  if (userReply) {
    clearInterval(timer); // Stop timer
    responseText.textContent = generateResponse(userReply);
    points += 50; // Add points for a valid response
    updatePoints();
  } else {
    responseText.textContent = "Please provide an answer!";
  }
});
