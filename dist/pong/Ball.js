import { BOARD_WIDTH, BOARD_HEIGHT, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS, BALL_START_SPEED, PADDLE_WIDTH } from './settings.js';
export class Ball {
    constructor(ctx) {
        this.ctx = ctx;
        this.centerX = 0;
        this.centerY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.color = 'white';
        this.resetPosition();
    }
    // ball starts in the center with a random direction
    resetPosition() {
        const getRandomFloat = (min, max) => {
            return Math.random() * (max - min) + min;
        };
        this.centerX = BOARD_WIDTH / 2;
        this.centerY = BOARD_HEIGHT / 2;
        let angleRadians = getRandomFloat(0, 2 * Math.PI);
        this.speedX = BALL_START_SPEED * Math.cos(angleRadians);
        this.speedY = BALL_START_SPEED * Math.sin(angleRadians);
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, BALL_RADIUS, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
    move(players) {
        const nextX = this.centerX + this.speedX;
        const nextY = this.centerY + this.speedY;
        const checkPaddleCollision = (side) => {
            return [...players].some(player => player.side === side && player.checkCollisionWithBall(nextY));
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
            && checkPaddleCollision('left')) {
            this.speedX *= -1;
            this.increaseSpeed();
        }
        // bounce right
        if (this.speedX > 0
            && nextX + BALL_RADIUS >= RIGHT_GOAL_X
            && nextX + BALL_RADIUS <= RIGHT_GOAL_X + PADDLE_WIDTH
            && checkPaddleCollision('right')) {
            this.speedX *= -1;
            this.increaseSpeed();
        }
        // move
        this.centerX += this.speedX;
        this.centerY += this.speedY;
    }
    increaseSpeed() {
        this.speedX *= 1.01;
        this.speedY *= 1.01;
    }
    checkVictory() {
        if (this.centerX + BALL_RADIUS < 0) {
            return 'right-win';
        }
        else if (this.centerX - BALL_RADIUS > BOARD_WIDTH) {
            return 'left-win';
        }
        else {
            return undefined;
        }
    }
}
