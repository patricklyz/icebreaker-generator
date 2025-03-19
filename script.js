const generateBtn = document.getElementById("generate-btn");
const questionContainer = document.getElementById("question-container");
const replyInput = document.getElementById("reply-input");
const submitReplyBtn = document.getElementById("submit-reply");
const responseText = document.getElementById("response-text");
const questionTimer = document.getElementById("question-timer");
const timerBar = document.getElementById("timer-bar");
const pointsDisplay = document.getElementById("points");
const badgeDisplay = document.getElementById("badge");

// Review section
const reviewInput = document.getElementById("review-input");
const submitReviewBtn = document.getElementById("submit-review");
const reviewResponseText = document.getElementById("review-response-text");

let timer;
let timeLeft = 30;
let points = 0;
let badges = [];

const icebreakerQuestions = [
    "What is your favorite hobby?",
    "Where would you like to travel next?",
    "What is your favorite food?",
    "If you could meet any celebrity, who would it be?",
    "What is your dream job?",
];

const badgeRequirements = [
    { name: "Beginner", points: 0 },
    { name: "Novice", points: 50 },
    { name: "Hypertyper", points: 100 },
    { name: "Mastermind", points: 150 },
    { name: "Guru", points: 200 },
];

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
            responseText.textContent = "You ran out of time! Try again!";
        }
    }, 1000);
}

function updateTimerDisplay() {
    questionTimer.textContent = `Timer: ${timeLeft}s`;
}

function updateTimerBar() {
    timerBar.style.width = (timeLeft / 30) * 100 + "%";
}

function analyzeAnswer(answer) {
    const invalidWords = ['.', '!', '?', 'idk', 'nothing', 'meh'];
    if (invalidWords.some(word => answer.toLowerCase().includes(word))) {
        return false;
    }
    return true;
}

function generateResponse(isValid) {
    if (isValid) {
        points += 50;
        responseText.textContent = "Good job! You earned 50 points!";
    } else {
        points += 10;
        responseText.textContent = "Not the answer I was looking for, but keep trying! You earned 10 points!";
    }
    pointsDisplay.textContent = points;
    updateBadge();
}

function updateBadge() {
    for (let i = badgeRequirements.length - 1; i >= 0; i--) {
        if (points >= badgeRequirements[i].points) {
            badgeDisplay.textContent = badgeRequirements[i].name;
            break;
        }
    }
}

generateBtn.addEventListener("click", () => {
    const question = generateIcebreaker();
    questionContainer.textContent = question;
    responseText.textContent = "";
    replyInput.value = "";
    startTimer();
});

submitReplyBtn.addEventListener("click", () => {
    const userReply = replyInput.value.trim();
    if (userReply) {
        clearInterval(timer);
        const isValid = analyzeAnswer(userReply);
        generateResponse(isValid);
        setTimeout(() => {
            responseText.textContent = "Great! Click 'Generate Question' for another one!";
        }, 3000);
    } else {
        responseText.textContent = "Please enter an answer!";
    }
});

// Review section
submitReviewBtn.addEventListener("click", () => {
    const review = reviewInput.value.trim();
    if (review) {
        reviewResponseText.textContent = "You have submitted your review!";
        reviewInput.value = ""; // Clear the input field after submission
    } else {
        reviewResponseText.textContent = "Please enter a review before submitting.";
    }
});

