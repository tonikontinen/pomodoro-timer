// Initialize state variables
let isRunning = false;
let workDuration = 25 * 60; // 25 minutes for work duration
let shortBreakDuration = 5 * 60; // 5 minutes for short break
let longBreakDuration = 15 * 60; // 15 minutes for long break
let currentDuration = workDuration; // Starts with work duration
let currentTime = currentDuration;
let timer;
let cycleCount = 0;

const workSound = new Audio('path/to/work_sound.mp3');
const shortBreakSound = new Audio('path/to/short_break_sound.mp3');
const longBreakSound = new Audio('path/to/long_break_sound.mp3');

// Start button event listener
document.getElementById('start-btn').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        document.getElementById('start-btn').textContent = "Running";
        timer = setInterval(updateTimer, 1000);
    }
});

// Pause button event listener
document.getElementById('pause-btn').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('start-btn').textContent = "Start";
});

// Reset button event listener
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

// Timer update function
function updateTimer() {
    if (currentTime <= 0) {
        clearInterval(timer);
        if (currentDuration === workDuration) {
            cycleCount++;
            currentDuration = (cycleCount % 2 === 0) ? longBreakDuration : shortBreakDuration;
        } else {
            currentDuration = workDuration;
        }
        currentTime = currentDuration;
        isRunning = false;
        updatePhaseColor();
        timer = setInterval(updateTimer, 1000);
        isRunning = true;
    } else {
        currentTime--;
        updateDisplay();
    }
}

// Display update function
function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    document.getElementById('timer-display').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Phase color update function + status message + phasesound
function updatePhaseColor() {
    const bodyElement = document.body;
    bodyElement.classList.remove('work-phase', 'short-break-phase', 'long-break-phase');

    let statusMessage = '';
    if (currentDuration === workDuration) {
        bodyElement.classList.add('work-phase');
        statusMessage = 'Work Mode';
        workSound.play(); 
    } else if (currentDuration === shortBreakDuration) {
        bodyElement.classList.add('short-break-phase');
        statusMessage = 'Short Break Mode';
        shortBreakSound.play(); 
    } else if (currentDuration === longBreakDuration) {
        bodyElement.classList.add('long-break-phase');
        statusMessage = 'Long Break Mode';
        longBreakSound.play(); 
    }
    updateStatusText(statusMessage);
}


// Status text update function
function updateStatusText(message) {
    document.getElementById('status-text').textContent = message;
}

// Initialize display and color on page load
updateDisplay();
updatePhaseColor();
