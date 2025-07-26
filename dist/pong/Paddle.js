import { BOARD_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_MOVE_SPEED, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS } from '../settings.js';
export class Paddle {
    constructor(ctx, color, side) {
        this.ctx = ctx;
        this.color = color;
        this.side = side;
        this.x = 0;
        this.y = 0;
        this.resetPosition();
    }
    // this.x and this.y is the top left corner of the rectangle.
    // goalLine is the right edge of the left paddle, and the left edge of the right paddle
    resetPosition() {
        if (this.side === 'left') {
            this.x = LEFT_GOAL_X - PADDLE_WIDTH;
        }
        else {
            this.x = RIGHT_GOAL_X;
        }
        this.y = (BOARD_HEIGHT - PADDLE_HEIGHT) / 2;
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    }
    moveUp() {
        if (this.y - PADDLE_MOVE_SPEED >= 0) {
            this.y -= PADDLE_MOVE_SPEED;
        }
    }
    moveDown() {
        if (this.y + PADDLE_HEIGHT + PADDLE_MOVE_SPEED <= BOARD_HEIGHT) {
            this.y += PADDLE_MOVE_SPEED;
        }
    }
    checkCollisionWithBall(ballCenterY) {
        return (ballCenterY >= this.y - BALL_RADIUS
            && ballCenterY <= this.y + PADDLE_HEIGHT + BALL_RADIUS);
    }
}
export class Player extends Paddle {
    constructor(ctx, color, side, upKey, downKey) {
        super(ctx, color, side);
        this.upKey = upKey;
        this.downKey = downKey;
    }
    move(keys) {
        if (keys.has(this.upKey)) {
            this.moveUp();
        }
        else if (keys.has(this.downKey)) {
            this.moveDown();
        }
    }
}
export class AI extends Paddle {
    constructor(ctx, color, side) {
        super(ctx, color, side);
        this.lastUpdateTime = 0;
        this.projectedY = 0;
        this.refreshTimeMs = 1000;
    }
    resetPosition() {
        this.lastUpdateTime = 0;
        super.resetPosition();
    }
    calculateProjectedY(ballCenterX, ballCenterY, ballSpeedX, ballSpeedY) {
        let projectedX = 0;
        if ((ballSpeedX > 0 && this.side === 'right') || (ballSpeedX < 0 && this.side === 'left')) {
            // ball is going towards the paddle
            projectedX = (ballSpeedX > 0) ? RIGHT_GOAL_X : LEFT_GOAL_X;
        }
        else {
            // assume ball will bounce off the opposite paddle
            projectedX = (ballSpeedX > 0) ? RIGHT_GOAL_X + (RIGHT_GOAL_X - LEFT_GOAL_X) : LEFT_GOAL_X - (RIGHT_GOAL_X - LEFT_GOAL_X);
        }
        let timeToGoal = (projectedX - ballCenterX) / ballSpeedX;
        let rawProjectedY = timeToGoal * ballSpeedY + ballCenterY;
        // correct for ball bouncing off top / bottom
        while (!(0 <= rawProjectedY && rawProjectedY < BOARD_HEIGHT)) {
            if (rawProjectedY >= BOARD_HEIGHT) {
                // bounce off bottom, reflect up
                rawProjectedY = 2 * ballCenterY - rawProjectedY + 2 * (BOARD_HEIGHT - ballCenterY);
            }
            else {
                // bounce off top, reflect down
                rawProjectedY = 2 * ballCenterY - rawProjectedY - 2 * (ballCenterY);
            }
        }
        return rawProjectedY;
    }
    move(ballCenterX, ballCenterY, ballSpeedX, ballSpeedY) {
        let currentTime = Date.now();
        if (this.lastUpdateTime === 0 || currentTime >= this.lastUpdateTime + this.refreshTimeMs) {
            this.projectedY = this.calculateProjectedY(ballCenterX, ballCenterY, ballSpeedX, ballSpeedY);
            this.lastUpdateTime = currentTime;
        }
        if (this.projectedY > this.y && this.projectedY < this.y + PADDLE_HEIGHT) {
            // do nothing
        }
        else if (this.y >= this.projectedY) {
            this.moveUp();
        }
        else {
            this.moveDown();
        }
    }
}
