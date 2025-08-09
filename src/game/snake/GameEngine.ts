import { BaseBoard, BaseGameEngine } from '../BaseGameEngine.js';
import { REFRESH_TIME_MS, TILE_SIZE, TILES_X, TILES_Y } from '../settings.js';
import { Fruit } from './Fruit.js';
import { Snake } from './Snake.js';

export class SnakeGameEngine extends BaseGameEngine {
	playerA!: Snake;
	playerB!: Snake;
	fruit!: Fruit;
	lastUpdateTimeMs = 0;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.board = new SnakeBoard(ctx);
		this.fruit = new Fruit(ctx);
	}

	refresh() {
		super.refresh();
		this.playerA.draw();
		this.playerB.draw();
		this.fruit.draw();
	}

	move() {
		let currentTimeMs = Date.now();
		if (this.lastUpdateTimeMs === 0 || currentTimeMs >= this.lastUpdateTimeMs + REFRESH_TIME_MS) {
		}
		this.playerA.move(this.keys);
		this.playerB.move(this.keys);

		// collision with fruit
		if (this.playerA.bodies[0].positionX == this.fruit.positionX && this.playerA.bodies[0].positionY) {
			console.log("A eats");
			// playerA.grow();
			this.fruit = new Fruit(this.ctx);
		}

		if (this.playerB.bodies[0].positionX == this.fruit.positionX && this.playerB.bodies[0].positionY) {
			console.log("B eats");
			// playerB.grow();
			this.fruit = new Fruit(this.ctx);
		}

		this.lastUpdateTimeMs = currentTimeMs;
	}

	checkWin() {
		let collisionA = this.playerA.detectCollision(this.playerB);
		let collisionB = this.playerB.detectCollision(this.playerA);
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
	}
}

export class SnakeBoard extends BaseBoard {
	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
	}

	private drawSquare(x: number, y: number, colorSwitch: boolean) {
		this.ctx.fillStyle = colorSwitch ? 'green' : 'lightGreen';
		this.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
	}

	drawBlankCanvas() {
		// background
		let y = 0;
		for (let i = 0; i < TILES_Y; i++) {
			let x = 0;
			for (let j = 0; j < TILES_X; j++) {
				const colorSwitch = ((i + j) % 2) === 0;
				this.drawSquare(x, y, colorSwitch);
				x += TILE_SIZE;
			}
			y += TILE_SIZE;
		}

		// scores
		this.drawScores();
	}
}
