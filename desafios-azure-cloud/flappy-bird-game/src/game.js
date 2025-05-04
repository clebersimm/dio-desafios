// Select the canvas and get its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load the bird image
const birdImage = new Image();
birdImage.src = 'assets/bird.png'; // Ensure the path to the bird image is correct

// Flag to check if the image is loaded
let isBirdImageLoaded = false;

birdImage.onload = () => {
    isBirdImageLoaded = true;
};

const bird = {
    x: 50,
    y: 150,
    width: 34,
    height: 24,
    gravity: 0.6,
    lift: -15,
    velocity: 0,
    show: function() {
        if (isBirdImageLoaded) {
            ctx.drawImage(birdImage, this.x, this.y, this.width, this.height);
        }
    },
    update: function() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.velocity = 0;
        }

        if (this.y <= 0) {
            this.y = 0;
            this.velocity = 0;
        }
    },
    flap: function() {
        this.velocity += this.lift;
    }
};

const pipes = [];
const pipeWidth = 50;
const pipeGap = 100;
let frameCount = 0;
let score = 0;

function setup() {
    canvas.width = 400;
    canvas.height = 600;
    document.addEventListener('keydown', () => bird.flap());
    setInterval(addPipe, 1500);
    requestAnimationFrame(gameLoop);
}

function addPipe() {
    const pipeHeight = Math.random() * (canvas.height - pipeGap - 20) + 20;
    pipes.push({
        x: canvas.width,
        top: pipeHeight,
        bottom: canvas.height - pipeHeight - pipeGap
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.update();
    bird.show();

    for (let i = pipes.length - 1; i >= 0; i--) {
        const pipe = pipes[i];
        ctx.fillStyle = 'green';
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);

        pipe.x -= 2;

        if (pipe.x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }

        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipeWidth) {
            if (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom) {
                alert('Game Over! Your score: ' + score);
                document.location.reload();
            }
        }
    }

    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);
    requestAnimationFrame(gameLoop);
}

setup();