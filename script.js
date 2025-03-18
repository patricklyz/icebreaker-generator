// List of icebreaker questions
const icebreakerQuestions = [
  "If you could have dinner with any historical figure, who would it be and why?",
  "What’s the most interesting place you’ve ever visited?",
  "If you could instantly master any skill, what would it be?",
  "What’s your favorite way to spend a weekend?",
  "If you were stranded on a deserted island, what three things would you bring?",
  "What’s the best book you’ve read recently?",
  "If you could live in any fictional world, where would you choose?",
  "What’s something you’re really good at that most people don’t know about?",
  "If you could time travel, would you go to the past or the future?",
  "What’s your go-to karaoke song?",
  "What’s the most memorable meal you’ve ever had?",
  "If you could switch lives with someone for a day, who would it be?",
  "What’s the most spontaneous thing you’ve ever done?",
  "If you could only eat one food for the rest of your life, what would it be?",
  "What’s your favorite way to unwind after a long day?"
];

// DOM Elements
const generateBtn = document.getElementById("generate-btn");
const questionText = document.getElementById("question-text");
const questionTimer = document.getElementById("question-timer");
const timerBar = document.getElementById("timer-bar");
const replyInput = document.getElementById("reply-input");
const submitReplyBtn = document.getElementById("submit-reply");
const responseText = document.getElementById("response-text");

let timer;
let timeLeft = 10; // Time limit for answering (in seconds)

// Function to Generate a Random Question
function generateIcebreaker() {
  const randomIndex = Math.floor(Math.random() * icebreakerQuestions.length);
  return icebreakerQuestions[randomIndex];
}

// Function to Start the Timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 10; // Reset timer
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

// Function to Update Timer Bar with Crazy Colors
function updateTimerBar() {
  const crazyColors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33F6", "#F6FF33", 
    "#FF6633", "#33F6FF", "#F633FF", "#FF3333", "#33FF99"
  ];
  
  const randomColor = crazyColors[Math.floor(Math.random() * crazyColors.length)];
  timerBar.style.backgroundColor = randomColor;
  timerBar.style.width = (timeLeft / 10) * 100 + "%";
}

// Function to Check If Answer is Nonsense (Not a Real Word)
function isValidAnswer(userReply) {
  // Check for gibberish: Allow letters and spaces only
  const validPattern = /^[A-Za-z\s]+$/;
  return validPattern.test(userReply);
}

// Function to Check If Answer is a Known Short Answer (e.g., "idk", "nothing")
function isShortAnswer(userReply) {
  const shortAnswers = ["idk", "nothing", "meh", "i don't know", "whatever", "no"];
  return shortAnswers.some(answer => userReply.toLowerCase().includes(answer));
}

// Function to Generate AI Response Based on User Input
function generateResponse(userReply) {
  const sarcasticResponses = [
    "Wow, groundbreaking answer. Truly inspiring.",
    "Oh, because that’s exactly what I was hoping for.",
    "Cool story, bro. Tell it again.",
    "Wow, you really put a lot of thought into that, huh?"
  ];

  const complimentResponses = [
    "That’s a fantastic answer! You’re really thoughtful.",
    "I love that! You’re so creative.",
    "Great response! You’re full of great ideas.",
    "Amazing! You’re really good at this."
  ];

  const confusedResponses = [
    "Uh... what?",
    "I have no idea what that means.",
    "Are you speaking in code?",
    "Hmmm... not sure how to respond to that."
  ];

  // Check if the answer is gibberish
  if (!isValidAnswer(userReply)) {
    return confusedResponses[Math.floor(Math.random() * confusedResponses.length)];
  }

  // Check if the answer is a known short response like "idk"
  if (isShortAnswer(userReply)) {
    return "Hmm... not the most exciting answer, but okay.";
  }

  // Otherwise, return a compliment
  return complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
}

// Event Listener for Generating a New Question
generateBtn.addEventListener("click", () => {
  const question = generateIcebreaker();
  questionText.textContent = question;
  responseText.textContent = ""; // Clear previous response
  replyInput.value = ""; // Clear input field
  startTimer(); // Restart the timer
});

// Event Listener for Submitting an Answer
submitReplyBtn.addEventListener("click", () => {
  const userReply = replyInput.value.trim();
  if (userReply) {
    clearInterval(timer); // Stop timer
    responseText.textContent = generateResponse(userReply); // Generate response
    setTimeout(() => {
      responseText.textContent = "Great! Click 'Generate Question' for another one!";
    }, 3000); // Prompt for new question
  } else {
    responseText.textContent = "Please type a reply!";
  }
});
