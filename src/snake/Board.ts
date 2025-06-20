import { BOARD_WIDTH, BOARD_HEIGHT, TILE_SIZE, TILES_X, TILES_Y } from './settings.js'

export class Board {
	leftScore: number = 0;
	rightScore: number = 0;

	constructor(private ctx: CanvasRenderingContext2D) {}

	private drawScore(score: number, centerX: number) {
		this.ctx.fillStyle = 'white';
		this.ctx.textAlign = 'center';
		this.ctx.font = "48px trebuchet ms";
		this.ctx.fillText(score.toString(), centerX, 50);
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
		this.drawScore(this.leftScore, BOARD_WIDTH / 4);
		this.drawScore(this.rightScore, BOARD_WIDTH / 4 * 3);
	}
}
