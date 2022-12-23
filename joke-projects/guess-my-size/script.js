'use strict';

let score;
let highScore;
let gameOver;
let secretNumber;
startNewGame();

document
  .querySelector('.check')
  .addEventListener('click', tryGuessTheSecretNumber);

function tryGuessTheSecretNumber() {
  if (gameOver) {
    startNewGame();
  } else {
    let guessNumber = Number(document.querySelector('.guess').value);

    if (!guessNumber) {
      displayMessage('⛔️ Не размер!');
    } else if (guessNumber === secretNumber) {
      displayMessage('🎉 Угадал, кажется мы знакомы слишком близко🥰');
      document.querySelector('.number').textContent = guessNumber + 'см';
      document.querySelector('body').style.backgroundColor = '#60b347';
      commitHighScore();
      // decreaseAndUpdateScore;
      setGameOverAndUpdateTheButton();
    } else if (guessNumber !== secretNumber) {
      if (score > 1) {
        displayMessage(
          guessNumber < secretNumber
            ? '📉 Слишком маленький 🤨'
            : '📈 Слишком большой 🥹'
        );
        decreaseAndUpdateScore();
      } else {
        decreaseAndUpdateScore();
        displayMessage(
          '💥 Ты проиграл, но чтобы этот вопрос тебя не мучал, я дал ответ 😈'
        );
        document.querySelector('body').style.backgroundColor = '#cf2b31';
        setGameOverAndUpdateTheButton();
      }
    }
  }
}

function displayMessage(mesage) {
  document.querySelector('.message').textContent = mesage;
}

function commitHighScore() {
  if (score > highScore) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
}

function decreaseAndUpdateScore() {
  score--;
  document.querySelector('.general-size').textContent = score;
}

function startNewGame() {
  score = 3;
  highScore = 0;
  document.querySelector('.general-size').textContent = score;
  document.querySelector('.highscore').textContent = highScore;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?см';
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Начать угадывать...🫣';
  document.querySelector('.check').textContent = 'Угадать📐';
  gameOver = false;
  generateSecretNumber();
}

function setGameOverAndUpdateTheButton() {
  document.querySelector('.check').textContent = 'Начать новую игру 🆕';
  document.querySelector('.number').textContent = secretNumber + 'см';
  gameOver = true;
}

function generateSecretNumber() {
  secretNumber = Math.trunc(Math.random() * 40 + 1);
  console.log('secretNumber is: ' + secretNumber);
}
