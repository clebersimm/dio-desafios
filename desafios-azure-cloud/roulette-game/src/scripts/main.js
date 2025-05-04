// main.js

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('rouletteCanvas');
    const ctx = canvas.getContext('2d');

    const wheelRadius = 200;
    const ballRadius = 10;
    let angle = 0;
    let speed = 0;
    let ballAngle = 0;
    let ballSpeed = 0.05; // Speed of the ball
    let ballDistance = wheelRadius - ballRadius; // Initial distance from the center
    let isSpinning = false;

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);

        // Draw the wheel
        ctx.fillStyle = '#ffcc00';
        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw the ball
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(
            ballDistance * Math.cos(ballAngle),
            ballDistance * Math.sin(ballAngle),
            ballRadius,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }

    function update() {
        if (isSpinning) {
            angle += speed;
            ballAngle += ballSpeed; // Ball moves independently of the wheel
            speed *= 0.99; // Simulate friction for the wheel

            // Check if the ball hits the edge of the wheel
            if (ballDistance >= wheelRadius - ballRadius || ballDistance <= ballRadius) {
                ballSpeed = -ballSpeed; // Reverse ball direction
            }

            if (speed < 0.01) {
                isSpinning = false;
                speed = 0;
            }
        }
        drawWheel();
        requestAnimationFrame(update);
    }

    function spinWheel() {
        if (!isSpinning) {
            speed = Math.random() * 0.1 + 0.1; // Random initial speed
            isSpinning = true;
        }
    }

    document.getElementById('spinButton').addEventListener('click', spinWheel);

    update();
});