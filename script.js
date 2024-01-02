let isRunning = false;
let workDuration = 25 * 60; // 25 minutes for work duration
let shortBreakDuration = 5 * 60; // 5 minutes for short break
let longBreakDuration = 15 * 60; // 15 minutes for long break
let currentDuration = workDuration; // Starts with work duration
let currentTime = currentDuration;
let timer;
let cycleCount = 0;

const workSound = new Audio('work.wav');
const shortBreakSound = new Audio('short.wav');
const longBreakSound = new Audio('long.wav');

document.getElementById('start-btn').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        workSound.play();
        timer = setInterval(updateTimer, 1000);
    }
});

document.getElementById('pause-btn').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timer);
    currentTime = workDuration;
    currentDuration = workDuration;
    cycleCount = 0;
    isRunning = false;
    updateDisplay();
    updatePhaseColor();
    document.getElementById('start-btn').textContent = "Start";
});


function updateTimer() {
    if (currentTime <= 0) {
        clearInterval(timer); 
        if (currentDuration !== workDuration) {
            currentDuration = workDuration;
            workSound.play().catch(e => console.error("Error playing work sound: ", e));
        } else {
            cycleCount++;
            currentDuration = (cycleCount % 2 === 0) ? longBreakDuration : shortBreakDuration;
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
    document.getElementById('timer-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


function updatePhaseStatus() {
    let statusMessage = '';
    if (currentDuration === workDuration) {
        statusMessage = 'Work Mode';
    } else if (currentDuration === shortBreakDuration) {
        statusMessage = 'Take a break for 5 min';
        shortBreakSound.play(); 
    } else if (currentDuration === longBreakDuration) {
        statusMessage = 'Take a well deserved longer break for 15 min';
        longBreakSound.play(); 
    }
    updateStatusText(statusMessage);
}


function updateStatusText(message) {
    document.getElementById('status-text').textContent = message;
}

updateDisplay();
updatePhaseStatus();





