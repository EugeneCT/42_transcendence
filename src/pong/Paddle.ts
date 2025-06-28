import { BOARD_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_MOVE_SPEED, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS } from './settings.js';

export abstract class Paddle {
	protected x: number = 0;
	protected y: number = 0;

	constructor(
		private ctx: CanvasRenderingContext2D,
		private color: string,
		public side: 'left' | 'right') {
			this.resetPosition();
		}
		
	// this.x and this.y is the top left corner of the rectangle.
	// goalLine is the right edge of the left paddle, and the left edge of the right paddle
	resetPosition() {
		if (this.side === 'left') {
			this.x = LEFT_GOAL_X - PADDLE_WIDTH;
		} else {
			this.x = RIGHT_GOAL_X;
		}
		this.y = (BOARD_HEIGHT - PADDLE_HEIGHT)/2;
	}

	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, PADDLE_WIDTH, PADDLE_HEIGHT);
	}

	abstract move(...args: any[]) : void

	moveUp() {
		if (this.y - PADDLE_MOVE_SPEED >= 0) {
			this.y -= PADDLE_MOVE_SPEED;
		}
	}

	moveDown() {
		if (this.y + PADDLE_HEIGHT + PADDLE_MOVE_SPEED <= BOARD_HEIGHT) {
			this.y += PADDLE_MOVE_SPEED;
		}
	}

	checkCollisionWithBall(ballCenterY: number) {
		return (ballCenterY >= this.y - BALL_RADIUS
			&& ballCenterY <= this.y + PADDLE_HEIGHT + BALL_RADIUS);
	}
}

export class Player extends Paddle {
	constructor(
		ctx: CanvasRenderingContext2D,
		color: string,
		side: 'left' | 'right',
		private upKey: string,
		private downKey: string) {
			super(ctx, color, side);
		}

	move(keys: Set<string>) {
		if (keys.has(this.upKey)) {
			this.moveUp();
		} else if (keys.has(this.downKey)) {
			this.moveDown();
		}
	}
}

export class AI extends Paddle {
	private lastUpdateTime: number = 0;
	private projectedY: number = 0;
	private refreshTimeMs: number = 1000;

	constructor(
		ctx: CanvasRenderingContext2D,
		color: string,
		side: 'left' | 'right') {
			super(ctx, color, side)
		}
	
	resetPosition() {
		this.lastUpdateTime = 0;
		super.resetPosition();
	}


	private calculateProjectedY(ballCenterX: number, ballCenterY: number, ballSpeedX: number, ballSpeedY: number) {
		let projectedX = 0;
		if ((ballSpeedX > 0 && this.side === 'right') || (ballSpeedX < 0 && this.side === 'left')) {
			// ball is going towards the paddle
			projectedX = (ballSpeedX > 0) ? RIGHT_GOAL_X : LEFT_GOAL_X;
		} else {
			// assume ball will bounce off the opposite paddle
			projectedX = (ballSpeedX > 0) ? RIGHT_GOAL_X + (RIGHT_GOAL_X - LEFT_GOAL_X) : LEFT_GOAL_X - (RIGHT_GOAL_X - LEFT_GOAL_X);
		}
		let timeToGoal = (projectedX - ballCenterX) / ballSpeedX;
		let rawProjectedY = timeToGoal * ballSpeedY + ballCenterY;

		// correct for ball bouncing off top / bottom
		while (!(0 <= rawProjectedY && rawProjectedY < BOARD_HEIGHT)) {
			if (rawProjectedY >= BOARD_HEIGHT) {
				// bounce off bottom, reflect up
				rawProjectedY = 2 * ballCenterY - rawProjectedY + 2 * (BOARD_HEIGHT - ballCenterY);
			} else {
				// bounce off top, reflect down
				rawProjectedY = 2 * ballCenterY - rawProjectedY - 2 * (ballCenterY);
			}
		}

		return rawProjectedY;
	}
	
	move(ballCenterX: number, ballCenterY: number, ballSpeedX: number, ballSpeedY: number) {		
		let currentTime = Date.now();
		if (this.lastUpdateTime === 0 || currentTime >= this.lastUpdateTime + this.refreshTimeMs) {
			this.projectedY = this.calculateProjectedY(ballCenterX, ballCenterY, ballSpeedX, ballSpeedY);
			this.lastUpdateTime = currentTime;
		}

		if (this.projectedY > this.y && this.projectedY < this.y + PADDLE_HEIGHT) {
			// do nothing
		}
		else if (this.y >= this.projectedY) {
			this.moveUp();
		} else {
			this.moveDown();
		}
	}
}