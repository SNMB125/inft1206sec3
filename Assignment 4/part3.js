const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= canvas.width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= canvas.height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
    const r = random(0, 256);
    const g = random(0, 256);
    const b = random(0, 256);
    return `rgba(${r},${g},${b}, 0.7)`;
}

for (let i = 0; i < 25; i++) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, canvas.width - size),
        random(0 + size, canvas.height - size),
        random(-7, 7),
        random(-7, 7),
        randomColor(),
        size
    );
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.draw();
        ball.update();
    });

    requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
