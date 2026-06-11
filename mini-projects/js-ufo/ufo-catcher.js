const game_area = document.querySelector("#game-area");
const ufo = document.querySelector("#ufo");
const catcher = document.querySelector("#catcher");
const score_value = document.querySelector("#score-value");
const time_value = document.querySelector("#time-value");
const streak_value = document.querySelector("#streak-value");
const wave_indicator = document.querySelector("#wave-indicator");
const start_button = document.querySelector("#start-button");
const restart_button = document.querySelector("#restart-button");
const pause_button = document.querySelector("#pause-button");
const game_over_overlay = document.querySelector("#game-over");
const final_score = document.querySelector("#final-score");
const play_again_button = document.querySelector("#play-again-button");
const best_score = document.querySelector("#best-score");
const total_catches = document.querySelector("#total-catches");
const accuracy = document.querySelector("#accuracy");
const difficulty_label = document.querySelector("#difficulty-label");
const difficulty_fill = document.querySelector("#difficulty-fill");

const state = {
  score: 0,
  timeLeft: 60,
  streak: 0,
  wave: 1,
  isRunning: false,
  isPaused: false,
  catcherX: 0,
  targetCatcherX: 0,
  ufoX: 0,
  ufoY: 0,
  ufoDirection: 1,
  ufoSpeed: 3,
  ufoBaseY: 140,
  ufoVDir: 1,
  ufoVSpeed: 1.6, // vertical speed
  ufoMinY: 120,
  ufoMaxY: 180,
  justCaught: false, // short lock to prevent duplicate catches
  gamewidth: 0,
  gameheight: 0,
  animationFrameID: null,
  timerId: null,
  totalCatches: 0,
  bestScore: Number(localStorage.getItem("ufoCatcherBestScore") || 0),
  totalAttempts: 0,
  ufoHitBottomThisFrame: false,
  caughtThisFrame: false,
};

/*
  Core game logic.
  The state stores the current values, the render functions update the DOM,
  updateUfo moves the UFO, and checkCollision handles collisions.
*/

// Renders the catcher's current horizontal position.
function renderCatcher() {
  catcher.style.left = `${state.catcherX}px`;
}

// Renders the UFO's current position.
function renderUfo() {
  ufo.style.left = `${state.ufoX}px`;
  ufo.style.top = `${state.ufoY}px`;
}

// Updates all visible HUD values.
function renderHud() {
  let accuracyValue =
    state.totalAttempts === 0
      ? 0
      : Math.round((state.totalCatches / state.totalAttempts) * 100);
  accuracy.innerText = accuracyValue + "%";
  let clampedWave = Math.max(1, Math.min(state.wave, 5));
  let difficultyLevel = Math.round((clampedWave / 5) * 100);

  score_value.innerText = state.score;
  time_value.innerText = state.timeLeft;
  streak_value.innerText = "x" + state.streak;
  best_score.innerText = state.bestScore;
  total_catches.innerText = state.totalCatches;
  wave_indicator.innerText = "WAVE " + clampedWave + " / 5";
  difficulty_fill.style.width = difficultyLevel + "%";

  if (clampedWave <= 2) {
    difficulty_label.innerText = "EASY";
  } else if (clampedWave === 3) {
    difficulty_label.innerText = "MEDIUM";
  } else {
    difficulty_label.innerText = "HARD";
  }
}

// Resets the game to its initial state.
function initGame() {
  // Set the base state and starting positions.
  let gameArea = game_area;
  state.gamewidth = gameArea.clientWidth;
  state.gameheight = gameArea.clientHeight;
  state.catcherX = (state.gamewidth - catcher.clientWidth) / 2;
  state.targetCatcherX = state.catcherX;
  state.ufoX = (state.gamewidth - ufo.clientWidth) / 2;
  state.ufoMinY = 20; // top margin
  state.ufoMaxY = Math.max(
    state.ufoMinY + 40,
    state.gameheight - ufo.clientHeight - 20,
  ); // bottom margin
  // Start Y position in the middle of the range.
  state.ufoY = Math.round((state.ufoMinY + state.ufoMaxY) / 2);
  state.ufoVDir = Math.random() < 0.5 ? -1 : 1;
  state.ufoVSpeed = 0.9 + Math.random() * 0.6;
  // JS moves the UFO instead of the CSS animation.
  if (ufo && ufo.style) ufo.style.animation = "none";
  state.score = 0;
  state.timeLeft = 60;
  state.streak = 0;
  state.wave = 1;
  state.isRunning = false;
  state.isPaused = false;
  pause_button.innerText = "Pause";
  state.justCaught = false;
  state.ufoHitBottomThisFrame = false;
  state.caughtThisFrame = false;
  state.totalCatches = 0;
  state.totalAttempts = 0;
  renderCatcher();
  renderUfo();
  renderHud();
}

// Moves the catcher in the given direction within the play area.
function moveCatcher(direction) {
  let speed = 20; // pixels per key press
  let newX = state.targetCatcherX + direction * speed;
  let maxX = state.gamewidth - catcher.clientWidth;
  if (newX < 0) {
    newX = 0;
  } else if (newX > maxX) {
    newX = maxX;
  }
  state.targetCatcherX = newX;
  renderCatcher();
}

