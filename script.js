const questions = [
    "If you could have dinner with any historical figure, who would it be?",
    "What’s a fun fact about you that most people don’t know?",
    "If you were stranded on a deserted island, what three things would you bring?",
    "What’s your go-to karaoke song?",
    "If you could instantly master any skill, what would it be?",
    "What’s the best trip you’ve ever been on?",
    "If you had to eat only one cuisine for the rest of your life, what would it be?",
    "What’s your favorite way to spend a weekend?",
    "If you could swap lives with a fictional character for a day, who would it be?",
    "What’s the most interesting thing you’ve learned recently?"
];

const compliments = [
    "That’s such a great answer! You have an awesome way of thinking!",
    "Wow! That’s a really unique and creative response!",
    "I love that perspective! You’re truly insightful!",
    "That’s an amazing take on it! You have a great mind!",
    "Fantastic answer! You’re so thoughtful!",
    "Your response is so interesting! I’d love to hear more!"
];

const sarcasticResponses = [
    "Oh wow, what an *amazing* answer. Truly groundbreaking!",
    "Oh sure, that’s definitely the most *original* response ever!",
    "Wow, I’ve *never* heard that one before! You must be a genius!",
    "Oh, absolutely! That’s exactly what I was *expecting* to hear!",
    "Oh great, another *totally unique* take. Bravo!"
];

function isSarcastic(response) {
    const sarcasmKeywords = ["oh sure", "right", "obviously", "yeah", "of course", "totally", "amazing", "groundbreaking", "never heard that before"];
    return sarcasmKeywords.some(keyword => response.toLowerCase().includes(keyword));
}

function generateQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    document.getElementById("question").innerText = questions[randomIndex];
    document.getElementById("response").value = "";
    document.getElementById("compliment").innerText = "";
}

function submitResponse() {
    let response = document.getElementById("response").value.trim();
    if (response !== "") {
        let complimentText = isSarcastic(response) 
            ? sarcasticResponses[Math.floor(Math.random() * sarcasticResponses.length)] 
            : compliments[Math.floor(Math.random() * compliments.length)];
        
        document.getElementById("compliment").innerText = complimentText;
    }
}
