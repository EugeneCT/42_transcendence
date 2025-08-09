import { runPong2v2, runPongAI, runPongTournament } from './pong/game.js';
import { BOARD_HEIGHT, BOARD_WIDTH } from './settings.js';
import { runSnakeTournament } from './snake/game.js';

export async function selectGame(
	game: 'snake' | 'pong',
	mode: 'tournament' | 'ai' | '2v2',
	players: string[]
) {
	const getCtx = (canvasId: string): CanvasRenderingContext2D => {
		const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		const ctx = canvas.getContext('2d')!;
		canvas.width = BOARD_WIDTH;
		canvas.height = BOARD_HEIGHT;
		return ctx;
	}

	let winner;
	
	if (game === 'pong') {
		const ctx = getCtx('gameCanvas');
		switch (mode) {
			case 'tournament':
				winner = await runPongTournament(ctx, players);

				// winner = await runSnakeTournament(ctx, players);
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
		const ctx = getCtx('snakeCanvas');
		winner = await runSnakeTournament(ctx, players);
	}

	return winner;
}


