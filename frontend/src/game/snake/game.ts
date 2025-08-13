import { SnakeGameEngine } from './GameEngine.js';
import { SnakeA, SnakeB } from './Snake.js';

export async function runSnakeTournament(ctx: CanvasRenderingContext2D, players: string[]) {
	const colours = {
		[players[0]]: 'red',
		[players[1]]: 'yellow',
		[players[2]]: 'orange',
		[players[3]]: 'purple',
	}
	
	let game;

	let roundOneWinner = '';
	do {
		game = new SnakeGameEngine(ctx);
		game.playerA = new SnakeA(ctx, colours[players[0]]);
		game.playerB = new SnakeB(ctx, colours[players[1]]);
		roundOneWinner = await game.start(players[0], players[1]);
	} while (roundOneWinner === '');
	
	let roundTwoWinner = '';
	do {
		game = new SnakeGameEngine(ctx);
		game.playerA = new SnakeA(ctx, colours[players[2]]);
		game.playerB = new SnakeB(ctx, colours[players[3]]);
		roundTwoWinner = await game.start(players[2], players[3]);
	} while (roundTwoWinner === '');

	
	let finalWinner;
	do {
		game = new SnakeGameEngine(ctx);
		game.playerA = new SnakeA(ctx, colours[roundOneWinner]);
		game.playerB = new SnakeB(ctx, colours[roundTwoWinner]);
		finalWinner = await game.start(roundOneWinner, roundTwoWinner);
	} while (finalWinner === '');
	
	return finalWinner;
}