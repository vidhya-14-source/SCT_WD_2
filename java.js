let timer;
let startTime;
let elapsedTime = 0;
let running = false;

function startPause() {

    const startPauseButton = document.getElementById('startPauseButton');
    if (running) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startPauseButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 100);
        startPauseButton.textContent = 'Pause';
    }
    running = !running;
}

function reset() {

    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    document.getElementById('display').textContent = '00:00:00:00';
    document.getElementById('startPauseButton').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
}

function lap() {

    if (running) {
        const lapTime = formatTime(elapsedTime + (Date.now() - startTime));
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        document.getElementById('laps').appendChild(lapItem);
    }
}

function updateDisplay() {

    const currentTime = elapsedTime + (Date.now() - startTime);
    document.getElementById('display').textContent = formatTime(currentTime);
}

function formatTime(ms) {

    let totalMilliseconds = ms % 100;
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(totalMilliseconds)}`;
}

function pad(number) {

    return number < 10 ? '0' + number : number;
}

function padMilliseconds(number) {
    
    if (number < 10) { return '00' + number; } 
    else if (number < 100) { return '0' + number; } 
    else { return number; }
}