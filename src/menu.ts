/*
1) Show 
2) Call gameplay loop
3) Display winner
4) login + 2FA
5) Call backend
*/

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
export async function selectGame(
	game: 'snake' | 'pong',
	mode: 'tournament' | 'ai' | '2v2',
	players: string[]
) {
	let winner;
	if (game === 'pong') {
		// const ctx = getCtx('pongCanvas');
		const ctx = getCtx('gameCanvas');
		switch (mode) {
			case 'tournament':
				winner = await runPongTournament(ctx, players);
				break;
			case 'ai':
				winner = await runPongAI(ctx, players);
				break;
			case '2v2':
				winner = await runPong2v2(ctx, players);
				break;
		}
	}
	if (game === 'snake') {
		const ctx = getCtx('snakeCanvase');
		winner = await runSnakeTournament(ctx, players);
	}
	console.log(`${winner} wins`);
}

function getCtx(canvasId: string): CanvasRenderingContext2D {
	const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
	const ctx = canvas.getContext('2d')!;
	canvas.width = BOARD_WIDTH;
	canvas.height = BOARD_HEIGHT;
	return ctx;
}
