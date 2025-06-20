import { TILE_SIZE } from './settings.js';
export class Snake {
    constructor(ctx, tileX, tileY, direction, upKey, downKey, leftKey, rightKey, color) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.direction = direction;
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.color = color;
        this.body = new Array;
        this.size = 0;
        this.addNewBody(ctx, tileX, tileY, 'head');
        this.addNewBody(ctx, tileX, tileY + 1, 'tail');
        this.addNewBody(ctx, tileX, tileY + 2, 'tail');
    }
    addNewBody(ctx, tileX, tileY, type) {
        this.body.push(new Body(ctx, tileX, tileY, type));
        this.size++;
    }
    draw() {
        this.body.forEach(body => body.draw(this.color));
    }
    move(keys) {
        // move the body parts from back to front
        for (let i = this.size - 1; i > 0; i--) {
            this.body[i].tileX = this.body[i - 1].tileX;
            this.body[i].tileY = this.body[i - 1].tileY;
        }
        // move head
        if (keys.has(this.upKey)) {
            this.body[0].tileY--;
        }
        else if (keys.has(this.downKey)) {
            this.body[0].tileY++;
        }
        else if (keys.has(this.leftKey)) {
            this.body[0].tileX--;
        }
        else if (keys.has(this.rightKey)) {
            console.log('right');
            this.body[0].tileX++;
        }
    }
}
class Body {
    constructor(ctx, tileX, tileY, type) {
        this.ctx = ctx;
        this.tileX = tileX;
        this.tileY = tileY;
        this.type = type;
    }
    draw(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(this.tileX * TILE_SIZE, this.tileY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    ;
}
