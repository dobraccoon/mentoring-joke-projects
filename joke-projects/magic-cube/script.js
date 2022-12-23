'use strict';

let playersArray = document.querySelectorAll('.player');
let activePlayerNumber = getActivePlayerNumber();
let dice = document.querySelector('.dice');
let currentDicksSizeArray = document.querySelectorAll('.current-size');
let generalDicksSizeArray = document.querySelectorAll('.general-size');
let diceRandomNumber;
let currentActiveSizeId;
let generalActiveSizeId;


function startNewGame() {
    hideDice();
    const generalSizes = document.querySelectorAll('.general-size');
    generalSizes.forEach(e => {
        e.textContent = "0";
    });
    const currentSizes = document.querySelectorAll('.current-size');
    currentSizes.forEach(e => {
        e.textContent = "0";
    });
    setAnotherPlayerAsActive();
    setActiveSizeIdsByActivePlayer();
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

    setActiveSizeIdsByActivePlayer();
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

function setActiveSizeIdsByActivePlayer() {
    currentActiveSizeId = "current-size--" + activePlayerNumber;
    generalActiveSizeId = "general-size--" + activePlayerNumber;
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
            currentDicksSizeArray.forEach(j => {
                if (j.id === currentActiveSizeId) {
                    e.textContent = Number(e.textContent) + Number(j.textContent);
                    j.textContent = "0";
                }
            })

        }
    })
    setAnotherPlayerAsActive();
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

