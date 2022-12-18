'use strict';

let score;
let highScore;
let gameOver;
let secretNumber;

startNewGame();

document
  .querySelector('.check')
  .addEventListener('click', tryGuessTheSecretNumber);

const saveToLocalStorage = () => {
  if (highScore > 0) {
    localStorage.setItem('highScore', highScore);
  }
}

const getFromLocalStorage = () => {
  const reference = localStorage.getItem('highScore');

  if (reference) {
    highScore = parseInt(reference);

    document.querySelector('.highscore').innerHTML = reference
  } else {
    document.querySelector('.highscore').innerHTML = 0;
  }
}

getFromLocalStorage();

function tryGuessTheSecretNumber() {
  if (gameOver) {
    startNewGame();
  } else {
    let guessNumber = Number(document.querySelector('.guess').value);

    if (!guessNumber) {
      displayMessage('⛔️ Не размер!');
    } else if (guessNumber === secretNumber) {
      highScore += 1; 
      displayMessage('🎉 Угадал, кажется мы знакомы слишком близко🥰');
      document.querySelector('.number').textContent = guessNumber + 'см';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.highscore').innerHTML = highScore;
      commitHighScore();
      // decreaseAndUpdateScore;
      setGameOverAndUpdateTheButton();
      saveToLocalStorage();
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
    document.querySelector('.highscore').textContent = highScore;
  }
}

function decreaseAndUpdateScore() {
  score--;
  document.querySelector('.score').textContent = score;
}

function startNewGame() {
  score = 3;
  document.querySelector('.score').textContent = score;
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