import { BaseBoard, BaseGameEngine } from '../BaseGameEngine.js';
import { MAX_SCORE, REFRESH_TIME_MS, TILE_SIZE, TILES_X, TILES_Y } from '../settings.js';
import { Fruit } from './Fruit.js';
import { Snake } from './Snake.js';

export class SnakeGameEngine extends BaseGameEngine {
	playerA!: Snake;
	playerB!: Snake;
	fruit?: Fruit;
	lastUpdateTimeMs = 0;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.board = new SnakeBoard(ctx);
	}

	refresh() {
		super.refresh();
		this.playerA.draw();
		this.playerB.draw();
		this.fruit?.draw();
	}

	move() {
		let currentTimeMs = Date.now();
		if (this.lastUpdateTimeMs === 0 || currentTimeMs >= this.lastUpdateTimeMs + REFRESH_TIME_MS) {
			const handleMovement = (player: Snake) => {
				const lastPositionX = player.bodies[player.size - 1].positionX;
				const lastPositionY = player.bodies[player.size - 1].positionY;

				player.move(this.keys);

				// collision with fruit
				if (player.bodies[0].positionX == this.fruit?.positionX
					&& player.bodies[0].positionY == this.fruit?.positionY) {
					player.addNewBody(lastPositionX, lastPositionY, 'tail');
					delete this.fruit;
				}
			}

			handleMovement(this.playerA);
			handleMovement(this.playerB);
	
			this.lastUpdateTimeMs = currentTimeMs;
		}
	}

	checkWin() {
		let collisionA = this.playerA.detectCollision(this.playerB);
		let collisionB = this.playerB.detectCollision(this.playerA);
		
		if (collisionA && collisionB) {
			this.board.leftScore += MAX_SCORE;
			this.board.rightScore += MAX_SCORE;
		} else if (collisionA) {
			this.board.rightScore += MAX_SCORE;
		} else if (collisionB) {
			this.board.leftScore += MAX_SCORE;
		}

		if (this.fruit === undefined) {
			this.fruit = new Fruit(this.ctx, this.playerA, this.playerB);
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
	}
}
