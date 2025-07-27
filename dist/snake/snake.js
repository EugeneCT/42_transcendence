import { TILE_SIZE } from './settings.js';
export class Snake {
    constructor(ctx, tileX, tileY, direction, upKey, downKey, leftKey, rightKey, color) {
        this.ctx = ctx;
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
        switch (direction) {
            case 'N':
                this.addNewBody(ctx, tileX, tileY + 1, 'tail');
                this.addNewBody(ctx, tileX, tileY + 2, 'tail');
                break;
            case 'S':
                this.addNewBody(ctx, tileX, tileY - 1, 'tail');
                this.addNewBody(ctx, tileX, tileY - 2, 'tail');
                break;
            case 'E':
                this.addNewBody(ctx, tileX - 1, tileY, 'tail');
                this.addNewBody(ctx, tileX - 2, tileY, 'tail');
                break;
            case 'W':
                this.addNewBody(ctx, tileX + 1, tileY, 'tail');
                this.addNewBody(ctx, tileX + 2, tileY, 'tail');
                break;
        }
    }
    addNewBody(ctx, tileX, tileY, type) {
        this.body.push(new Body(ctx, tileX, tileY, type));
        this.size++;
    }
    draw() {
        this.body.forEach(body => body.draw(this.color));
    }
    move(keys) {
        // change direction if key is pressed
        if (keys.has(this.upKey)) {
            this.direction = 'N';
        }
        else if (keys.has(this.downKey)) {
            this.direction = 'S';
        }
        else if (keys.has(this.rightKey)) {
            this.direction = 'E';
        }
        else if (keys.has(this.leftKey)) {
            this.direction = 'W';
        }
        // move the body parts from back to front
        for (let i = this.size - 1; i > 0; i--) {
            this.body[i].tileX = this.body[i - 1].tileX;
            this.body[i].tileY = this.body[i - 1].tileY;
        }
        // move head
        switch (this.direction) {
            case 'N':
                this.body[0].tileY--;
                break;
            case 'S':
                this.body[0].tileY++;
                break;
            case 'E':
                this.body[0].tileX++;
                break;
            case 'W':
                this.body[0].tileX--;
                break;
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
