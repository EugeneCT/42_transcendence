export class Ball {
	radius: number = 10;
	centerX: number;
	centerY: number;
	moveSpeed: number = 10;
	color: string = 'white';
	ctx: CanvasRenderingContext2D;

	// init the ball with the center x and y
	constructor(centerX: number, centerY: number, ctx: CanvasRenderingContext2D) {
		this.centerX = centerX;
		this.centerY = centerY;
		this.ctx = ctx;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
	}
}