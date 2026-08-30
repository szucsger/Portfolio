# Quiz Mini Project

A full-stack quiz app built with TypeScript on the frontend and PHP + MySQL on the backend.

## Features

- Loads 10 random questions from MySQL through `api.php?action=questions`
- Multiple-choice flow with score tracking
- Submit/Next interaction guards
- Result modal after the final question
- Restart flow that fetches a fresh question set
- Session-based anti-repeat logic to reduce immediate repeats between restarts

## Tech Stack

- Frontend: TypeScript, vanilla DOM API, Bootstrap 5, custom CSS
- Backend: PHP 8.2, PDO, MySQL 8
- Runtime: Docker Compose

## Project Structure

- `index.html` - Quiz layout and result modal
- `styles.css` - Custom UI styles
- `app.ts` - Frontend quiz logic
- `app.js` - Compiled JavaScript runtime file
- `api.php` - Backend API actions (`questions`, `submit`, `finish`, `leaderboard`, `register`)
- `db.php` - Database connection
- `db/init.sql` - Database schema
- `import_questions.php` - Script to import trivia questions
- `docker-compose.yml` - App and database services
- `Dockerfile` - PHP Apache image setup

## API Overview

### `GET api.php?action=questions`

Returns question objects with choices and correctness flags.

Response shape:

```json
{
  "success": true,
  "questions": [
    {
      "id": 1,
      "question_text": "...",
      "difficulty": "easy",
      "category": "general",
      "choices": [
        {
          "id": 10,
          "question_id": 1,
          "choice_text": "...",
          "is_correct": 0
        }
      ]
    }
  ]
}
```

### `POST api.php?action=submit`

Validates whether a selected choice belongs to a question and whether it is correct.

### `POST api.php?action=finish`

Stores a finished attempt (`user_id`, `quiz_id`, `score`, `total`).

### `GET api.php?action=leaderboard`

Returns top 10 attempts.

### `POST api.php?action=register`

Registers a new user.

## Anti-Repeat Strategy

The `questions` branch in `api.php` tracks delivered question IDs in session:

- `used_question_ids`: all IDs used in the current cycle
- `last_batch_ids`: IDs delivered in the previous batch

Behavior:

1. Try to fetch 10 questions excluding `used_question_ids`.
2. If fewer than 10 remain, keep the remaining unseen items.
3. Reset used history and top up missing items while first trying to avoid `last_batch_ids`.
4. Store the newly delivered IDs back to session.

This reduces immediate repeats across restarts while still guaranteeing a full batch.

## Local Setup

1. Start services:

```bash
docker compose up -d --build
```

2. Open the app:

- `http://localhost:8080`

3. API check:

- `http://localhost:8080/api.php?action=questions`

## TypeScript Build

Compile frontend TypeScript to JavaScript:

```bash
npx tsc app.ts
```

Watch mode:

```bash
npx tsc app.ts -w
```

## Notes

- The browser runs `app.js`, not `app.ts` directly.
- If UI changes do not appear, hard refresh the browser (`Ctrl+F5`).
- If `php -l` fails on host, use Docker runtime validation through the running app endpoints.
