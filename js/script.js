const btnStart = document.querySelector(".btn-start");
const btnPomodoro = document.querySelector(".btn-pomodoro");
const btnBreak = document.querySelector(".btn-break");
const timeElement = document.querySelector(".time");
const header = document.querySelector(".header");
const background = document.querySelector(".background");
const card = document.querySelector(".wrapper");

let timeLeft = 1500;
let timer;
let isTimer = false;

const audioClick = new Audio();
audioClick.src = "./assets/buttonClick.mp3";

const audioEnd = new Audio();
audioEnd.src = "./assets/End.mp3";

btnPomodoro.addEventListener("click", () => {
  header.classList.remove("switch-header");
  background.classList.remove("switch-background");
  card.classList.remove("switch-wrapper");
  timeLeft = 1500;
  updateTime();
});

btnBreak.addEventListener("click", () => {
  header.classList.add("switch-header");
  background.classList.add("switch-background");
  card.classList.add("switch-wrapper");

  timeLeft = 300;
  updateTime();
});

btnStart.addEventListener("click", () => {
  audioClick.play();
  if (isTimer) {
    clearInterval(timer);
    isTimer = false;
    btnStart.textContent = "Start";
  } else {
    timer = setInterval(startCountdown, 1000);
    isTimer = true;
    btnStart.textContent = "Pause";
  }
});

function startCountdown() {
  if (timeLeft === 0) {
    audioEnd.play();
    clearInterval(timer);
    timeElement.textContent = `Отсчёт закончен`;
  } else {
    timeLeft--;
    updateTime();
  }
}

function updateTime() {
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timeElement.innerHTML = `${minutes}:${seconds}`;
}
