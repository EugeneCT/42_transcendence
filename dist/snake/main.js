import { Board } from './Board.js';
import { Snake } from './Snake.js';
import { Fruit } from './Fruit.js';
import { BOARD_WIDTH, BOARD_HEIGHT, REFRESH_TIME_MS } from '../settings.js';
let ctx;
let board;
let playerA;
let playerB;
let fruit;
let keys;
let lastUpdateTimeMs;
export function run(canvasCtx) {
    ctx = canvasCtx;
    board = new Board(ctx);
    playerA = new Snake(ctx, 2, 3, 'N', 'w', 's', 'a', 'd', 'blue');
    playerB = new Snake(ctx, 5, 3, 'N', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'red');
    fruit = new Fruit(ctx);
    keys = new Set;
    document.addEventListener('keydown', (event) => {
        keys.add(event.key);
    });
    document.addEventListener('keyup', (event) => {
        keys.delete(event.key);
    });
    lastUpdateTimeMs = 0;
    startScreen('3', 20);
    gameLoop();
}
function startScreen(text, fontSize) {
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    board.drawBlankCanvas();
    playerA.draw();
    playerB.draw();
    fruit.draw();
    const maxFontSize = 80;
    const growIncrement = 0.5;
    fontSize += growIncrement;
    if (fontSize > maxFontSize) {
        return;
    }
    ctx.font = `${fontSize}px trebuchet ms`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text, BOARD_WIDTH / 2, BOARD_HEIGHT / 2);
    requestAnimationFrame(() => startScreen(text, fontSize));
}
function gameLoop() {
    let currentTimeMs = Date.now();
    if (lastUpdateTimeMs === 0 || currentTimeMs >= lastUpdateTimeMs + REFRESH_TIME_MS) {
        ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
        board.drawBlankCanvas();
        playerA.draw();
        playerB.draw();
        fruit.draw();
        playerA.move(keys);
        playerB.move(keys);
        // detect collision
        let collisionA = playerA.detectCollision(playerB);
        let collisionB = playerB.detectCollision(playerA);
        if (collisionA && collisionB) {
            console.log("tie");
            return;
        }
        else if (collisionA) {
            console.log("B win");
            return;
        }
        else if (collisionB) {
            console.log("A win");
            return;
        }
        // collision with fruit
        if (playerA.bodies[0].tileX == fruit.tileX && playerA.bodies[0].tileY) {
            console.log("A eats");
            // playerA.grow();
            fruit = new Fruit(ctx);
        }
        if (playerB.bodies[0].tileX == fruit.tileX && playerB.bodies[0].tileY) {
            console.log("B eats");
            // playerB.grow();
            fruit = new Fruit(ctx);
        }
        lastUpdateTimeMs = currentTimeMs;
    }
    requestAnimationFrame(gameLoop);
}
/*
TODO:
- create fruit
- head marker?
*/ 
