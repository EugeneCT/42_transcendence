import { FONT, TILE_SIZE, TILES_X, TILES_Y } from "../settings.js";
import { Snake } from "./Snake.js";

export class Fruit {
	positionX : number = 0;
	positionY : number = 0;
	
	constructor(private ctx: CanvasRenderingContext2D, snakeA: Snake, snakeB: Snake) {
		const getRandomInt = (min: number, max: number) => {
			return Math.floor(Math.random() * (max - min) + min);		
		};	// [min, max)

		do {
			this.positionX = getRandomInt(0, TILES_X);
			this.positionY = getRandomInt(0, TILES_Y);
		} while (
			snakeA.bodies.some(
				body => body.positionX === this.positionX
				&& body.positionY === this.positionY
			) || 
			snakeB.bodies.some(
				body => body.positionX === this.positionX
				&& body.positionY === this.positionY
			)
		)
	}

	draw() {
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'middle';
		this.ctx.font = `30px ${FONT}`;
		this.ctx.fillText(
			'🍎', 
			this.positionX * TILE_SIZE + TILE_SIZE/2,
			this.positionY * TILE_SIZE + TILE_SIZE/2
		);
	}
}