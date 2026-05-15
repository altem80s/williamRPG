// script.js

const falling = document.getElementById("falling");
const catcher = document.getElementById("catcher");
const scoreText = document.getElementById("score");

const popup = document.getElementById("popup");

const encouragement = document.getElementById("encouragement");

const quackSound = document.getElementById("quack-sound");

let encouragementShown = false;

let gameOver = false;

let fallingX = 300;
let fallingY = 0;

let catcherX = 300;

let score = 0;

/* MOVE CATCHER */

document.addEventListener("keydown", (e) => {

  if (e.key === "ArrowLeft") {
    catcherX -= 30;
  }

  if (e.key === "ArrowRight") {
    catcherX += 30;
  }

  /* KEEP INSIDE GAME */

  if (catcherX < 0) {
    catcherX = 0;
  }

  if (catcherX > 620) {
    catcherX = 620;
  }

  catcher.style.left = catcherX + "px";
});

/* GAME LOOP */

function gameLoop() {

  if (gameOver) return;

  fallingY += 5;

  falling.style.top = fallingY + "px";
  falling.style.left = fallingX + "px";

  /* COLLISION DETECTION */

  if (

    fallingY > 420 &&
    fallingX > catcherX - 80 &&
    fallingX < catcherX + 120

  ) {

    score++;

    /* PLAY QUACK SOUND */

    quackSound.currentTime = 0;
    quackSound.play();

    scoreText.innerText =
      "Ducks Collected: " + score;

    /* SHOW ENCOURAGEMENT IMAGE */

    if (score >= 8 && !encouragementShown) {

      encouragementShown = true;

      encouragement.classList.add("show");
    }

    /* WIN CONDITION */

    if (score >= 10) {

      gameOver = true;

      popup.style.display = "flex";

      return;
    }

    resetFalling();
  }

  /* MISSED */

  if (fallingY > 600) {

    resetFalling();
  }

  requestAnimationFrame(gameLoop);
}

/* RESET FALLING IMAGE */

function resetFalling() {

  fallingY = -120;

  fallingX = Math.random() * 650;
}

/* START GAME */

gameLoop();