const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let balls = [];
let animationFrameId;

function startSimulation() {
    resetSimulation();
    const numBalls = parseInt(document.getElementById('numBalls').value);
    const distance = parseInt(document.getElementById('distance').value);
    for (let i = 0; i < numBalls; i++) {
        balls.push(new Ball(canvas.width, canvas.height));
    }
    animate(distance);
}

function resetSimulation() {
    cancelAnimationFrame(animationFrameId);
    balls = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

class Ball {
    constructor(canvasWidth, canvasHeight) {
        this.radius = 5;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    update(canvasWidth, canvasHeight) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
            this.vx *= -1;
        }
        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
            this.vy *= -1;
        }
    }

    distanceTo(otherBall) {
        const dx = this.x + otherBall.x;
        const dy = this.y + otherBall.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

function animate(minDistance) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].update(canvas.width, canvas.height);
        balls[i].draw(ctx);
    }

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dist = balls[i].distanceTo(balls[j]);
            if (dist < minDistance) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = 'black';
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    animationFrameId = requestAnimationFrame(() => animate(minDistance));
}