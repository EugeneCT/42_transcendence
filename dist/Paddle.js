export class Paddle {
    // this.x and this.y is the top left corner of the rectangle.
    // goalLine is the right edge of the left paddle, and the left edge of the right paddle
    constructor(goalLine, canvasHeight, upKey, downKey, color, ctx, side) {
        this.height = 100;
        this.width = 20;
        this.x = 0;
        this.moveSpeed = 10;
        this.toMove = 'none';
        if (side === 'left') {
            this.x = goalLine - this.width;
        }
        else if (side === 'right') {
            this.x = goalLine;
        }
        this.y = (canvasHeight - this.height) / 2;
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
        }
        else if (this.toMove === 'down' && this.y + this.height + this.moveSpeed <= this.canvasHeight) {
            this.y += this.moveSpeed;
        }
    }
}
