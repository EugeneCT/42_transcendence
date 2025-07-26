import { Player, AI } from './Paddle.js';
import { Ball } from './Ball.js';
import { Board } from './Board.js';
import { BOARD_WIDTH, BOARD_HEIGHT, MAX_SCORE } from '../settings.js';
let ctx;
let board;
let paddles;
let ball;
let keys;
// output winner
export function run(canvasCtx, mode) {
    ctx = canvasCtx;
    board = new Board(ctx);
    // Paddles can be either of class Player or AI
    paddles = new Set;
    switch (mode) {
        case 'tournament':
            paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
            paddles.add(new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown'));
            break;
        case 'ai':
            paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
            paddles.add(new AI(ctx, 'yellow', 'right'));
            break;
        case '2v2':
            paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
            paddles.add(new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown'));
            paddles.add(new Player(ctx, 'green', 'left', 'i', 'k'));
            paddles.add(new Player(ctx, 'orange', 'right', '5', '2'));
            break;
    }
    ball = new Ball(ctx);
    keys = new Set;
    document.addEventListener('keydown', (event) => {
        keys.add(event.key);
    });
    document.addEventListener('keyup', (event) => {
        keys.delete(event.key);
    });
    return gameLoop();
}
function gameLoop() {
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    board.drawBlankCanvas();
    paddles.forEach(paddle => paddle.draw());
    ball.draw();
    if (board.leftScore === MAX_SCORE) {
        return 'left';
    }
    else if (board.rightScore === MAX_SCORE) {
        return 'right';
    }
    paddles.forEach(paddle => {
        if (paddle instanceof Player) {
            paddle.move(keys);
        }
        else if (paddle instanceof AI) {
            paddle.move(ball.centerX, ball.centerY, ball.speedX, ball.speedY);
        }
    });
    ball.move(paddles);
    let result = ball.checkVictory();
    if (result !== undefined) {
        if (result === 'left-win') {
            board.leftScore++;
        }
        else if (result === 'right-win') {
            board.rightScore++;
        }
        paddles.forEach(paddle => paddle.resetPosition());
        ball.resetPosition();
    }
    requestAnimationFrame(gameLoop);
}
