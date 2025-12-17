const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;

let snake;
let food;
let direction = "";
let game = null;
let gameStarted = false;

/* ---------------------------
   INITIALIZE / RESET GAME
--------------------------- */
function initGame() {
    score = 0;
    document.getElementById("score").innerText = score;

    snake = [];
    snake[0] = {
        x: 10 * box,
        y: 10 * box
    };

    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };

    direction = "";
}

/* ---------------------------
   START BUTTON LOGIC
--------------------------- */
document.getElementById("startBtn").addEventListener("click", () => {
    if (!gameStarted) {
        gameStarted = true;
        initGame();
        document.getElementById("startBtn").style.display = "none";
        game = setInterval(drawGame, 120);
    }
});

/* ---------------------------
   CONTROLS
--------------------------- */
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (!gameStarted) return;

    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

/* ---------------------------
   COLLISION CHECK
--------------------------- */
function collision(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true;
        }
    }
    return false;
}

/* ---------------------------
   MAIN GAME LOOP
--------------------------- */
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#00ff00" : "#00cc00";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Eat food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").innerText = score;

        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game Over
    if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvas.width || snakeY >= canvas.height ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
        gameStarted = false;
        alert("Game Over! Your Score: " + score);
        document.getElementById("startBtn").style.display = "inline-block";
        return;
    }

    snake.unshift(newHead);
}
