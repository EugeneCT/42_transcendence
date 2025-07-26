/*
1) Show
2) Call gameplay loop
3) Display winner
4) login + 2FA
5) Call backend
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { run as runPong } from './pong/main.js';
import { run as runSnake } from './snake/main.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';
export function selectGame(game, mode, players) {
    return __awaiter(this, void 0, void 0, function* () {
        if (game === 'pong') {
            const canvas = document.getElementById('pongCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = BOARD_WIDTH;
            canvas.height = BOARD_HEIGHT;
            let result = yield runPong(ctx, mode, players[0], players[1]);
            console.log(`${result} wins`);
        }
        if (game === 'snake') {
            const canvas = document.getElementById('snakeCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = BOARD_WIDTH;
            canvas.height = BOARD_HEIGHT;
            runSnake(ctx);
        }
    });
}
