import { BOARD_WIDTH, BOARD_HEIGHT, LEFT_GOAL_X, RIGHT_GOAL_X, BALL_RADIUS, BALL_START_SPEED, PADDLE_WIDTH } from './settings.js';
const getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
};
export class Ball {
    // ball starts in the center with a random direction
    constructor(ctx) {
        this.ctx = ctx;
        this.centerX = BOARD_WIDTH / 2;
        this.centerY = BOARD_HEIGHT / 2;
        this.color = 'white';
        let angleRadians = getRandomFloat(0, 2 * Math.PI);
        this.speedX = BALL_START_SPEED * Math.cos(angleRadians);
        this.speedY = BALL_START_SPEED * Math.sin(angleRadians);
    }
    resetPosition() {
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
    bounce(players) {
        const nextX = this.centerX + this.speedX;
        const nextY = this.centerY + this.speedY;
        // top & bottom
        if (nextY - BALL_RADIUS <= 0 || nextY + BALL_RADIUS >= BOARD_HEIGHT) {
            this.speedY *= -1;
            this.increaseSpeed();
        }
        const checkPaddleCollision = (side) => {
            return [...players].some(player => player.side === side && player.checkCollisionWithBall(nextY));
        };
        // left
        if (this.speedX < 0
            && nextX - BALL_RADIUS <= LEFT_GOAL_X
            && nextX - BALL_RADIUS >= LEFT_GOAL_X - PADDLE_WIDTH
            && checkPaddleCollision('left')) {
            this.speedX *= -1;
            this.increaseSpeed();
        }
        // right
        if (this.speedX > 0
            && nextX + BALL_RADIUS >= RIGHT_GOAL_X
            && nextX + BALL_RADIUS <= RIGHT_GOAL_X + PADDLE_WIDTH
            && checkPaddleCollision('right')) {
            this.speedX *= -1;
            this.increaseSpeed();
        }
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
    move() {
        this.centerX += this.speedX;
        this.centerY += this.speedY;
    }
    increaseSpeed() {
        this.speedX *= 1.01;
        this.speedY *= 1.01;
    }
}
