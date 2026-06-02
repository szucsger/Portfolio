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
  ufoX: 0,
  ufoY: 0,
  ufoDirection: 1,
  ufoSpeed: 3,
  ufoBaseY: 140,
  ufoVDir: 1,
  ufoVSpeed: 1.6, // függőleges sebesség
  ufoMinY: 120,
  ufoMaxY: 180,
  justCaught: false, // rövid zárolás a duplikált elkapások ellen
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
  Fő játéklogika.
  A state tárolja az állapotot, a render függvények a DOM-ot frissítik,
  az updateUfo mozgatja az UFO-t, a checkCollision pedig az ütközést kezeli.
*/

// Kirajzolja az elkapó aktuális vízszintes pozícióját.
function renderCatcher() {
  catcher.style.left = `${state.catcherX}px`;
}

// Kirajzolja az UFO aktuális pozícióját.
function renderUfo() {
  ufo.style.left = `${state.ufoX}px`;
  ufo.style.top = `${state.ufoY}px`;
}

// Frissíti a HUD összes kijelzett értékét.
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

// Visszaállítja a játékot az induló állapotba.
function initGame() {
  // Alapállapot és kezdő pozíciók beállítása.
  let gameArea = game_area;
  state.gamewidth = gameArea.clientWidth;
  state.gameheight = gameArea.clientHeight;
  state.catcherX = (state.gamewidth - catcher.clientWidth) / 2;
  state.ufoX = (state.gamewidth - ufo.clientWidth) / 2;
  state.ufoMinY = 20; // felső margó
  state.ufoMaxY = Math.max(
    state.ufoMinY + 40,
    state.gameheight - ufo.clientHeight - 20,
  ); // alsó margó
  // Kezdő Y pozíció a tartomány közepén.
  state.ufoY = Math.round((state.ufoMinY + state.ufoMaxY) / 2);
  state.ufoVDir = Math.random() < 0.5 ? -1 : 1;
  state.ufoVSpeed = 0.9 + Math.random() * 0.6;
  // A CSS lebegés helyett a JS mozgatja az UFO-t.
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

// Elmozdítja az elkapót a megadott irányba a pálya határain belül.
function moveCatcher(direction) {
  let speed = 18;
  let newX = state.catcherX + direction * speed;
  let maxX = state.gamewidth - catcher.clientWidth;
  if (newX < 0) {
    newX = 0;
  } else if (newX > maxX) {
    newX = maxX;
  }
  state.catcherX = newX;
  renderCatcher();
}

// Beköti a billentyűzetes irányítást.
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

// Frissíti az UFO mozgását és a pályaszéli irányváltásokat.
function updateUfo() {
  // Az UFO vízszintes és függőleges mozgatása.
  state.ufoX += state.ufoDirection * state.ufoSpeed;
  // Irányváltás a széleknél.
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
  // Pattogás a felső és alsó határ között.
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

// Lefuttat egy játékkört, majd újraütemezi önmagát.
function gameLoop() {
  state.ufoHitBottomThisFrame = false;
  state.caughtThisFrame = false;
  if (state.isPaused || !state.isRunning) return;
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

// Ellenőrzi, hogy az UFO és az elkapó összeér-e.
function checkCollision() {
  // Ütközésellenőrzés a tényleges DOM pozíciók alapján.
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

  // Csak akkor engedünk új elkapást, ha az elemek már különváltak.
  if (state.justCaught) {
    if (!overlap) state.justCaught = false;
    return;
  }

  if (!overlap) return;

  // Sikeres elkapás kezelése.
  state.justCaught = true;
  state.caughtThisFrame = true;
  state.score += 1;
  state.streak += 1;
  state.totalCatches += 1;
  state.totalAttempts += 1;
  if (state.streak % 5 === 0) {
    state.wave += 1;
    state.streak = 0;
    state.ufoSpeed += 1;
  }

  renderHud();
  // Pontszám animáció.
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

  // Elkapó animáció.
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

  // Lebegő pontérték megjelenítése.
  try {
    const areaRect = game_area.getBoundingClientRect();
    const fx = cRect.left + cRect.width / 2 - areaRect.left;
    const fy = cRect.top - areaRect.top - 8;
    spawnFloatingScore(fx, fy, "+1");
  } catch (e) {
    /* silent */
  }
  // Az UFO pattanjon vissza az elkapóról.
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

// Új kezdőpozíciót és mozgási irányt ad az UFO-nak.
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

// Leállítja a visszaszámláló időzítőt.
function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

// Leállítja a requestAnimationFrame alapú játékkört.
function stopGameLoop() {
  if (state.animationFrameID) {
    cancelAnimationFrame(state.animationFrameID);
    state.animationFrameID = null;
  }
}

// Elindítja a visszaszámlálót, ha még nem fut.
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

// Megjelenít egy lebegő pontszám animációt a megadott helyen.
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

// Megjeleníti a játék vége réteget és menti a legjobb pontszámot.
function showGameOver() {
  stopGameLoop();
  state.isRunning = false;
  final_score.innerText = state.score;
  game_over_overlay.style.display = "flex";
  start_button.disabled = true;
  pause_button.disabled = true;
  restart_button.disabled = false;
  // Legjobb eredmény mentése.
  if (state.score > state.bestScore) {
    state.bestScore = state.score;
    localStorage.setItem("ufoCatcherBestScore", state.bestScore);
  }
  renderHud();
}

// Elrejti a játék vége réteget.
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
  // allow repeated safe restarts
  hideGameOver();
  restart_button.disabled = true;
  stopTimer();
  stopGameLoop();

  // reset gameplay values
  state.ufoSpeed = 3;
  initGame();

  // UI reset
  pause_button.innerText = "Pause";
  start_button.disabled = false;

  // immediate restart
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
