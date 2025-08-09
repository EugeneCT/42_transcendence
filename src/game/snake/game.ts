import { SnakeGameEngine } from './GameEngine.js';
import { SnakeA, SnakeB } from './Snake.js';

export async function runSnakeTournament(ctx: CanvasRenderingContext2D, players: string[]) {
	const colours = {
		[players[0]]: 'red',
		[players[1]]: 'green',
		[players[2]]: 'orange',
		[players[3]]: 'purple',
	}
	
	console.log("here");
	let game = new SnakeGameEngine(ctx);
	game.playerA = new SnakeA(ctx, colours[players[0]]);
	game.playerB = new SnakeB(ctx, colours[players[1]])
	const roundOneWinner = await game.start(players[0], players[1]);
	
	game = new SnakeGameEngine(ctx);
	game.playerA = new SnakeA(ctx, colours[players[2]]);
	game.playerB = new SnakeB(ctx, colours[players[3]])
	const roundTwoWinner = await game.start(players[2], players[3]);
	
	game = new SnakeGameEngine(ctx);
	game.playerA = new SnakeA(ctx, colours[roundOneWinner]);
	game.playerB = new SnakeB(ctx, colours[roundTwoWinner]);
	const finalWinner = await game.start(roundOneWinner, roundTwoWinner);
	return finalWinner;
}