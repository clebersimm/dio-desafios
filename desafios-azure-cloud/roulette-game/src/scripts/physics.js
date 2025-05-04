function applyGravity(ball) {
    const gravity = 0.1; // Adjust this value for stronger/weaker gravity
    ball.velocityY += gravity; // Apply gravity to the ball's vertical velocity
    ball.y += ball.velocityY; // Update ball's position based on velocity

    // Check for collision with the bottom of the roulette wheel
    if (ball.y >= canvas.height - ball.radius) {
        ball.y = canvas.height - ball.radius; // Reset position to the edge of the wheel
        ball.velocityY *= -0.5; // Reverse velocity and apply damping
    }
}

function updateBallPosition(ball) {
    ball.x += ball.velocityX; // Update horizontal position
    applyGravity(ball); // Apply gravity to the ball
}

function resetBall(ball) {
    ball.x = canvas.width / 2; // Reset to center
    ball.y = canvas.height / 2; // Reset to center
    ball.velocityX = 0; // Reset horizontal velocity
    ball.velocityY = 0; // Reset vertical velocity
}