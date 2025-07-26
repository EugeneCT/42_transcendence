/*
1) Show
2) Call gameplay loop
3) Display winner
4) login + 2FA
5) Call backend
*/
import { run as runPong } from './pong/main.js';
import { run as runSnake } from './snake/main.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';
export function selectGame(game, mode) {
    if (game === 'pong') {
        const canvas = document.getElementById('pongCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = BOARD_WIDTH;
        canvas.height = BOARD_HEIGHT;
        let result = runPong(ctx, mode);
        console.log(`${result} wins`);
    }
    if (game === 'snake') {
        const canvas = document.getElementById('snakeCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = BOARD_WIDTH;
        canvas.height = BOARD_HEIGHT;
        runSnake(ctx);
    }
}
