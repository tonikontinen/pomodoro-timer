let isRunning = false;
let workDuration = 25 * 60; // 25 minutes for work duration
let shortBreakDuration = 5 * 60; // 5 minutes for short break
let longBreakDuration = 15 * 60; // 15 minutes for long break
let currentDuration = workDuration;
let currentTime = currentDuration;
let timer;
let cycleCount = 0;

const workSound = new Audio("sounds/work.wav");
const shortBreakSound = new Audio("sounds/short.wav");
const longBreakSound = new Audio("sounds/long.wav");

document.getElementById("start-btn").addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    workSound.play();
    timer = setInterval(updateTimer, 1000);
    document.getElementById("start-btn").textContent = "Resume"; // Change text to 'Resume'
  }
});

document.getElementById("pause-btn").addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  document.getElementById("start-btn").textContent = "Resume"; // Change text to 'Resume' on pause
});

document.getElementById("reset-btn").addEventListener("click", () => {
  clearInterval(timer);
  currentTime = workDuration;
  currentDuration = workDuration;
  cycleCount = 0;
  isRunning = false;
  updateDisplay();
  updatePhaseStatus();
  document.getElementById("start-btn").textContent = "Start"; // Reset text to 'Start'
});

function updateTimer() {
  if (currentTime <= 0) {
    clearInterval(timer);
    if (currentDuration !== workDuration) {
      currentDuration = workDuration;
    } else {
      cycleCount++;
      currentDuration =
        cycleCount % 2 === 0 ? longBreakDuration : shortBreakDuration;
    }
    currentTime = currentDuration;
    isRunning = true;
    updatePhaseStatus();
    timer = setInterval(updateTimer, 1000);
  } else {
    currentTime--;
    updateDisplay();
  }
}

function updateDisplay() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  document.getElementById("timer-display").textContent = `${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Ensure two digits for minutes and seconds
}

function updatePhaseStatus() {
  let statusMessage = "";
  if (currentDuration === workDuration) {
    statusMessage = "Work Mode";
    workSound.play(); // Play work sound
  } else if (currentDuration === shortBreakDuration) {
    statusMessage = "Take a break for 5 min";
    shortBreakSound.play();
  } else if (currentDuration === longBreakDuration) {
    statusMessage = "Take a well-deserved longer break for 15 min";
    longBreakSound.play();
  }
  updateStatusText(statusMessage);
}

function updateStatusText(message) {
  document.getElementById("status-text").textContent = message;
}

updateDisplay();
updatePhaseStatus();
