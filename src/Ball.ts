import { BOARD_WIDTH, BOARD_HEIGHT, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS, BALL_START_SPEED } from './settings.js';
import { Paddle } from './Paddle.js';

export class Ball {
	centerX: number = BOARD_WIDTH/2;
	centerY: number = BOARD_HEIGHT/2;
	speed: number = BALL_START_SPEED;
	speedX: number;
	speedY: number;
	color: string = 'white';

	// ball starts in the center with a random direction
	constructor(private ctx: CanvasRenderingContext2D) {
		let angleRadians = getRandomFloat(0, 2 * Math.PI);
		this.speedX = this.speed * Math.cos(angleRadians);
		this.speedY = this.speed * Math.sin(angleRadians);
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.centerX, this.centerY, BALL_RADIUS, 0, 2 * Math.PI);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}

	checkCollision(players: Set<Paddle>): 'left-win' | 'right-win' | undefined {
		// top
		if (this.centerY - BALL_RADIUS <= 0) {
			this.speedY *= -1;
		}
		// bottom
		if (this.centerY + BALL_RADIUS >= BOARD_HEIGHT) {
			this.speedY *= -1;
		}

		// left

		// testing buffer of 10 to give more time for ball to bounce off paddle
		if (this.centerX - BALL_RADIUS <= LEFT_GOAL_X + 5) {
			players.forEach(player => {
				if (player.side === 'left' && player.checkCollisionWithBall(this.centerY)) {
					this.speedX *= -1;
					return;
				}
			})
			if (this.centerX < BALL_RADIUS) {
				return 'right-win';
			}
		}

		// right
		if (this.centerX + BALL_RADIUS >= RIGHT_GOAL_X - 5) {
			players.forEach(player => {
				if (player.side === 'right' && player.checkCollisionWithBall(this.centerY)) {
					this.speedX *= -1;
					return;
				}
			})
			if (this.centerX > BOARD_WIDTH - BALL_RADIUS) {
				return 'left-win';
			}
		}
	}

	move() {
		this.centerX += this.speedX;
		this.centerY += this.speedY;
	}
}

function getRandomFloat(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}