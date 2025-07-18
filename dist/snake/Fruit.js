import { TILE_SIZE } from './settings.js';
export class Fruit {
    constructor(ctx) {
        this.ctx = ctx;
        this.tileX = 0;
        this.tileY = 0;
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min) + min);
        };
        this.tileX = getRandomInt(0, 15);
        this.tileY = getRandomInt(0, 15);
    }
    draw() {
        this.ctx.fillStyle = 'orange';
        this.ctx.fillRect(this.tileX * TILE_SIZE, this.tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
}
