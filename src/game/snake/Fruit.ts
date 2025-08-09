import { FONT, TILE_SIZE } from "../settings.js";

export class Fruit {
	positionX : number = 0;
	positionY : number = 0;
	
	constructor(private ctx: CanvasRenderingContext2D) {
		const getRandomInt = (min: number, max: number) => {
			return Math.floor(Math.random() * (max - min) + min);		
		};
		this.positionX = getRandomInt(0, 15);
		this.positionY = getRandomInt(0, 15);
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