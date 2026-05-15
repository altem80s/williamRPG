const leftSpeaker = document.getElementById("left-speaker");
const leftText = document.getElementById("left-text");

const rightSpeaker = document.getElementById("right-speaker");
const rightText = document.getElementById("right-text");

const leftBox = document.getElementById("left-box");
const rightBox = document.getElementById("right-box");

const finalPopup = document.getElementById("final-popup");

const dialogue = [

  {
    side: "left",
    speaker: "Key Guy:",
    text: "Huh... you actually made it here you damn nerd",
    audio: "line1.mp3"
  },

  {
    side: "right",
    speaker: "William:",
    text: "ofc I did...",
    audio: "line2.mp3"
  },

  {
    side: "left",
    speaker: "Key Guy:",
    text: "You need to take these ducks home. You know she's waiting for you.",
    audio: "line3.mp3"
    
  },

  {
    side: "right",
    speaker: "William:",
    text: "I know... she's probably getting worried by now.. you know how women get without their ducks",
    audio: "line4.mp3"
  },

  {
    side: "left",
    speaker: "Key Guy:",
    text: "You must pass through my haunted forest before you can return home to her.",
    audio: "line5.mp3"
  },

  {
    side: "right",
    speaker: "William:",
    text: "Haunted....? What do you mean haunted?",
    audio: "line6.mp3"
  },

  {
    side: "left",
    speaker: "Key Guy:",
    text: "Heh... youll see nerd",
     audio: ["line7.mp3", "fart.mp3"]
      
  },

  {
    side: "right",
    speaker: "William:",
    text: "Wait, what?",
    audio: "line8.mp3"
  }

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

  /* END OF DIALOGUE */

  if (index >= dialogue.length) {

    finalPopup.style.display = "flex";

    return;
  }

  typeWriter();
}

/* START EMPTY */

leftBox.style.display = "none";
rightBox.style.display = "none";