// Select DOM elements
const generateBtn = document.getElementById("generate-btn");
const questionContainer = document.getElementById("question-container");
const replyInput = document.getElementById("reply-input");
const submitReplyBtn = document.getElementById("submit-reply");
const responseText = document.getElementById("response-text");
const questionTimer = document.getElementById("question-timer");
const timerBar = document.getElementById("timer-bar");
const pointsDisplay = document.getElementById("points");
const badgeDisplay = document.getElementById("badge");

// Variables
let timer;
let timeLeft = 30;
let points = 0;

// Define badge thresholds and names
const badgeLevels = [
    { threshold: 0, badge: "Novice" },
    { threshold: 50, badge: "Intermediate" },
    { threshold: 100, badge: "Advanced" },
    { threshold: 200, badge: "Expert" }
];

// Icebreaker questions
const icebreakerQuestions = [
    "What is your favorite hobby?",
    "Where would you like to travel next?",
    "What is your favorite food?",
    "If you could meet any celebrity, who would it be?",
    "What is your dream job?",
];

// Function to generate a random question
function generateIcebreaker() {
    const randomIndex = Math.floor(Math.random() * icebreakerQuestions.length);
    return icebreakerQuestions[randomIndex];
}

// Function to start the timer
function startTimer() {
    clearInterval(timer); // Clear any existing timers
    timeLeft = 30; // Reset the timer
    updateTimerDisplay();
    updateTimerBar();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        updateTimerBar();

        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            responseText.textContent = "You ran out of time! Try again!";
        }
    }, 1000);
}

// Update the timer display
function updateTimerDisplay() {
    questionTimer.textContent = `Timer: ${timeLeft}s`;
}

// Update the timer bar
function updateTimerBar() {
    timerBar.style.width = (timeLeft / 30) * 100 + "%";
}

// Analyze the user's answer
function analyzeAnswer(answer) {
    const invalidWords = ['.', '!', '?', 'idk', 'nothing', 'meh'];
    if (invalidWords.some(word => answer.toLowerCase().includes(word))) {
        return false; // Invalid answer
    }
    return true; // Valid answer
}

// Update the badge display based on points
function updateBadgeDisplay() {
    let earnedBadge = "Novice"; // Default badge
    for (let i = badgeLevels.length - 1; i >= 0; i--) {
        if (points >= badgeLevels[i].threshold) {
            earnedBadge = badgeLevels[i].badge;
            break;
        }
    }
    badgeDisplay.textContent = earnedBadge;
}

// Generate a response based on the answer validity
function generateResponse(isValid) {
    if (isValid) {
        points += 50; // Add 50 points for valid answers
        responseText.textContent = "Good job! You earned 50 points!";
    } else {
        points += 10; // Add 10 points for invalid answers
        responseText.textContent = "Not the answer I was looking for, but keep trying! You earned 10 points!";
    }

    // Update points and badge display
    pointsDisplay.textContent = points;
    updateBadgeDisplay();
}

// Event listener for "Generate Question" button
generateBtn.addEventListener("click", () => {
    const question = generateIcebreaker(); // Generate a random question
    questionContainer.textContent = question; // Display the question
    responseText.textContent = ""; // Clear previous response
    replyInput.value = ""; // Clear the input field
    startTimer(); // Start the timer
});

// Event listener for "Submit Answer" button
submitReplyBtn.addEventListener("click", () => {
    const userReply = replyInput.value.trim(); // Get the user's answer
    if (userReply) {
        clearInterval(timer); // Stop the timer
        const isValid = analyzeAnswer(userReply); // Analyze the answer
        generateResponse(isValid); // Generate a response and update points

        setTimeout(() => {
            responseText.textContent = "Great! Click 'Generate Question' for another one!";
        }, 3000); // Show a message after 3 seconds
    } else {
        responseText.textContent = "Please enter an answer!"; // Prompt the user to enter an answer
    }
});

// Formspree Review Submission
const reviewForm = document.getElementById("review-form");
const reviewResponseText = document.getElementById("review-response-text");

reviewForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(reviewForm);

    fetch(reviewForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            reviewResponseText.textContent = "Thank you for submitting your review!";
            reviewResponseText.style.color = 'green';
            reviewForm.reset(); // Reset the form
        } else {
            return response.json().then(errorData => {
                console.error("Error details:", errorData);
                reviewResponseText.textContent = "Oops, something went wrong. Please try again later.";
                reviewResponseText.style.color = 'red';
            });
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
        reviewResponseText.textContent = "Oops, something went wrong. Please try again later.";
        reviewResponseText.style.color = 'red';
    });
});
