var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Player, AI } from './Paddle.js';
import { Ball } from './Ball.js';
import { Board } from './Board.js';
import { BOARD_WIDTH, BOARD_HEIGHT, MAX_SCORE } from '../settings.js';
let ctx;
let board;
let paddles;
let ball;
let keys;
export function run(canvasCtx, mode, leftName, rightName) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield countdown();
        const winner = yield startGame();
        if (winner === 'left') {
            printWinner(leftName);
        }
        else {
            printWinner(rightName);
        }
        return winner;
    });
}
function refreshCanvas() {
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    board.drawBlankCanvas();
    paddles.forEach(paddle => paddle.draw());
    ball.draw();
}
function countdown() {
    const numbers = ['3', '2', '1'];
    let index = 0;
    let fontSize = 20;
    return new Promise(resolve => {
        function animate() {
            refreshCanvas();
            fontSize += 3;
            if (fontSize > 200) {
                index++;
                fontSize = 20;
                if (index >= numbers.length) {
                    resolve();
                    return;
                }
            }
            ctx.font = `${fontSize}px trebuchet ms`;
            ctx.fillStyle = 'white';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 5;
            ctx.textAlign = 'center';
            ctx.fillText(numbers[index], BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 50);
            requestAnimationFrame(animate);
        }
        animate();
    });
}
function startGame() {
    return new Promise(resolve => {
        function loop() {
            refreshCanvas();
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
            if (result === 'left-win') {
                board.leftScore++;
                paddles.forEach(paddle => paddle.resetPosition());
                ball.resetPosition();
            }
            else if (result === 'right-win') {
                board.rightScore++;
                paddles.forEach(paddle => paddle.resetPosition());
                ball.resetPosition();
            }
            if (board.leftScore === MAX_SCORE) {
                resolve('left');
                return;
            }
            else if (board.rightScore === MAX_SCORE) {
                resolve('right');
                return;
            }
            requestAnimationFrame(loop);
        }
        loop();
    });
}
function printWinner(name) {
    refreshCanvas();
    ctx.font = `100px trebuchet ms`;
    ctx.fillStyle = 'yellow';
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 5;
    ctx.textAlign = 'center';
    ctx.fillText(`${name}`, BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 150);
    ctx.fillText('WIN🎉', BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 50);
}
