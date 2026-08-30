type ApiChoice = {
  id: number;
  question_id: number;
  choice_text: string;
  is_correct: boolean;
};

type ApiQuestion = {
  id: number;
  question_text: string;
  difficulty?: string;
  category?: string;
  choices: ApiChoice[];
};

type Question = {
  text: string;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
  choices: string[];
  correctAnswer: string;
};

const questions: Question[] = [];

let currentIndex: number = 0;
let score: number = 0;
let selectedChoice: string | null = null;
let answersLocked: boolean = false;

const questionText: HTMLElement | null =
  document.querySelector("#question-text");
const questionMeta: HTMLElement | null =
  document.querySelector("#question-meta");
const choicesContainer: HTMLElement | null =
  document.querySelector("#choices-container");
const scoreDisplay: HTMLElement | null =
  document.querySelector("#score-display");
const questionProgress: HTMLElement | null =
  document.querySelector("#question-progress");
const submitButton: HTMLButtonElement | null =
  document.querySelector("#submit-button");
const nextButton: HTMLButtonElement | null =
  document.querySelector("#next-button");
const closeButton: HTMLButtonElement | null =
  document.querySelector("#close-results");
const restartButton: HTMLButtonElement | null =
  document.querySelector("#restart-quiz");
const resultsModal: HTMLElement | null =
  document.querySelector("#results-modal");
const resultsSummary: HTMLElement | null =
  document.querySelector("#results-summary");
const correctCountDisplay: HTMLElement | null =
  document.querySelector("#correct-count");
const totalCount: HTMLElement | null = document.querySelector("#total-count");

// Loads a fresh quiz set from the API and resets client state.
function loadQuestions(): void {
  questions.length = 0; // Clear the questions array
  currentIndex = 0;
  score = 0;
  // Load questions from a JSON file or an API endpoint
  fetch("api.php?action=questions")
    .then((response) => response.json())
    .then((data: { success: boolean; questions: ApiQuestion[] }) => {
      if (!data.success) return;

      const normalizedQuestions: Question[] = data.questions.map(
        (ApiQuestion) => ({
          text: ApiQuestion.question_text,
          category: ApiQuestion.category,
          difficulty: ApiQuestion.difficulty as "easy" | "medium" | "hard",
          choices: ApiQuestion.choices.map((choice) => choice.choice_text),
          correctAnswer:
            ApiQuestion.choices.find((choice) => choice.is_correct)
              ?.choice_text || "",
        }),
      );

      questions.push(...normalizedQuestions);
      renderQuestion();
    })
    .catch((error) => {
      console.error("Error loading questions:", error);
    });
}

// Renders the current question and updates button states.
function renderQuestion(): void {
  if (currentIndex < questions.length) {
    const currentQuestion = questions[currentIndex];
    if (questionText) questionText.textContent = currentQuestion.text;
    if (questionMeta)
      questionMeta.textContent = `Category: ${currentQuestion.category || "N/A"} | Difficulty: ${
        currentQuestion.difficulty || "N/A"
      }`;
    if (questionProgress)
      questionProgress.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    if (choicesContainer) {
      choicesContainer.innerHTML = "";
      currentQuestion.choices.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.type = "button";
        choiceButton.textContent = choice;
        choiceButton.classList.add(
          "choice-button",
          "btn",
          "btn-outline-dark",
          "btn-lg",
          "text-start",
        );
        if (choice === selectedChoice) {
          choiceButton.classList.add("is-selected");
        }
        choiceButton.disabled = answersLocked;
        choiceButton.addEventListener("click", () => selectChoice(choice));
        choicesContainer.appendChild(choiceButton);
      });
    }
    if (submitButton) submitButton.disabled = !selectedChoice || answersLocked;
    if (nextButton) nextButton.disabled = !answersLocked;
  }
}

// Stores the selected option and updates selection styles.
function selectChoice(choice: string): void {
  if (answersLocked) return;
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
function submitAnswer(): void {
  if (!selectedChoice || answersLocked) return;
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
function nextQuestion(): void {
  if (!answersLocked) return;
  currentIndex++;
  selectedChoice = null;
  answersLocked = false;
  submitButton && (submitButton.disabled = true);
  nextButton && (nextButton.disabled = true);
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

// Displays the result modal with final stats.
function showResults(): void {
  if (resultsModal) {
    resultsModal.hidden = false;
    resultsModal.setAttribute("aria-hidden", "false");
  }
  if (resultsSummary)
    resultsSummary.textContent = `You scored ${score} out of ${questions.length}`;
  if (correctCountDisplay) correctCountDisplay.textContent = `${score}`;
  if (totalCount) totalCount.textContent = `${questions.length}`;
}

// Resets modal and quiz state, then fetches a fresh question set.
function restartQuiz(): void {
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
