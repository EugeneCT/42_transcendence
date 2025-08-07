import { TILE_SIZE, TILES_X, TILES_Y } from '../settings.js';
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
        this.bodies = new Array;
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
        this.bodies.push(new Body(ctx, tileX, tileY, type));
        this.size++;
    }
    draw() {
        this.bodies.forEach(body => body.draw(this.color));
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
            this.bodies[i].tileX = this.bodies[i - 1].tileX;
            this.bodies[i].tileY = this.bodies[i - 1].tileY;
        }
        // move head
        switch (this.direction) {
            case 'N':
                this.bodies[0].tileY--;
                break;
            case 'S':
                this.bodies[0].tileY++;
                break;
            case 'E':
                this.bodies[0].tileX++;
                break;
            case 'W':
                this.bodies[0].tileX--;
                break;
        }
    }
    detectCollision(opponent) {
        // check for wall
        if (this.bodies[0].tileX < 0
            || this.bodies[0].tileX >= TILES_X
            || this.bodies[0].tileY < 0
            || this.bodies[0].tileY >= TILES_Y) {
            return true;
        }
        // check for own body
        if ([...this.bodies].some(body => body.type == 'tail' && body.tileX == this.tileX && body.tileY == this.tileY)) {
            return true;
        }
        // check for opponent head + body
        if ([...opponent.bodies].some(body => body.tileX == this.tileX && body.tileY == this.tileY)) {
            return true;
        }
        return false;
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
}
