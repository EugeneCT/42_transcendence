var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BOARD_HEIGHT, BOARD_WIDTH, MAX_SCORE } from './settings.js';
export class BaseGameEngine {
    constructor(ctx) {
        this.keyDownHandler = (event) => {
            this.keys.add(event.key);
        };
        this.keyUpHandler = (event) => {
            this.keys.delete(event.key);
        };
        this.sleep = (milliseconds) => {
            return new Promise((resolve) => setTimeout(resolve, milliseconds));
        };
        this.ctx = ctx;
        this.keys = new Set;
        document.addEventListener('keydown', this.keyDownHandler);
        document.addEventListener('keyup', this.keyUpHandler);
    }
    destroy() {
        document.removeEventListener('keydown', this.keyDownHandler);
        document.removeEventListener('keyup', this.keyUpHandler);
    }
    refresh() {
        this.ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
        this.board.drawBlankCanvas();
    }
    ;
    countDown() {
        return __awaiter(this, void 0, void 0, function* () {
            const numbers = ['3', '2', '1'];
            let index = 0;
            let fontSize = 20;
            return new Promise(resolve => {
                const animate = () => {
                    this.refresh();
                    fontSize += 3;
                    if (fontSize > 200) {
                        index++;
                        fontSize = 20;
                        if (index >= numbers.length) {
                            resolve();
                            return;
                        }
                    }
                    this.ctx.font = `${fontSize}px trebuchet ms`;
                    this.ctx.fillStyle = 'white';
                    this.ctx.shadowColor = 'black';
                    this.ctx.shadowBlur = 5;
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(numbers[index], BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 50);
                    requestAnimationFrame(animate);
                };
                animate();
            });
        });
    }
    gameLoop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                const loop = () => {
                    this.refresh();
                    this.move();
                    this.checkWin();
                    if (this.board.leftScore === MAX_SCORE) {
                        resolve('left');
                        return;
                    }
                    else if (this.board.rightScore === MAX_SCORE) {
                        resolve('right');
                        return;
                    }
                    requestAnimationFrame(loop);
                };
                loop();
            });
        });
    }
    printWinner(text) {
        return __awaiter(this, void 0, void 0, function* () {
            this.refresh();
            this.ctx.font = `100px trebuchet ms`;
            this.ctx.fillStyle = 'yellow';
            this.ctx.shadowColor = 'black';
            this.ctx.shadowBlur = 5;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${text}`, BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 150);
            this.ctx.fillText('WIN🎉', BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 50);
        });
    }
    start(leftName, rightName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.countDown();
            const winner = ((yield this.gameLoop()) == 'left') ? leftName : rightName;
            yield this.printWinner(winner);
            yield this.sleep(3000);
        });
    }
}
export class BaseBoard {
    constructor(ctx) {
        this.ctx = ctx;
        this.leftScore = 0;
        this.rightScore = 0;
    }
    drawScores() {
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.font = "48px trebuchet ms";
        this.ctx.fillText(this.leftScore.toString(), BOARD_WIDTH / 4, 50);
        this.ctx.fillText(this.rightScore.toString(), BOARD_WIDTH / 4 * 3, 50);
    }
}
