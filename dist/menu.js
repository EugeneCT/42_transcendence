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
import { runPong2v2, runPongAI, runPongTournament } from './pong/game.js';
import { BOARD_HEIGHT, BOARD_WIDTH } from './settings.js';
import { runSnakeTournament } from './snake/game.js';
/*
if tournament:
    players = [player1, player2, player3, player4]
if ai:
    players = [player1]
if 2v2:
    players = [player1, player2, player3, player4]
*/
export function selectGame(game, mode, players) {
    return __awaiter(this, void 0, void 0, function* () {
        let winner;
        if (game === 'pong') {
            const ctx = getCtx('pongCanvas');
            switch (mode) {
                case 'tournament':
                    winner = yield runPongTournament(ctx, players);
                    break;
                case 'ai':
                    winner = yield runPongAI(ctx, players);
                    break;
                case '2v2':
                    winner = yield runPong2v2(ctx, players);
                    break;
            }
        }
        if (game === 'snake') {
            const ctx = getCtx('snakeCanvase');
            winner = yield runSnakeTournament(ctx, players);
        }
        console.log(`${winner} wins`);
    });
}
function getCtx(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    canvas.width = BOARD_WIDTH;
    canvas.height = BOARD_HEIGHT;
    return ctx;
}
