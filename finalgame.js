// finalgame.js

const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const winPopup = document.getElementById("win-popup");
const losePopup = document.getElementById("lose-popup");

const trees = document.querySelectorAll(".tree");

const music = document.getElementById("bg-music");

/* START MUSIC ON FIRST KEY PRESS */

document.addEventListener("keydown", () => {

  music.play();

}, { once: true });

let playerX = 40;
let playerY = 300;

let enemyX = 850;
let enemyY = 40;

let gameOver = false;

/* MOVE PLAYER */

document.addEventListener("keydown", (e) => {

  if (gameOver) return;

  let speed = 20;

  let newX = playerX;
  let newY = playerY;

  /* MOVEMENT */

  if (e.key === "ArrowUp") {
    newY -= speed;
  }

  if (e.key === "ArrowDown") {
    newY += speed;
  }

  if (e.key === "ArrowLeft") {
    newX -= speed;
  }

  if (e.key === "ArrowRight") {
    newX += speed;
  }

  /* BOUNDS */

  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;

  if (newX > 910) newX = 910;
  if (newY > 610) newY = 610;

  /* TREE COLLISION */

  let blocked = false;

  trees.forEach((tree) => {

    let treeRect = tree.getBoundingClientRect();

    let futurePlayer = {

      left: newX,
      top: newY,

      right: newX + 90,
      bottom: newY + 90
    };

    let gameRect = document
      .querySelector(".game")
      .getBoundingClientRect();

    let adjustedTree = {

      left: treeRect.left - gameRect.left,
      right: treeRect.right - gameRect.left,

      top: treeRect.top - gameRect.top,
      bottom: treeRect.bottom - gameRect.top
    };

    if (

      futurePlayer.right > adjustedTree.left &&
      futurePlayer.left < adjustedTree.right &&
      futurePlayer.bottom > adjustedTree.top &&
      futurePlayer.top < adjustedTree.bottom

    ) {

      blocked = true;
    }

  });

  /* ONLY MOVE IF NOT BLOCKED */

  if (!blocked) {

    playerX = newX;
    playerY = newY;
  }

  /* UPDATE PLAYER */

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  checkWin();
});

/* ENEMY CHASE */

function chasePlayer() {

  if (gameOver) return;

  let dx = playerX - enemyX;
  let dy = playerY - enemyY;

  enemyX += dx * 0.01;
  enemyY += dy * 0.01;

  enemy.style.left = enemyX + "px";
  enemy.style.top = enemyY + "px";

  checkCaught();

  requestAnimationFrame(chasePlayer);
}

/* WIN */

function checkWin() {

  if (playerX >= 900) {

    gameOver = true;

    winPopup.style.display = "flex";
  }
}

/* CAUGHT */

function checkCaught() {

  let distance = Math.sqrt(

    (playerX - enemyX) ** 2 +
    (playerY - enemyY) ** 2
  );

  if (distance < 80) {

    gameOver = true;

    losePopup.style.display = "flex";
  }
}

/* START */

chasePlayer();