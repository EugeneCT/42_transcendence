import { BOARD_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_MOVE_SPEED, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS } from './settings.js';
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
    }
    // TODO
    move(ballCenterX, ballCenterY) {
        if (ballCenterY < BOARD_HEIGHT / 2) {
            this.moveUp();
        }
        else {
            this.moveDown();
        }
    }
}
