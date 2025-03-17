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
const replyInput = document.getElementById("reply-input");
const submitReplyBtn = document.getElementById("submit-reply");
const responseText = document.getElementById("response-text");

// Function to generate a random icebreaker question
function generateIcebreaker() {
  const randomIndex = Math.floor(Math.random() * icebreakerQuestions.length);
  return icebreakerQuestions[randomIndex];
}

// Function to generate a response based on user input
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

  const neutralResponses = [
    "Hmm, interesting. Tell me more.",
    "Okay, I see where you’re coming from.",
    "Fair enough. Let’s move on.",
    "Got it. Let’s try another question."
  ];

  // Convert user reply to lowercase for easier checking
  userReply = userReply.toLowerCase();

  // Check for sarcastic triggers
  if (userReply.includes("sarcasm") || userReply.includes("obviously")) {
    return sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)];
  }

  // Check for short or non-committal answers
  if (userReply === "no" || userReply === "idk" || userReply === "i don't know") {
    return neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
  }

  // Default to a compliment
  return complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
}

// Event Listener for Generate Button
generateBtn.addEventListener("click", () => {
  const question = generateIcebreaker();
  questionText.textContent = question;
  responseText.textContent = ""; // Clear previous response
  replyInput.value = ""; // Clear input field
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
