CREATE DATABASE IF NOT EXISTS quizdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'quiz_user'@'%' IDENTIFIED BY 'quiz_pass';
GRANT ALL PRIVILEGES ON quizdb.* TO 'quiz_user'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS users (
    id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(50) NOT NULL UNIQUE,
    password_hash varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quizzes (
    id int AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    description text,
    created_by int NOT NULL,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS questions (
    id int AUTO_INCREMENT PRIMARY KEY,
    quiz_id int NOT NULL,
    question_text text NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'easy',
    category VARCHAR(50) DEFAULT 'general',
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE IF NOT EXISTS choices (
    id int AUTO_INCREMENT PRIMARY KEY,
    question_id int NOT NULL,
    choice_text text NOT NULL,
    is_correct TINYINT(1) DEFAULT 0,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS attempts (
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int NOT NULL,
    quiz_id int NOT NULL,
    score int NOT NULL,
    total int NOT NULL,
    taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);