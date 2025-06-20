import { Board } from './Board.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';
const canvas = document.getElementById('gameCanvas');
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;
const ctx = canvas.getContext('2d');
let board = new Board(ctx);
let keys = new Set;
document.addEventListener('keydown', (event) => {
    keys.add(event.key);
});
document.addEventListener('keyup', (event) => {
    keys.delete(event.key);
});
function gameLoop() {
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    board.drawBlankCanvas();
    requestAnimationFrame(gameLoop);
}
gameLoop();
