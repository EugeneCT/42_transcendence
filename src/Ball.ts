import { BOARD_WIDTH, BOARD_HEIGHT, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS, BALL_START_SPEED, PADDLE_WIDTH } from './settings.js';
import { Paddle } from './Paddle.js';

const getRandomFloat = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

export class Ball {
	private centerX: number = BOARD_WIDTH/2;
	private centerY: number = BOARD_HEIGHT/2;
	private speedX: number;
	private speedY: number;
	private color: string = 'white';

	// ball starts in the center with a random direction
	constructor(private ctx: CanvasRenderingContext2D) {
		let angleRadians = getRandomFloat(0, 2 * Math.PI);
		this.speedX = BALL_START_SPEED * Math.cos(angleRadians);
		this.speedY = BALL_START_SPEED * Math.sin(angleRadians);
	}

	resetPosition() {
		this.centerX = BOARD_WIDTH/2;
		this.centerY = BOARD_HEIGHT/2;
		let angleRadians = getRandomFloat(0, 2 * Math.PI);
		this.speedX = BALL_START_SPEED * Math.cos(angleRadians);
		this.speedY = BALL_START_SPEED * Math.sin(angleRadians);
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.centerX, this.centerY, BALL_RADIUS, 0, 2 * Math.PI);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}

	bounce(players: Set<Paddle>) {
		const nextX = this.centerX + this.speedX;
		const nextY = this.centerY + this.speedY;

		// top & bottom
		if (nextY - BALL_RADIUS <= 0 || nextY + BALL_RADIUS >= BOARD_HEIGHT) {
			this.speedY *= -1;
			this.increaseSpeed();
		}

		const checkPaddleCollision = (side: 'left' | 'right') => {
			return [...players].some(
				player => player.side === side && player.checkCollisionWithBall(nextY)
			);
		};

		// left
		if (this.speedX < 0 
			&& nextX - BALL_RADIUS <= LEFT_GOAL_X
			&& nextX - BALL_RADIUS >= LEFT_GOAL_X - PADDLE_WIDTH
			&& checkPaddleCollision('left')
		) {
			this.speedX *= -1;
			this.increaseSpeed();
		}
		
		// right
		if (this.speedX > 0 
			&& nextX + BALL_RADIUS >= RIGHT_GOAL_X
			&& nextX + BALL_RADIUS <= RIGHT_GOAL_X + PADDLE_WIDTH
			&& checkPaddleCollision('right')
		) {
			this.speedX *= -1;
			this.increaseSpeed();
		}
	}

	checkVictory(): 'left-win' | 'right-win' | undefined {
		if (this.centerX + BALL_RADIUS < 0) {
			return 'right-win';
		} else if (this.centerX - BALL_RADIUS > BOARD_WIDTH) {
			return 'left-win';
		} else {
			return undefined;
		}
	}

	move() {
		this.centerX += this.speedX;
		this.centerY += this.speedY;
	}

	increaseSpeed() {
		this.speedX *= 1.01;
		this.speedY *= 1.01;
	}
}
