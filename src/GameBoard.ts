export class GameBoard {
	private width: number;
	private height: number;
	private leftGoal: number;
	private rightGoal: number;
	private ctx: CanvasRenderingContext2D;
	leftScore: number = 0;
	rightScore: number = 0;

	constructor(width: number, height: number, leftGoal: number, rightGoal: number, ctx: CanvasRenderingContext2D) {
		this.width = width;
		this.height = height;
		this.leftGoal = leftGoal;
		this.rightGoal = rightGoal;
		this.ctx = ctx;
	}

	private drawVerticalDashLine(x: number) {
		this.ctx.lineWidth = 1;
		this.ctx.strokeStyle = 'grey';
		this.ctx.beginPath();
		// this.ctx.setLineDash([10, 10]);
		this.ctx.moveTo(x, -5);
		this.ctx.lineTo(x, this.height);
		this.ctx.stroke();
	}

	private drawMiddleDashLine() {
		this.ctx.lineWidth = 5;
		this.ctx.strokeStyle = 'grey';
		this.ctx.beginPath();
		this.ctx.setLineDash([30, 30]);
		this.ctx.moveTo(this.width / 2, -15);
		this.ctx.lineTo(this.width / 2, this.height);
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
		this.ctx.fillRect(0, 0, this.width, this.height);

		// lines
		this.drawVerticalDashLine(this.leftGoal);
		this.drawVerticalDashLine(this.rightGoal);
		this.drawMiddleDashLine();

		// scores
		this.drawScore(this.leftScore, this.width / 4);
		this.drawScore(this.rightScore, this.width / 4 * 3);
	}
}
