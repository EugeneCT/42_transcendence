import { BaseBoard, BaseGameEngine } from '../BaseGameEngine.js';
import { BOARD_HEIGHT, BOARD_WIDTH, LEFT_GOAL_X, RIGHT_GOAL_X } from '../settings.js';
import { Ball } from './Ball.js';
import { Paddle } from './Paddle.js';

export class PongGameEngine extends BaseGameEngine {
	paddles: Set<Paddle>;
	ball: Ball;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.board = new PongBoard(ctx);
		this.paddles = new Set<Paddle>();
		this.ball = new Ball(ctx);
	}

	refresh() {
		super.refresh();
		this.paddles.forEach(paddle => paddle.draw());
		this.ball.draw();
	}

	move() {
		this.paddles.forEach(paddle => {paddle.move(this)});
		this.ball.move(this.paddles);
	}

	checkWin() {
		let result = this.ball.checkWin();
		if (result === undefined) {
			return;
		}

		if (result === 'left-win') {
			this.board.leftScore++;
		} else if (result === 'right-win') {
			this.board.rightScore++;
		}
		this.paddles.forEach(paddle => paddle.resetPosition());
		this.ball.resetPosition();
	}
}

export class PongBoard extends BaseBoard {
	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
	}

	private drawVerticalDashLine(x: number) {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = 'grey';
		this.ctx.beginPath();
		this.ctx.moveTo(x, 0);
		this.ctx.lineTo(x, BOARD_HEIGHT);
		this.ctx.stroke();
	}

	private drawMiddleDashLine() {
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = 'grey';
		this.ctx.beginPath();
		this.ctx.setLineDash([30, 30]);
		this.ctx.moveTo(BOARD_WIDTH / 2, -15);
		this.ctx.lineTo(BOARD_WIDTH / 2, BOARD_HEIGHT);
		this.ctx.stroke();
		this.ctx.setLineDash([]);
	}

	drawBlankCanvas() {
		// background
		this.ctx.fillStyle = 'MidnightBlue';
		this.ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

		// lines
		this.drawVerticalDashLine(LEFT_GOAL_X);
		this.drawVerticalDashLine(RIGHT_GOAL_X);
		this.drawMiddleDashLine();

		// scores
		this.drawScores();
	}
}
