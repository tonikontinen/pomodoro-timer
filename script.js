let isRunning = false;
let timerDuration = 1 * 60; // 25 minutes
let currentTime = timerDuration;
let timer;

document.getElementById('start-btn').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
});

document.getElementById('pause-btn').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timer);
    currentTime = timerDuration;
    updateDisplay();
    isRunning = false;
});

function updateTimer() {
    if (currentTime <= 0) {
        clearInterval(timer);
        alert("Time's up!");
        currentTime = timerDuration;
        isRunning = false;
    } else {
        currentTime--;
        updateDisplay();
    }
}

function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    document.getElementById('timer-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

updateDisplay();
