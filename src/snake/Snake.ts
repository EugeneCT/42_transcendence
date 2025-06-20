import { TILE_SIZE } from './settings.js'

export class Snake {
	body: Array<Body> = new Array<Body>;
	size: number = 0;

	constructor(
		ctx: CanvasRenderingContext2D,
		private tileX: number,
		private tileY: number,
		private direction: 'N' | 'S' | 'E' | 'W',
		private upKey: string,
		private downKey: string,
		private leftKey: string,
		private rightKey: string,
		private color: string) {
			this.addNewBody(ctx, tileX, tileY, 'head');
			this.addNewBody(ctx, tileX, tileY + 1, 'tail');
			this.addNewBody(ctx, tileX, tileY + 2, 'tail');
		}
	
	addNewBody(ctx: CanvasRenderingContext2D, tileX: number, tileY: number, type: 'head' | 'tail') {
		this.body.push(new Body(ctx, tileX, tileY, type));
		this.size++;
	}
	
	draw() {
		this.body.forEach(body => body.draw(this.color));
	}

	move(keys: Set<string>) {
		// move the body parts from back to front
		for (let i = this.size - 1; i > 0; i--) {
			this.body[i].tileX = this.body[i - 1].tileX;
			this.body[i].tileY = this.body[i - 1].tileY;
		}

		// move head
		if (keys.has(this.upKey)) {
			this.body[0].tileY--;
		} else if (keys.has(this.downKey)) {
			this.body[0].tileY++;
		} else if (keys.has(this.leftKey)) {
			this.body[0].tileX--;
		} else if (keys.has(this.rightKey)) {
			this.body[0].tileX++;
		}
	}
}

class Body {
	constructor(
		private ctx: CanvasRenderingContext2D,
		public tileX: number,
		public tileY: number,
		public type: 'head' | 'tail',
	) {}

	draw(color: string) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(this.tileX * TILE_SIZE, this.tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
	};
}