import { TILE_SIZE, TILES_X, TILES_Y } from '../settings.js';

type KeyMap = {
	up: string,
	down: string,
	left: string,
	right: string
};

type Direction = 'up' | 'down' | 'left' | 'right';

export class Snake {
	bodies: Array<Body> = new Array<Body>;
	size: number = 0;
	direction: Direction = 'up';
	protected keyMap!: KeyMap;
	positionX!: number;
	positionY!: number;

	constructor(
		private ctx: CanvasRenderingContext2D,
		private color: string) {
			this.addNewBody(this.positionX, this.positionY, 'head');
			switch (this.direction) {
				case 'up':
					this.addNewBody(this.positionX, this.positionY + 1, 'tail');
					this.addNewBody(this.positionX, this.positionY + 2, 'tail');
					break;
				case 'down':
					this.addNewBody(this.positionX, this.positionY - 1, 'tail');
					this.addNewBody(this.positionX, this.positionY - 2, 'tail');
					break;
				case 'left':
					this.addNewBody(this.positionX + 1, this.positionY, 'tail');
					this.addNewBody(this.positionX + 2, this.positionY, 'tail');
					break;
				case 'right':
					this.addNewBody(this.positionX - 1, this.positionY, 'tail');
					this.addNewBody(this.positionX - 2, this.positionY, 'tail');
					break;
			}
		}
	
	addNewBody(positionX: number, positionY: number , type: 'head' | 'tail') {
		this.bodies.push(new Body(this.ctx, positionX, positionY, type));
		this.size++;
	}
	
	draw() {
		this.bodies.forEach(body => body.draw(this.color));
	}

	move(keys: Set<string>) {
		// change direction if key is pressed
		if (keys.has(this.keyMap.up) && this.direction != 'down') {
			this.direction = 'up';
		} else if (keys.has(this.keyMap.down) && this.direction != 'up') {
			this.direction = 'down';
		} else if (keys.has(this.keyMap.left) && this.direction != 'right') {
			this.direction = 'left';
		} else if (keys.has(this.keyMap.right) && this.direction != 'left') {
			this.direction = 'right';
		}
		
		// move the body parts from back to front
		for (let i = this.size - 1; i > 0; i--) {
			this.bodies[i].positionX = this.bodies[i - 1].positionX;
			this.bodies[i].positionY = this.bodies[i - 1].positionY;
		}
		
		// move head
		switch (this.direction) {
			case 'up':
				this.bodies[0].positionY--;
				break;
			case 'down':
				this.bodies[0].positionY++;
				break;
			case 'left':
				this.bodies[0].positionX++;
				break;		
			case 'right':
				this.bodies[0].positionX--;
				break;
		}
	}

	detectCollision(opponent: Snake) : Boolean {
		// check for wall
		if (this.bodies[0].positionX < 0
			|| this.bodies[0].positionX >= TILES_X
			|| this.bodies[0].positionY < 0
			|| this.bodies[0].positionY >= TILES_Y
		) { return true; }
		
		// check for own body
		if ([...this.bodies].some(
			body => body.type == 'tail' && body.positionX == this.positionX && body.positionY == this.positionY
		)) { return true; }

		// check for opponent head + body
		if ([...opponent.bodies].some(
			body => body.positionX == this.positionX && body.positionY == this.positionY
		)) { return true; }

		return false;
	}
}

class Body {
	constructor(
		private ctx: CanvasRenderingContext2D,
		public positionX: number,
		public positionY: number,
		public type: 'head' | 'tail',
	) {}

	draw(color: string) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(this.positionX * TILE_SIZE, this.positionY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
	}
}

export class SnakeA extends Snake {
	constructor(
		ctx: CanvasRenderingContext2D,
		color: string,
	) {
		super(ctx, color);
		this.keyMap = {
			up: 'W',
			down: 'S',
			left: 'A',
			right: 'D',
		}
		this.positionX = 2;
		this.positionY = 3;
	}
}

export class SnakeB extends Snake {
	constructor(
		ctx: CanvasRenderingContext2D,
		color: string,
	) {
		super(ctx, color);
		this.keyMap = {
			up: 'ArrowUp',
			down: 'ArrowDown',
			left: 'ArrowLeft',
			right: 'ArrowRight',
		}
		this.positionX = 5;
		this.positionY = 3;
	}
}