import { TILE_SIZE } from '../settings.js';

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
		this.ctx.fillStyle = 'orange';
		this.ctx.fillRect(this.positionX * TILE_SIZE, this.positionY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
	}
}