// updateCatcher position
function updateCatcher() {
  // Smoothly move the catcher towards the target position.
  let smoothness = 0.2; // Adjust this value for more or less smoothing
  state.catcherX += (state.targetCatcherX - state.catcherX) * smoothness;
  if (Math.abs(state.targetCatcherX - state.catcherX) < 0.5) {
    state.catcherX = state.targetCatcherX; // Snap to target if close enough
  }
  renderCatcher();
}

// Binds keyboard controls.
function setupControls() {
  document.addEventListener("keydown", (event) => {
    if (state.isPaused) return;
    const key = event.key.toLowerCase();
    if (key === "arrowleft" || key === "a") {
      event.preventDefault();
      moveCatcher(-1);
    } else if (key === "arrowright" || key === "d") {
      event.preventDefault();
      moveCatcher(1);
    }
  });
}

// Updates UFO movement and edge bounces.
function updateUfo() {
  // Move the UFO horizontally and vertically.
  state.ufoX += state.ufoDirection * state.ufoSpeed;
  // Reverse direction at the edges.
  if (state.ufoX <= 0) {
    state.ufoX = 0;
    state.ufoDirection *= -1;
  }

  if (state.ufoY >= state.ufoMaxY) {
    state.ufoY = state.ufoMaxY;
    state.ufoHitBottomThisFrame = true;
    state.ufoVDir = -1;
    state.ufoVSpeed = 0.9 + Math.random() * 0.6;
  }

  if (state.ufoX >= state.gamewidth - ufo.clientWidth) {
    state.ufoX = state.gamewidth - ufo.clientWidth;
    state.ufoDirection *= -1;
  }
  // Bounce between the upper and lower bounds.
  state.ufoY += state.ufoVDir * state.ufoVSpeed;
  if (state.ufoY <= state.ufoMinY) {
    state.ufoY = state.ufoMinY;
    state.ufoVDir = 1;
    state.ufoVSpeed = 0.9 + Math.random() * 0.6;
  }
  if (state.ufoY >= state.ufoMaxY) {
    state.ufoY = state.ufoMaxY;
    state.ufoVDir = -1;
    state.ufoVSpeed = 0.9 + Math.random() * 0.6;
  }
  renderUfo();
}

// Runs one game loop tick and schedules the next one.
function gameLoop() {
  state.ufoHitBottomThisFrame = false;
  state.caughtThisFrame = false;
  if (state.isPaused || !state.isRunning) return;
  updateCatcher();
  updateUfo();
  checkCollision();
  if (
    state.ufoHitBottomThisFrame &&
    !state.caughtThisFrame &&
    !state.justCaught
  ) {
    state.totalAttempts += 1;
    state.score = Math.max(0, state.score - 0.5);
    state.streak = 0;
    renderHud();
  }
  state.animationFrameID = requestAnimationFrame(gameLoop);
}

// Checks whether the UFO and catcher overlap.
function checkCollision() {
  // Collision check based on the actual DOM positions.
  if (state.isPaused || !state.isRunning) return;

  const uRectRaw = ufo.getBoundingClientRect();
  const cRectRaw = catcher.getBoundingClientRect();

  const uRect = {
    left: uRectRaw.left + 10,
    right: uRectRaw.right - 10,
    top: uRectRaw.top + 6,
    bottom: uRectRaw.bottom - 6,
  };

  const cRect = {
    left: cRectRaw.left + 6,
    right: cRectRaw.right - 6,
    top: cRectRaw.top + 2,
    bottom: cRectRaw.bottom - 2,
  };
  const overlap =
    cRect.left < uRect.left + (uRect.right - uRect.left) &&
    cRect.left + (cRect.right - cRect.left) > uRect.left &&
    cRect.top < uRect.top + (uRect.bottom - uRect.top) &&
    cRect.top + (cRect.bottom - cRect.top) > uRect.top;

  // Only allow a new catch once the elements have separated again.
  if (state.justCaught) {
    if (!overlap) state.justCaught = false;
    return;
  }

  if (!overlap) return;

  // Handle a successful catch.
  state.justCaught = true;
  state.caughtThisFrame = true;
  state.score += 1;
  state.streak += 1;
  state.totalCatches += 1;
  state.totalAttempts += 1;
  state.timeLeft = Math.min(state.timeLeft + 3, 99); // Add time for a successful catch, max 99s
  if (state.streak % 5 === 0) {
    state.wave += 1;
    state.streak = 0;
    state.ufoSpeed += 1;
  }

  renderHud();
  // Score animation.
  score_value.classList.remove("pop", "active");
  void score_value.offsetWidth;
  score_value.classList.add("pop", "active");
  const scoreFallback = setTimeout(() => {
    score_value.classList.remove("active");
  }, 500);
  score_value.addEventListener(
    "transitionend",
    () => {
      score_value.classList.remove("active");
      clearTimeout(scoreFallback);
    },
    { once: true },
  );

  // Catcher animation.
  catcher.classList.remove("bounce", "active");
  void catcher.offsetWidth;
  catcher.classList.add("bounce", "active");
  const catcherFallback = setTimeout(() => {
    catcher.classList.remove("active");
  }, 300);
  catcher.addEventListener(
    "transitionend",
    () => {
      catcher.classList.remove("active");
      clearTimeout(catcherFallback);
    },
    { once: true },
  );

  // Show a floating score popup.
  try {
    const areaRect = game_area.getBoundingClientRect();
    const fx = state.catcherX + catcher.clientWidth / 2;
    const fy = cRect.top - areaRect.top - 8;
    spawnFloatingScore(fx, fy, "+1");
  } catch (e) {}
  // Make the UFO bounce away from the catcher.
  const maxX = state.gamewidth - ufo.clientWidth;
  state.ufoVDir = -1;
  state.ufoVSpeed = 2 + Math.random() * 1.5;
  state.ufoDirection = Math.random() < 0.5 ? -1 : 1;
  state.ufoY = Math.max(state.ufoMinY, state.ufoY - 28);
  state.ufoX = Math.max(
    0,
    Math.min(maxX, state.ufoX + (Math.random() - 0.5) * 160),
  );
}

