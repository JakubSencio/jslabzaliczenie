let ball = document.getElementById('ball');
let hole = document.getElementById('hole');
let scoreElement = document.getElementById('score');
let timerElement = document.getElementById('timer');

let ballPosition = { x: Math.random() * (window.innerWidth - 30), y: Math.random() * (window.innerHeight - 30) };
let holePosition = { x: Math.random() * (window.innerWidth - 50), y: Math.random() * (window.innerHeight - 50) };

ball.style.left = ballPosition.x + 'px';
ball.style.top = ballPosition.y + 'px';
hole.style.left = holePosition.x + 'px';
hole.style.top = holePosition.y + 'px';

let score = 0;
let timeLeft = 60;

window.addEventListener('deviceorientation', (event) => {
    let tiltX = event.gamma;
    let tiltY = event.beta;

    ballPosition.x += tiltX / 5;
    ballPosition.y += tiltY / 5;

    if (ballPosition.x < 0) ballPosition.x = 0;
    if (ballPosition.x > window.innerWidth - 30) ballPosition.x = window.innerWidth - 30;
    if (ballPosition.y < 0) ballPosition.y = 0;
    if (ballPosition.y > window.innerHeight - 30) ballPosition.y = window.innerHeight - 30;

    ball.style.left = ballPosition.x + 'px';
    ball.style.top = ballPosition.y + 'px';

    if (isBallInHole()) {
        score++;
        scoreElement.textContent = 'Punkty: ' + score;
        resetPositions();
    }
});

function isBallInHole() {
    let dx = (ballPosition.x + 15) - (holePosition.x + 25);
    let dy = (ballPosition.y + 15) - (holePosition.y + 25);
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 25;
}

function resetPositions() {
    ballPosition.x = Math.random() * (window.innerWidth - 30);
    ballPosition.y = Math.random() * (window.innerHeight - 30);
    holePosition.x = Math.random() * (window.innerWidth - 50);
    holePosition.y = Math.random() * (window.innerHeight - 50);

    ball.style.left = ballPosition.x + 'px';
    ball.style.top = ballPosition.y + 'px';
    hole.style.left = holePosition.x + 'px';
    hole.style.top = holePosition.y + 'px';
}

function startTimer() {
    let timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = 'Czas: ' + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Koniec gry! Zdobyłeś ' + score + ' punktów.');
        }
    }, 1000);
}

startTimer();
