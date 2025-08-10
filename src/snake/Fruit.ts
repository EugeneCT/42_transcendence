import { TILE_SIZE } from '../settings.js'

export class Fruit {
	tileX : number = 0;
	tileY : number = 0;
	
	constructor(private ctx: CanvasRenderingContext2D) {
		const getRandomInt = (min: number, max: number) => {
			return Math.floor(Math.random() * (max - min) + min);		
		};
		this.tileX = getRandomInt(0, 15);
		this.tileY = getRandomInt(0, 15);
	}

	draw() {
		this.ctx.fillStyle = 'orange';
		this.ctx.fillRect(this.tileX * TILE_SIZE, this.tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
	}
}