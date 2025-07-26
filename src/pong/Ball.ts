import { BOARD_WIDTH, BOARD_HEIGHT, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS, BALL_START_SPEED, BALL_MAX_SPEED, PADDLE_WIDTH } from '../settings.js';
import { Paddle } from './Paddle.js';

export class Ball {
	public centerX: number = 0;
	public centerY: number = 0;
	public speedX: number = 0;
	public speedY: number = 0;
	private color: string = 'white';

	constructor(private ctx: CanvasRenderingContext2D) {
		this.resetPosition();
	}
	
	// ball starts in the center with a random direction
	resetPosition() {
		const getRandomFloat = (min: number, max: number) => {
			return Math.random() * (max - min) + min;
		};
		this.centerX = BOARD_WIDTH/2;
		this.centerY = BOARD_HEIGHT/2;
		let angleRadians = getRandomFloat(-Math.PI / 4, Math.PI / 4);
		let direction = getRandomFloat(-1, 1) <= 0 ? -1 : 1;
		this.speedX = BALL_START_SPEED * Math.cos(angleRadians) * direction;
		this.speedY = BALL_START_SPEED * Math.sin(angleRadians);
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.centerX, this.centerY, BALL_RADIUS, 0, 2 * Math.PI);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}

	move(players: Set<Paddle>) {
		const nextX = this.centerX + this.speedX;
		const nextY = this.centerY + this.speedY;

		const checkPaddleCollision = (side: 'left' | 'right') => {
			return [...players].some(
				player => player.side === side && player.checkCollisionWithBall(nextY)
			);
		};

		// bounce top & bottom
		if (nextY - BALL_RADIUS <= 0 || nextY + BALL_RADIUS >= BOARD_HEIGHT) {
			this.speedY *= -1;
			this.increaseSpeed();
		}

		// bounce left
		if (this.speedX < 0 
			&& nextX - BALL_RADIUS <= LEFT_GOAL_X
			&& nextX - BALL_RADIUS >= LEFT_GOAL_X - PADDLE_WIDTH
			&& checkPaddleCollision('left')
		) {
			this.speedX *= -1;
			this.increaseSpeed();
		}
		
		// bounce right
		if (this.speedX > 0
			&& nextX + BALL_RADIUS >= RIGHT_GOAL_X
			&& nextX + BALL_RADIUS <= RIGHT_GOAL_X + PADDLE_WIDTH
			&& checkPaddleCollision('right')
		) {
			this.speedX *= -1;
			this.increaseSpeed();
		}

		// move
		this.centerX += this.speedX;
		this.centerY += this.speedY;
	}

	private increaseSpeed() {
		this.speedX = Math.min(BALL_MAX_SPEED, this.speedX * 1.01);
		this.speedY = Math.min(BALL_MAX_SPEED, this.speedY * 1.01);
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
}
