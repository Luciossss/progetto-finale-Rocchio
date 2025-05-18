let timer;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isRunning = false;
let laps = [];

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function updateDisplay() {
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        milliseconds++;
        if (milliseconds >= 100) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    laps = [];
    lapList.innerHTML = '';
}

function recordLap() {
    const lapTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    laps.push(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
}




