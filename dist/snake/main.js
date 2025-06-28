import { Board } from './Board.js';
import { Snake } from './Snake.js';
import { BOARD_WIDTH, BOARD_HEIGHT, REFRESH_TIME_MS } from './settings.js';
const canvas = document.getElementById('gameCanvas');
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;
const ctx = canvas.getContext('2d');
let board = new Board(ctx);
let snakes = new Set;
snakes.add(new Snake(ctx, 2, 3, 'N', 'w', 's', 'a', 'd', 'blue'));
let keys = new Set;
document.addEventListener('keydown', (event) => {
    keys.add(event.key);
});
document.addEventListener('keyup', (event) => {
    keys.delete(event.key);
});
let lastUpdateTimeMs = 0;
function gameLoop() {
    let currentTimeMs = Date.now();
    if (lastUpdateTimeMs === 0 || currentTimeMs >= lastUpdateTimeMs + REFRESH_TIME_MS) {
        ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
        board.drawBlankCanvas();
        snakes.forEach(snake => { snake.draw(); });
        snakes.forEach(snake => { snake.move(keys); });
        // detect collision
        lastUpdateTimeMs = currentTimeMs;
    }
    requestAnimationFrame(gameLoop);
}
gameLoop();
/*
TODO:
- create fruit
- head marker?
*/ 
