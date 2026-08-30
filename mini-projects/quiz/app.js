"use strict";
const questions = [];
let currentIndex = 0;
let score = 0;
let selectedChoice = null;
let answersLocked = false;
const questionText = document.querySelector("#question-text");
const questionMeta = document.querySelector("#question-meta");
const choicesContainer = document.querySelector("#choices-container");
const scoreDisplay = document.querySelector("#score-display");
const questionProgress = document.querySelector("#question-progress");
const submitButton = document.querySelector("#submit-button");
const nextButton = document.querySelector("#next-button");
const closeButton = document.querySelector("#close-results");
const restartButton = document.querySelector("#restart-quiz");
const resultsModal = document.querySelector("#results-modal");
const resultsSummary = document.querySelector("#results-summary");
const correctCountDisplay = document.querySelector("#correct-count");
const totalCount = document.querySelector("#total-count");
// Loads a fresh quiz set from the API and resets client state.
function loadQuestions() {
    questions.length = 0; // Clear the questions array
    currentIndex = 0;
    score = 0;
    // Load questions from a JSON file or an API endpoint
    fetch("api.php?action=questions")
        .then((response) => response.json())
        .then((data) => {
        if (!data.success)
            return;
        const normalizedQuestions = data.questions.map((ApiQuestion) => ({
            text: ApiQuestion.question_text,
            category: ApiQuestion.category,
            difficulty: ApiQuestion.difficulty,
            choices: ApiQuestion.choices.map((choice) => choice.choice_text),
            correctAnswer: ApiQuestion.choices.find((choice) => choice.is_correct)
                ?.choice_text || "",
        }));
        questions.push(...normalizedQuestions);
        renderQuestion();
    })
        .catch((error) => {
        console.error("Error loading questions:", error);
    });
}
// Renders the current question and updates button states.
function renderQuestion() {
    if (currentIndex < questions.length) {
        const currentQuestion = questions[currentIndex];
        if (questionText)
            questionText.textContent = currentQuestion.text;
        if (questionMeta)
            questionMeta.textContent = `Category: ${currentQuestion.category || "N/A"} | Difficulty: ${currentQuestion.difficulty || "N/A"}`;
        if (questionProgress)
            questionProgress.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
        if (choicesContainer) {
            choicesContainer.innerHTML = "";
            currentQuestion.choices.forEach((choice) => {
                const choiceButton = document.createElement("button");
                choiceButton.type = "button";
                choiceButton.textContent = choice;
                choiceButton.classList.add("choice-button", "btn", "btn-outline-dark", "btn-lg", "text-start");
                if (choice === selectedChoice) {
                    choiceButton.classList.add("is-selected");
                }
                choiceButton.disabled = answersLocked;
                choiceButton.addEventListener("click", () => selectChoice(choice));
                choicesContainer.appendChild(choiceButton);
            });
        }
        if (submitButton)
            submitButton.disabled = !selectedChoice || answersLocked;
        if (nextButton)
            nextButton.disabled = !answersLocked;
    }
}
// Stores the selected option and updates selection styles.
function selectChoice(choice) {
    if (answersLocked)
        return;
    selectedChoice = choice;
    const choiceButtons = choicesContainer?.querySelectorAll("button");
    choiceButtons?.forEach((button) => {
        const isSelected = button.textContent === choice;
        button.classList.toggle("is-selected", isSelected);
    });
    submitButton && (submitButton.disabled = false);
    nextButton && (nextButton.disabled = true);
}
// Validates the selected choice, updates score, and moves flow forward.
function submitAnswer() {
    if (!selectedChoice || answersLocked)
        return;
    let currentQuestion = questions[currentIndex];
    if (selectedChoice === currentQuestion.correctAnswer) {
        score++;
    }
    answersLocked = true;
    if (scoreDisplay) {
        scoreDisplay.textContent = String(score);
    }
    if (currentIndex === questions.length - 1) {
        showResults();
        return;
    }
    submitButton && (submitButton.disabled = true);
    nextButton && (nextButton.disabled = false);
    renderQuestion();
}
// Advances to the next question or shows final results.
function nextQuestion() {
    if (!answersLocked)
        return;
    currentIndex++;
    selectedChoice = null;
    answersLocked = false;
    submitButton && (submitButton.disabled = true);
    nextButton && (nextButton.disabled = true);
    if (currentIndex < questions.length) {
        renderQuestion();
    }
    else {
        showResults();
    }
}
// Displays the result modal with final stats.
function showResults() {
    if (resultsModal) {
        resultsModal.hidden = false;
        resultsModal.setAttribute("aria-hidden", "false");
    }
    if (resultsSummary)
        resultsSummary.textContent = `You scored ${score} out of ${questions.length}`;
    if (correctCountDisplay)
        correctCountDisplay.textContent = `${score}`;
    if (totalCount)
        totalCount.textContent = `${questions.length}`;
}
// Resets modal and quiz state, then fetches a fresh question set.
function restartQuiz() {
    if (resultsModal) {
        resultsModal.hidden = true;
        resultsModal.setAttribute("aria-hidden", "true");
    }
    currentIndex = 0;
    score = 0;
    selectedChoice = null;
    answersLocked = false;
    questions.length = 0; // Clear the questions array
    scoreDisplay && (scoreDisplay.textContent = "0");
    loadQuestions();
}
nextButton?.addEventListener("click", nextQuestion);
submitButton?.addEventListener("click", submitAnswer);
closeButton?.addEventListener("click", () => {
    if (resultsModal) {
        resultsModal.hidden = true;
        resultsModal.setAttribute("aria-hidden", "true");
    }
});
restartButton?.addEventListener("click", restartQuiz);
loadQuestions();
