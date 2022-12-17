'use strict';

let playersArray = document.querySelectorAll('.player');
let activePlayerNumber = getActivePlayerNumber();
let dice = document.querySelector('.dice');
let currentDicksSizeArray = document.querySelectorAll('.current-score');
let generalDicksSizeArray = document.querySelectorAll('.score');
let diceRandomNumber;
let currentActiveSizeId;
let generalActiveSizeId;
//----------------------
const playersObjectsArray = [{id: 1, name: "player1", fullDickSize: 0, incrementingDickSize: 0}, {
    id: 2, name: "player2", fullDickSize: 0, incrementingDickSize: 0
}];


function startNewGame() {
    hideDice();
    const scores = document.querySelectorAll('.score');
    scores.forEach(e => {
        e.textContent = "0";
    });
    const currentScores = document.querySelectorAll('.current-score');
    currentScores.forEach(e => {
        e.textContent = "0";
    });
    setAnotherPlayerAsActive();
    setActiveScoreIdByActivePlayer();
    resetPlayersSizes();
}

function resetPlayersSizes() {
    playersObjectsArray.forEach(e => {
        e.fullDickSize = 0;
        e.incrementingDickSize = 0;
    })
}

function hideDice() {
    document.querySelector(".dice").classList.add("hidden");
}

function getActivePlayerNumber() {
    playersArray = document.querySelectorAll('.player');
    if (playersArray[0].classList.contains('player--active')) return 0; else return 1;
}

function setAnotherPlayerAsActive() {
    if (activePlayerNumber === 0) {
        playersArray[0].classList.remove('player--active');
        playersArray[1].classList.add('player--active');
        activePlayerNumber = 1;
    } else {
        playersArray[1].classList.remove('player--active');
        playersArray[0].classList.add('player--active');
        activePlayerNumber = 0;
    }

    setActiveScoreIdByActivePlayer();
}

function rollTheDice() {
    diceRandomNumber = Math.trunc((Math.random() * 6) + 1);
    showDiceByNumber(diceRandomNumber);
    if (diceRandomNumber === 1) {
        cutActivePlayerDick();
        setAnotherPlayerAsActive();
    } else {
        incrementActivePlayerCurrentDickSizeByNumber(diceRandomNumber);
    }

}

function showDiceByNumber(diceNumber) {
    dice.src = "dice-" + diceNumber + ".png";
    if (dice.classList.contains('hidden')) dice.classList.remove('hidden');
}

function setActiveScoreIdByActivePlayer() {
    currentActiveSizeId = "current--" + activePlayerNumber;
}

function incrementActivePlayerCurrentDickSizeByNumber(incrementNumber) {
    currentDicksSizeArray.forEach(e => {
        if (e.id === currentActiveSizeId) {
            e.textContent = Number(e.textContent) + incrementNumber;
        }
    })
}

function holdActivePlayerDickSize() {
    generalDicksSizeArray.forEach(e => {
        if (e.id === generalActiveSizeId) {
            e.textContent = Number(e.textContent) + incrementNumber;//?
        }
    })
}

function cutActivePlayerDick() {
    currentDicksSizeArray.forEach(e => {
        if (e.id === currentActiveSizeId) {
            e.textContent = "0";
        }
    })
}

function addEventListenersToElements() {
    document.querySelector('.btn--roll').addEventListener('click', rollTheDice);
    document.querySelector('.btn--hold').addEventListener('click', holdActivePlayerDickSize);
    document.querySelector('.btn--new').addEventListener('click', startNewGame);
}

startNewGame();
addEventListenersToElements();

