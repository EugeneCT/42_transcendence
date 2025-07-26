/*
1) Show
2) Call gameplay loop
3) Display winner
4) login + 2FA
5) Call backend
*/
import { run as runSnake } from './snake/main.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';
export function selectGame(mode) {
    if (mode === 'pong') {
        const canvas = document.getElementById('pongCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = BOARD_WIDTH;
        canvas.height = BOARD_HEIGHT;
        // runPong(ctx);
    }
    if (mode === 'snake') {
        const canvas = document.getElementById('snakeCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = BOARD_WIDTH;
        canvas.height = BOARD_HEIGHT;
        runSnake(ctx);
    }
}