// Gives the UFO a new start position and movement direction.
function resetUfoPosition() {
  state.ufoX = Math.random() * (state.gamewidth - ufo.clientWidth);

  state.ufoY = Math.round(
    (20 + (state.gameheight - ufo.clientHeight - 20)) / 2,
  );
  state.ufoMinY = 20;
  state.ufoMaxY = Math.max(
    state.ufoMinY + 40,
    state.gameheight - ufo.clientHeight - 20,
  );
  state.ufoVDir = Math.random() < 0.5 ? -1 : 1;
  state.ufoVSpeed = 1.2 + Math.random() * 1.2;
  state.ufoSpeed = Math.min(state.ufoSpeed + 0.5, 5);
  renderUfo();
}

// Stops the countdown timer.
function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

// Stops the requestAnimationFrame-based game loop.
function stopGameLoop() {
  if (state.animationFrameID) {
    cancelAnimationFrame(state.animationFrameID);
    state.animationFrameID = null;
  }
}

// Starts the countdown timer if it is not already running.
function startTimer() {
  if (state.timerId) return;
  state.timerId = setInterval(function () {
    if (!state.isPaused) {
      state.timeLeft -= 1;
      renderHud();
    }
    if (state.timeLeft <= 0) {
      stopTimer();
      showGameOver();
    }
  }, 1000);
}

// Displays a floating score animation at the given position.
function spawnFloatingScore(x, y, text = "+1") {
  let container = document.querySelector("#game-area");
  let el = document.createElement("div");
  el.className = "floating-score";
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  container.appendChild(el);
  requestAnimationFrame(() => {
    el.classList.add("animate");
  });
  el.addEventListener(
    "transitionend",
    () => {
      el.remove();
    },
    { once: true },
  );

  setTimeout(() => {
    if (el.parentElement) el.remove();
  }, 900);
}

// Shows the game over overlay and saves the best score.
function showGameOver() {
  stopGameLoop();
  state.isRunning = false;
  final_score.innerText = state.score;
  game_over_overlay.style.display = "flex";
  start_button.disabled = true;
  pause_button.disabled = true;
  restart_button.disabled = false;
  // Save the best score.
  if (state.score > state.bestScore) {
    state.bestScore = state.score;
    localStorage.setItem("ufoCatcherBestScore", state.bestScore);
  }
  renderHud();
}

// Hides the game over overlay.
function hideGameOver() {
  game_over_overlay.style.display = "none";
  pause_button.disabled = false;
}

start_button.addEventListener("click", function () {
  if (!state.isRunning) {
    state.isRunning = true;
    state.isPaused = false;
    startTimer();
    gameLoop();
    start_button.disabled = true;
  }
});

pause_button.addEventListener("click", function () {
  if (state.isRunning && !state.isPaused) {
    state.isPaused = true;
    stopGameLoop();
    state.animationFrameID = null;

    pause_button.innerText = "Resume";
    start_button.disabled = false;
  } else if (state.isRunning && state.isPaused) {
    state.isPaused = false;
    gameLoop();
    pause_button.innerText = "Pause";
    start_button.disabled = true;
  }
});

restart_button.addEventListener("click", function () {
  // Allow repeated safe restarts.
  hideGameOver();
  restart_button.disabled = true;
  stopTimer();
  stopGameLoop();

  // Reset gameplay values.
  state.ufoSpeed = 3;
  initGame();

  // Reset the UI.
  pause_button.innerText = "Pause";
  start_button.disabled = false;

  // Restart immediately.
  state.isRunning = true;
  state.isPaused = false;
  startTimer();
  gameLoop();
  start_button.disabled = true;

  restart_button.disabled = false;
});

play_again_button.addEventListener("click", function () {
  hideGameOver();
  stopTimer();
  stopGameLoop();
  state.ufoSpeed = 3;
  initGame();
  pause_button.innerText = "Pause";
  start_button.disabled = false;
});

initGame();
setupControls();
