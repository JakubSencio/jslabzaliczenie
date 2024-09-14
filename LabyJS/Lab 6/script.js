let canvas, ctx, ball, holes, gameStartTime;
const ballRadius = 10;
const holeRadius = 15;

function startGame() {
    canvas = document.getElementById('playArea');
    ctx = canvas.getContext('2d');
    resetGame();

    const holeCount = document.getElementById('holeCount') ? parseInt(document.getElementById('holeCount').value) : 5;
    setupHoles(holeCount);

    window.addEventListener('deviceorientation', controlBall);
    requestAnimationFrame(draw);
}

function resetGame() {
    ball = { x: canvas.width / 2, y: canvas.height / 2 };
    holes = [];
    gameStartTime = Date.now();
}

function setupHoles(count) {
    for (let i = 0; i < count; i++) {
        holes.push(randomPosition());
    }
}

function randomPosition() {
    return {
        x: Math.random() * (canvas.width - holeRadius * 2) + holeRadius,
        y: Math.random() * (canvas.height - holeRadius * 2) + holeRadius
    };
}

function controlBall(event) {
    const tiltX = event.gamma;
    const tiltY = event.beta;
    ball.x += tiltX / 2;
    ball.y += tiltY / 2;

    if (ball.x < ballRadius) ball.x = ballRadius;
    if (ball.x > canvas.width - ballRadius) ball.x = canvas.width - ballRadius;
    if (ball.y < ballRadius) ball.y = ballRadius;
    if (ball.y > canvas.height - ballRadius) ball.y = canvas.height - ballRadius;

    checkCollisions();
}

function checkCollisions() {
    holes.forEach((hole, index) => {
        const distance = Math.hypot(ball.x - hole.x, ball.y - hole.y);
        if (distance < ballRadius + holeRadius) {
            holes.splice(index, 1);
            if (holes.length === 0) {
                endGame();
            }
        }
    });
}

function endGame() {
    const gameEndTime = Date.now();
    const gameDuration = (gameEndTime - gameStartTime) / 1000;
    alert(`Gratulacje! Ukończyłeś grę w ${gameDuration} sekund.`);
    window.location.reload();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'navy';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'lime';
    holes.forEach(hole => {
        ctx.beginPath();
        ctx.arc(hole.x, hole.y, holeRadius, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}
