import { PongGameEngine } from './GameEngine.js';
import { AI, Player } from './Paddle.js';

export async function runPongTournament(ctx: CanvasRenderingContext2D, players: string[]) {
	const colours = {
		[players[0]]: 'red',
		[players[1]]: 'green',
		[players[2]]: 'orange',
		[players[3]]: 'purple',
	}

	let game = new PongGameEngine(ctx);
	game.paddles.add(new Player(ctx, colours[players[0]], 'left', 'w', 's'));
	game.paddles.add(new Player(ctx, colours[players[1]], 'right', 'arrowup', 'arrowdown'));
	const roundOneWinner = await game.start(players[0], players[1]);

	game = new PongGameEngine(ctx);
	game.paddles.add(new Player(ctx, colours[players[2]], 'left', 'w', 's'));
	game.paddles.add(new Player(ctx, colours[players[3]], 'right', 'arrowup', 'arrowdown'));
	const roundTwoWinner = await game.start(players[2], players[3]);
	
	game = new PongGameEngine(ctx);
	game.paddles.add(new Player(ctx, colours[roundOneWinner], 'left', 'w', 's'));
	game.paddles.add(new Player(ctx, colours[roundTwoWinner], 'right', 'arrowup', 'arrowdown'));
	const finalWinner = await game.start(roundOneWinner, roundTwoWinner);
	
	return finalWinner;
}

export async function runPongAI(ctx: CanvasRenderingContext2D, players: string[]) {
	const colours = {
		[players[0]]: 'red',
		'AI': 'green',
	}

	const game = new PongGameEngine(ctx);
	game.paddles.add(new Player(ctx, colours[players[0]], 'left', 'w', 's'));
	game.paddles.add(new AI(ctx, colours['AI'], 'right'));
	return await game.start(players[0], 'AI');
}

export async function runPong2v2(ctx: CanvasRenderingContext2D, players: string[]) {
	const colours = {
		[players[0]]: 'red',
		[players[1]]: 'green',
		[players[2]]: 'orange',
		[players[3]]: 'purple',
	}
	const game = new PongGameEngine(ctx);
	game.paddles.add(new Player(ctx, colours[players[0]], 'left', 'w', 's'));
	game.paddles.add(new Player(ctx, colours[players[1]], 'right', 'arrowup', 'arrowdown'));
	game.paddles.add(new Player(ctx, colours[players[2]], 'left', 'i', 'k'));
	game.paddles.add(new Player(ctx, colours[players[3]], 'right', '5', '2'));
	return await game.start(`${players[0]} & ${players[1]}`, `${players[2]} & ${players[3]}`)
}