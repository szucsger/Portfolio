<?php
// Trivia import script.

// Load db.php, which provides the PDO $pdo connection.
require 'db.php';

// Open Trivia Database endpoint: 10 multiple-choice questions.
$url = 'https://opentdb.com/api.php?amount=10&type=multiple';

// Fetch raw JSON response.
$json = file_get_contents($url);

// Decode JSON as an associative array.
$data = json_decode($json, true);

// response_code=0 means success.
if ($data['response_code'] !== 0) {
    die('Error fetching questions from the API.');
}

// Questions are under the results key.
$questions = $data['results'];

// Insert a new quiz row.
$quizinsert = $pdo->prepare('INSERT INTO quizzes (title, description, created_by) VALUES (?,?,?)');

$quizinsert->execute(['Open Trivia Quiz', 'Questions imported from Open Trivia Database', 1]);

// Get the inserted quiz ID.
$quizid = $pdo->lastInsertId();

// Prepare question insert.
$questionInsert = $pdo->prepare('INSERT INTO questions (quiz_id, question_text, difficulty, category) VALUES (?,?,?,?)');

// Prepare answer choice insert.
$choiceInsert = $pdo->prepare('INSERT INTO choices (question_id, choice_text, is_correct) VALUES (?,?,?)');

// Insert each imported question and its choices.
foreach ($questions as $question) {
$questionText = trim(html_entity_decode($question['question'], ENT_QUOTES | ENT_HTML5));
$difficulty = $question['difficulty'];
$category = trim(html_entity_decode($question['category'], ENT_QUOTES | ENT_HTML5));

$correctAnswer = trim(html_entity_decode($question['correct_answer'], ENT_QUOTES | ENT_HTML5));
    $questionInsert->execute([
        $quizid,
        $questionText,
        $difficulty,
        $category
    ]);
    $questionId = $pdo->lastInsertId();
    $choices = [['text' => $correctAnswer, 'is_correct' => 1]];
    foreach ($question['incorrect_answers'] as $incorrectAnswer) {
        $choices[] = ['text' => trim(html_entity_decode($incorrectAnswer, ENT_QUOTES | ENT_HTML5)), 'is_correct' => 0];
    }
    // Shuffle answer options before storing.
    shuffle($choices);
    foreach ($choices as $choice) {
        $choiceInsert->execute([$questionId, $choice['text'], $choice['is_correct']]);
    }
}


