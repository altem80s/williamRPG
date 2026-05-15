const leftSpeaker = document.getElementById("left-speaker");
const leftText = document.getElementById("left-text");

const rightSpeaker = document.getElementById("right-speaker");
const rightText = document.getElementById("right-text");

const leftBox = document.getElementById("left-box");
const rightBox = document.getElementById("right-box");

const finalPopup = document.getElementById("final-popup");

const dialogue = [

  {
    side: "right",
    speaker: "Em:",
    text: "I see you have completed your quest. Well done",
    audio: "homeline1.mp3"
  },

  {
    side: "left",
    speaker: "William:",
    text: "Anything for key guy.. uh uh I mean you! Happy anniversary",
    audio: "homeline2.mp3"
  },


];

let index = 0;

let typing = false;

/* TYPEWRITER */

function typeWriter() {

  typing = true;

  leftText.innerHTML = "";
  rightText.innerHTML = "";

  leftSpeaker.innerHTML = "";
  rightSpeaker.innerHTML = "";

  let current = dialogue[index];

  /* PLAY AUDIO */

/* PLAY AUDIO */

if (current.audio) {

  /* MULTIPLE SOUNDS */

  if (Array.isArray(current.audio)) {

    let delay = 0;

    current.audio.forEach((sound) => {

      setTimeout(() => {

        const audio = new Audio(sound);

        audio.play();

      }, delay);

      delay += 1500;

    });

  }

  /* SINGLE SOUND */

  else {

    const voice = new Audio(current.audio);

    voice.play();
  }
}

  let charIndex = 0;

  /* SHOW CORRECT BOX */

  if (current.side === "left") {

    leftBox.style.display = "block";
    rightBox.style.display = "none";

    leftSpeaker.innerHTML = current.speaker;

  } else {

    rightBox.style.display = "block";
    leftBox.style.display = "none";

    rightSpeaker.innerHTML = current.speaker;
  }

  function type() {

    if (charIndex < current.text.length) {

      if (current.side === "left") {

        leftText.innerHTML += current.text.charAt(charIndex);

      } else {

        rightText.innerHTML += current.text.charAt(charIndex);
      }

      charIndex++;

      setTimeout(type, 35);

    } else {

      typing = false;
    }
  }

  type();
}

/* NEXT BUTTON */

function nextDialogue() {

  if (typing) return;

  /* FIRST CLICK STARTS DIALOGUE */

  if (
    leftBox.style.display === "none" &&
    rightBox.style.display === "none"
  ) {

    typeWriter();

    return;
  }

  index++;

  /* AFTER FINAL LINE */

  if (index >= dialogue.length) {

    /* HIDE OLD CHARACTERS */

    document.querySelector(".left-character")
      .style.display = "none";

    document.querySelector(".right-character")
      .style.display = "none";

    leftBox.style.display = "none";
    rightBox.style.display = "none";

    /* SHOW FINAL IMAGE */

    document.getElementById("final-character")
      .style.display = "block";

    /* HIDE NEXT BUTTON */

    document.querySelector(".next-btn")
      .style.display = "none";

    return;
  }

  typeWriter();
}
/* START EMPTY */

leftBox.style.display = "none";
rightBox.style.display = "none";
