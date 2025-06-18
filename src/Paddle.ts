export class Paddle {
	private height: number = 100;
	private width: number = 20;
	private x: number = 0;
	private y: number;
	private moveSpeed: number = 10;
	private canvasHeight: number;
	private upKey: string;
	private downKey: string;
	private color: string;
	private ctx: CanvasRenderingContext2D;
	toMove: 'up' | 'down' | 'none' = 'none';

	// this.x and this.y is the top left corner of the rectangle.
	// goalLine is the right edge of the left paddle, and the left edge of the right paddle
	constructor(goalLine: number, canvasHeight: number, upKey: string, downKey: string, color: string, ctx: CanvasRenderingContext2D, side: 'left' | 'right') {
		if (side === 'left') {
			this.x = goalLine - this.width;
		} else if (side === 'right') {
			this.x = goalLine;
		}
		this.y = (canvasHeight - this.height)/2;
		this.canvasHeight = canvasHeight;
		this.upKey = upKey;
		this.downKey = downKey;
		this.color = color;
		this.ctx = ctx;
	}

	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	move() {
		if (this.toMove === 'up' && this.y - this.moveSpeed >= 0) {
			this.y -= this.moveSpeed;
		} else if (this.toMove === 'down' && this.y + this.height + this.moveSpeed <= this.canvasHeight) {
			this.y += this.moveSpeed;
		}
	}
}