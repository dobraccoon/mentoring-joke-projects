"use strict";

const boxesBottons = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
let boxNumberWithShit = getRandomPlaceForShit();

function putTheShitIntoAnotherBox() {
  let newShitBoxPlaceNumber = getRandomPlaceForShit();
  if (newShitBoxPlaceNumber === boxNumberWithShit) {
    putTheShitIntoAnotherBox();
  } else {
    boxNumberWithShit = newShitBoxPlaceNumber;
  }
}

function getRandomPlaceForShit() {
  return Math.trunc(Math.random() * 3 + 1);
}

function closeTheBox() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function openTheBox(box) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  if (Number(box.id) === boxNumberWithShit) {
    showShitInTheOpenBox();
    putTheShitIntoAnotherBox();
    console.log("Now shit is in the box: " + boxNumberWithShit);
  } else {
    showFailMessageInTheOpenBox();
  }
}

function closeTheBoxByEscapePress(event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden"))
    closeTheBox();
}

function showShitInTheOpenBox() {
  modal.getElementsByTagName("p")[0].innerText =
    "💩\nДа, она тут 🎉 \n А, у тебя хороший нюх 😏 \n Я ее перепрятал, попробуй еще раз найти 😈";
}

function showFailMessageInTheOpenBox() {
  modal.getElementsByTagName("p")[0].textContent = "Нет, тут все чисто 🤷‍♂️";
}

boxesBottons.forEach((e) => {
  e.addEventListener("click", () => {
    openTheBox(e);
  });
});

modalCloseButton.addEventListener("click", closeTheBox);

document.addEventListener("keydown", closeTheBoxByEscapePress);

overlay.addEventListener("click", closeTheBox);
