import { BOARD_WIDTH, BOARD_HEIGHT, LEFT_GOAL_X, RIGHT_GOAL_X } from './settings.js'

export class GameBoard {
	leftScore: number = 0;
	rightScore: number = 0;

	constructor(private ctx: CanvasRenderingContext2D) {}

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

	private drawScore(score: number, centerX: number) {
		this.ctx.fillStyle = 'white';
		this.ctx.textAlign = 'center';
		this.ctx.font = "48px trebuchet ms";
		this.ctx.fillText(score.toString(), centerX, 50);
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
		this.drawScore(this.leftScore, BOARD_WIDTH / 4);
		this.drawScore(this.rightScore, BOARD_WIDTH / 4 * 3);
	}
}
