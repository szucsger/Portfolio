<?php
// Load the database connection, set JSON response headers, and resolve the API action.
require_once 'db.php';
session_start();
header('Content-Type: application/json; charset=utf-8');
$action = $_GET['action'] ?? 'questions';

// The submit branch validates a selected answer against the database.
if($action === 'submit') {
    // Read the raw JSON body from the POST request.
    $rawInput = file_get_contents('php://input');
    // Decode JSON into a PHP associative array.
    $input = json_decode($rawInput, true);
    // Extract and sanitize question and choice IDs.
    $questionId = intval($input['question_id'] ?? null);
    $choiceId = intval($input['choice_id'] ?? null);
    // Reject requests with missing or invalid IDs.
    if($questionId <= 0 || $choiceId <= 0) {
        echo json_encode(['success' => false, 'message' => 'Missing question_id or choice_id']);
        exit;
    }
    // Ensure the selected choice belongs to the specified question.
    $checkStmt = $pdo->prepare ('SELECT is_correct FROM choices WHERE id = ? AND question_id = ?');
    // Execute the check query.
    $checkStmt->execute([$choiceId, $questionId]);
    // Read the correctness flag.
    $isCorrect = $checkStmt->fetchColumn();
    // Return an error if the question-choice pair does not exist.
    if($isCorrect === false) {
        echo json_encode(['success' => false, 'message' => 'Invalid question_id or choice_id']);
        exit;
    }
    // Return correctness as a boolean.
    echo json_encode(['success' => true, 'is_correct' => (bool)$isCorrect]);
    exit;
}

// The finish branch saves a completed quiz attempt.
if($action === 'finish') {
    // Read the raw JSON body.
    $rawInput = file_get_contents('php://input');
    // Decode JSON into an associative array.
    $input = json_decode($rawInput, true);
    // Extract required values.
    $userId = intval($input['user_id'] ?? 0);
    $quizId = intval($input['quiz_id'] ?? 0);
    $score = intval($input['score'] ?? 0);
    $total = intval($input['total'] ?? 0);
    // Validate required identifiers and total questions.
    if($userId <= 0 || $quizId <= 0 || $total <= 0) {
        echo json_encode(['success' => false, 'message' => 'Missing user_id, quiz_id, or total']);
        exit;
    }
    // Insert the attempt row.
    $finishStmt = $pdo->prepare('INSERT INTO attempts (user_id, quiz_id, score, total) VALUES (?,?,?,?)');
    $finishStmt->execute([$userId, $quizId, $score, $total]);
    echo json_encode(['success' => true, 'message' => 'Quiz finished successfully', 'score' => $score, 'total' => $total]);
    // Stop execution so the questions branch does not run.
    exit;
}

// The leaderboard branch returns the top 10 attempts.
if($action === 'leaderboard') {
    $leaderboardStmt = $pdo->prepare('SELECT users.username, attempts.score, attempts.total, attempts.taken_at FROM attempts JOIN users ON attempts.user_id = users.id ORDER BY attempts.score DESC, attempts.total DESC LIMIT 10');
    $leaderboardStmt->execute();
    $leaderboard = $leaderboardStmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'leaderboard' => $leaderboard]);
    exit;
}

// The register branch creates a new user account.
if($action === 'register') {
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    $username = trim($input['username'] ?? '');
    $password = $input['password'] ?? '';
    if($username === '' || $password === '') {
        echo json_encode(['success' => false, 'message' => 'Missing username or password']);
        exit;
    }
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
try {
    $registerStmt = $pdo->prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
    $registerStmt->execute([$username, $hashedPassword]);
    echo json_encode(['success' => true, 'message' => 'User registered successfully']);
} catch (PDOException $exception) {
    echo json_encode(['success' => false, 'message' => 'Username already exists']);
}
    exit;
}

// The questions branch returns random questions and their answer choices.
if (!isset($_SESSION['used_question_ids'])) {
$_SESSION['used_question_ids'] = [];
}
$usedIds = array_map('intval', $_SESSION['used_question_ids']);
$lastBatchIds = array_map('intval', $_SESSION['last_batch_ids'] ?? []);

// Build a base question query and exclude already-used IDs.
$baseSql = 'SELECT id, question_text, difficulty, category FROM questions';
$params = [];
if (!empty($usedIds)) {
    $placeholders = implode(',', array_fill(0, count($usedIds), '?'));
    $baseSql .= " WHERE id NOT IN ($placeholders)";
    $params = $usedIds;
}
$sql = $baseSql . ' ORDER BY RAND() LIMIT 10';
$stmt = $pdo->prepare($sql);
// Execute the question query.
$stmt->execute($params);
// Read the selected questions.
$questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

// If fewer than 10 unseen questions remain, keep the remaining unseen ones
// and top up from the full pool, trying to avoid the previous batch.
if (count($questions) < 10) {
    $carryQuestions = $questions;
    $carryIds = array_map('intval', array_column($carryQuestions, 'id'));
    $needed = 10 - count($carryQuestions);

    $_SESSION['used_question_ids'] = [];

    // First attempt: avoid immediate repeats from the last delivered batch.
    $excludeIds = array_values(array_unique(array_merge($carryIds, $lastBatchIds)));
    $extraParams = [];
    $extraSql = 'SELECT id, question_text, difficulty, category FROM questions';

    if (!empty($excludeIds)) {
        $extraPlaceholders = implode(',', array_fill(0, count($excludeIds), '?'));
        $extraSql .= " WHERE id NOT IN ($extraPlaceholders)";
        $extraParams = $excludeIds;
    }

    $extraSql .= ' ORDER BY RAND() LIMIT ' . intval($needed);
    $stmt = $pdo->prepare($extraSql);
    $stmt->execute($extraParams);
    $extraQuestions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Fallback: if too few rows remain, relax the last-batch exclusion.
    if (count($extraQuestions) < $needed && !empty($lastBatchIds)) {
        $extraParams = [];
        $extraSql = 'SELECT id, question_text, difficulty, category FROM questions';

        if (!empty($carryIds)) {
            $extraPlaceholders = implode(',', array_fill(0, count($carryIds), '?'));
            $extraSql .= " WHERE id NOT IN ($extraPlaceholders)";
            $extraParams = $carryIds;
        }

        $extraSql .= ' ORDER BY RAND() LIMIT ' . intval($needed);
        $stmt = $pdo->prepare($extraSql);
        $stmt->execute($extraParams);
        $extraQuestions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    $questions = array_merge($carryQuestions, $extraQuestions);
}

// Update session tracking for anti-repeat behavior across restarts.
$newIds = array_map('intval', array_column($questions, 'id'));
$_SESSION['used_question_ids'] = array_values(array_unique(array_merge($_SESSION['used_question_ids'], $newIds)));
$_SESSION['last_batch_ids'] = $newIds;

// Fetch and attach answer choices for each selected question.
foreach ($questions as &$question) {
    $stmt = $pdo->prepare('SELECT id, question_id, choice_text, is_correct FROM choices WHERE question_id = ?');
    $stmt->execute([$question['id']]);
    $question['choices'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Return the full payload.
echo json_encode(['success' => true, 'questions' => $questions]);

