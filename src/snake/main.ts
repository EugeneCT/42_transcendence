import { Board } from './Board.js';
import { Snake } from './Snake.js';
import { Fruit } from './Fruit.js';
import { BOARD_WIDTH, BOARD_HEIGHT, REFRESH_TIME_MS } from './settings.js';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

const ctx = canvas.getContext('2d')!;

let board = new Board(ctx);

let playerA = new Snake(ctx, 2, 3, 'N', 'w', 's', 'a', 'd', 'blue');
let playerB = new Snake(ctx, 5, 3, 'N', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'red')
let fruit = new Fruit(ctx);

let keys = new Set<string>;
document.addEventListener('keydown', (event: KeyboardEvent) => {
	keys.add(event.key);
});
document.addEventListener('keyup', (event: KeyboardEvent) => {
	keys.delete(event.key);
});

let lastUpdateTimeMs = 0;

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
		} else if (collisionA) {
			console.log("B win");
			return;
		} else if (collisionB) {
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

gameLoop();


/*
TODO:
- create fruit
- head marker?
*/