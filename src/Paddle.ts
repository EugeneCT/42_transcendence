import { BOARD_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_MOVE_SPEED, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS } from './settings.js';

export class Paddle {
	private x: number;
	private y: number;

	// this.x and this.y is the top left corner of the rectangle.
	// goalLine is the right edge of the left paddle, and the left edge of the right paddle
	constructor(
		private ctx: CanvasRenderingContext2D,
		private upKey: string,
		private downKey: string,
		private color: string,
		public side: 'left' | 'right') {
			if (this.side === 'left') {
				this.x = LEFT_GOAL_X - PADDLE_WIDTH;
			} else {
				this.x = RIGHT_GOAL_X;
			}
			this.y = (BOARD_HEIGHT - PADDLE_HEIGHT)/2;
		}
	
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

	move(keys: Set<string>) {
		if (keys.has(this.upKey) && this.y - PADDLE_MOVE_SPEED >= 0) {
			this.y -= PADDLE_MOVE_SPEED;
		} else if (keys.has(this.downKey) && this.y + PADDLE_HEIGHT + PADDLE_MOVE_SPEED <= BOARD_HEIGHT) {
			this.y += PADDLE_MOVE_SPEED;
		}
	}

	checkCollisionWithBall(ballCenterY: number) {
		return (ballCenterY >= this.y - BALL_RADIUS
			&& ballCenterY <= this.y + PADDLE_HEIGHT + BALL_RADIUS);
	}
}