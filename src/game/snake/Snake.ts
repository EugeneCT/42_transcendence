import { TILE_SIZE, TILES_X, TILES_Y } from '../settings.js';

type KeyMap = {
	up: string,
	down: string,
	left: string,
	right: string
};

type Direction = 'up' | 'down' | 'left' | 'right';

export abstract class Snake {
	bodies = new Array<Body>;
	size = 0;
	direction: Direction = 'up';

	constructor(
		protected ctx: CanvasRenderingContext2D,
		protected color: string,
		protected keyMap: KeyMap,
		positionX: number,
		positionY: number
	) {
			this.addNewBody(positionX, positionY, 'head');
			switch (this.direction) {
				case 'up':
					this.addNewBody(positionX, positionY + 1, 'tail');
					this.addNewBody(positionX, positionY + 2, 'tail');
					break;
				case 'down':
					this.addNewBody(positionX, positionY - 1, 'tail');
					this.addNewBody(positionX, positionY - 2, 'tail');
					break;
				case 'left':
					this.addNewBody(positionX + 1, positionY, 'tail');
					this.addNewBody(positionX + 2, positionY, 'tail');
					break;
				case 'right':
					this.addNewBody(positionX - 1, positionY, 'tail');
					this.addNewBody(positionX - 2, positionY, 'tail');
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
		if (keys.has(this.keyMap.up) && this.direction !== 'down') {
			this.direction = 'up';
		} else if (keys.has(this.keyMap.down) && this.direction !== 'up') {
			this.direction = 'down';
		} else if (keys.has(this.keyMap.left) && this.direction !== 'right') {
			this.direction = 'left';
		} else if (keys.has(this.keyMap.right) && this.direction !== 'left') {
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
				this.bodies[0].positionX--;
				break;		
			case 'right':
				this.bodies[0].positionX++;
				break;
		}
	}

	detectCollision(opponent: Snake) : Boolean {
		// check for wall
		if (this.bodies[0].positionX < 0
			|| this.bodies[0].positionX >= TILES_X
			|| this.bodies[0].positionY < 0
			|| this.bodies[0].positionY >= TILES_Y
		) { console.log('hit wall'); return true; }
		
		// check for own body
		if ([...this.bodies].some(
			body => body.type == 'tail' && body.positionX == this.bodies[0].positionX && body.positionY == this.bodies[0].positionY
		)) { console.log('hit body'); return true; }

		// check for opponent head + body
		if ([...opponent.bodies].some(
			body => body.positionX == this.bodies[0].positionX && body.positionY == this.bodies[0].positionY
		)) { console.log('hit opponenet'); return true; }

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
	constructor(ctx: CanvasRenderingContext2D, color: string) {
		super(
			ctx,
			color,
			{ up: 'w', down: 's', left: 'a', right: 'd' },
			2, 3
		);
	}
}

export class SnakeB extends Snake {
	constructor(ctx: CanvasRenderingContext2D, color: string) {
		super(
			ctx,
			color,
			{ up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright' },
			5, 3
		)
	}
}
