const generateBtn = document.getElementById("generate-btn");
const questionContainer = document.getElementById("question-container");
const replyInput = document.getElementById("reply-input");
const submitReplyBtn = document.getElementById("submit-reply");
const responseText = document.getElementById("response-text");
const questionTimer = document.getElementById("question-timer");
const timerBar = document.getElementById("timer-bar");
const pointsDisplay = document.getElementById("points");
const badgeDisplay = document.getElementById("badge");

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

const icebreakerQuestions = [
    "What is your favorite hobby?",
    "Where would you like to travel next?",
    "What is your favorite food?",
    "If you could meet any celebrity, who would it be?",
    "What is your dream job?",
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

function updateBadgeDisplay() {
    // Loop through badge levels to find the highest badge the user qualifies for
    let earnedBadge = "Novice"; // Default badge
    for (let i = badgeLevels.length - 1; i >= 0; i--) {
        if (points >= badgeLevels[i].threshold) {
            earnedBadge = badgeLevels[i].badge;
            break;
        }
    }
    badgeDisplay.textContent = earnedBadge;
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

    // Update the badge display
    updateBadgeDisplay();
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

// Formspree Review Submission
const reviewForm = document.getElementById("review-form");
const reviewResponseText = document.getElementById("review-input");

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
        console.log("Response status:", response.status); // Log the HTTP status code
        if (response.ok) {
            // Show the success message
            reviewResponseText.textContent = "Thank you for submitting your review!";
            reviewResponseText.style.color = 'green';
            reviewForm.reset(); // Reset the form
        } else {
            // Handle errors if the submission fails
            return response.json().then(errorData => {
                console.error("Error details:", errorData); // Log the error details
                reviewResponseText.textContent = "Oops, something went wrong. Please try again later.";
                reviewResponseText.style.color = 'red';
            });
        }
    })
    .catch(error => {
        console.error("Fetch error:", error); // Log the fetch error
        reviewResponseText.textContent = "Oops, something went wrong. Please try again later.";
        reviewResponseText.style.color = 'red';
    });
});
