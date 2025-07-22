import { Player, AI } from './Paddle.js';
import { Ball } from './Ball.js';
import { Board } from './Board.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';
const canvas = document.getElementById('gameCanvas');
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;
const ctx = canvas.getContext('2d');
const socket = io();
let playerNumber = null;
let keys = new Set();
let board = new Board(ctx);
let ball = new Ball(ctx);
let leftPaddle;
let rightPaddle;
document.addEventListener('keydown', (event) => keys.add(event.key));
document.addEventListener('keyup', (event) => keys.delete(event.key));
socket.on('playerNumber', (num) => {
    playerNumber = num;
    if (num === 1) {
        leftPaddle = new Player(ctx, 'red', 'left', 'w', 's');
        // rightPaddle = new AI(ctx, 'orange', 'right'); // optional AI
    }
    else if (num === 2) {
        // leftPaddle = new AI(ctx, 'green', 'left'); // optional AI
        rightPaddle = new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown');
    }
    gameLoop();
});
socket.on('startGame', () => {
    console.log("Both players connected, starting game.");
});
socket.on('syncPaddle', (data) => {
    if (data.side === 'left' && leftPaddle instanceof AI === false) {
        leftPaddle.resetPosition;
    }
    if (data.side === 'right' && rightPaddle instanceof AI === false) {
        rightPaddle.resetPosition;
    }
});
// socket.on('syncPaddle', (data: { side: 'left' | 'right'; y: number }) => {
// 	if (data.side === 'left' && leftPaddle instanceof AI === false) {
// 		leftPaddle.y = data.y;
// 	}
// 	if (data.side === 'right' && rightPaddle instanceof AI === false) {
// 		rightPaddle.y = data.y;
// 	}
// });
socket.on('syncBall', (data) => {
    ball.centerX = data.x;
    ball.centerY = data.y;
    ball.speedX = data.dx;
    ball.speedY = data.dy;
});
socket.on('playerDisconnected', () => {
    alert("Opponent disconnected.");
});
function gameLoop() {
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    board.drawBlankCanvas();
    // Paddle movement
    if (leftPaddle instanceof Player) {
        leftPaddle.move(keys);
        socket.emit('syncPaddle', { side: 'left', y: leftPaddle.getY });
    }
    if (rightPaddle instanceof Player) {
        rightPaddle.move(keys);
        socket.emit('syncPaddle', { side: 'right', y: rightPaddle.getY });
    }
    leftPaddle.draw();
    rightPaddle.draw();
    ball.draw();
    // Ball logic: Only Player 1 controls ball
    if (playerNumber === 1) {
        // ball.move([leftPaddle, rightPaddle]);
        ball.move(new Set([leftPaddle, rightPaddle])); // ✅ Set<Paddle>
        socket.emit('syncBall', {
            x: ball.centerX,
            y: ball.centerY,
            dx: ball.speedX,
            dy: ball.speedY,
        });
    }
    let result = ball.checkVictory();
    if (result !== undefined) {
        if (result === 'left-win')
            board.leftScore++;
        else if (result === 'right-win')
            board.rightScore++;
        leftPaddle.resetPosition();
        rightPaddle.resetPosition();
        ball.resetPosition();
    }
    requestAnimationFrame(gameLoop);
}
/*
ISSUES:
- ball getting stuck on paddle => ball.checkCollision() does not take into account ball speed
    - define (xMin, xMax) zone where ball will bounce?
*/ 
