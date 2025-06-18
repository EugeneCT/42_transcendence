export class Ball {
    // init the ball with the center x and y
    constructor(centerX, centerY, ctx) {
        this.radius = 10;
        this.moveSpeed = 10;
        this.color = 'white';
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
