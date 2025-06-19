import { Paddle } from './Paddle.js';
import { Ball } from './Ball.js';
import { GameBoard } from './GameBoard.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';
const canvas = document.getElementById('gameCanvas');
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;
const ctx = canvas.getContext('2d');
let board = new GameBoard(ctx);
let player1 = new Paddle(ctx, 'w', 's', 'red', 'left');
let player2 = new Paddle(ctx, 'ArrowUp', 'ArrowDown', 'yellow', 'right');
let players = new Set;
players.add(player1);
players.add(player2);
let ball = new Ball(ctx);
let keys = new Set;
document.addEventListener('keydown', (event) => {
    keys.add(event.key);
});
document.addEventListener('keyup', (event) => {
    keys.delete(event.key);
});
let isGameRunning = true;
function gameLoop() {
    if (!isGameRunning)
        return;
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    board.drawBlankCanvas();
    players.forEach(player => player.draw());
    ball.draw();
    players.forEach(player => player.move(keys));
    let result = ball.checkCollision(players);
    if (result === 'left-win') {
        board.leftScore++;
        isGameRunning = false;
    }
    else if (result === 'right-win') {
        board.rightScore++;
        isGameRunning = false;
    }
    ball.move();
    requestAnimationFrame(gameLoop);
}
gameLoop();
/*
ISSUES:
- ball getting stuck on paddle => ball.checkCollision() does not take into account ball speed
    - define (xMin, xMax) zone where ball will bounce?
- reset board after a point is scored

- make ball speed increase over time?
*/ 
