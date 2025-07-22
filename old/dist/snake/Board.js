import { BOARD_WIDTH, TILE_SIZE, TILES_X, TILES_Y } from './settings.js';
export class Board {
    constructor(ctx) {
        this.ctx = ctx;
        this.leftScore = 0;
        this.rightScore = 0;
    }
    drawScore(score, centerX) {
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = "48px trebuchet ms";
        this.ctx.fillText(score.toString(), centerX, 50);
    }
    drawSquare(x, y, colorSwitch) {
        this.ctx.fillStyle = colorSwitch ? 'green' : 'lightGreen';
        this.ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
    drawBlankCanvas() {
        // background
        let y = 0;
        for (let i = 0; i < TILES_Y; i++) {
            let x = 0;
            for (let j = 0; j < TILES_X; j++) {
                const colorSwitch = ((i + j) % 2) === 0;
                this.drawSquare(x, y, colorSwitch);
                x += TILE_SIZE;
            }
            y += TILE_SIZE;
        }
        // scores
        this.drawScore(this.leftScore, BOARD_WIDTH / 4);
        this.drawScore(this.rightScore, BOARD_WIDTH / 4 * 3);
    }
}
