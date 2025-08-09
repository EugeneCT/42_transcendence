import { PongGameEngine } from './GameEngine.js';
import { AI, Player } from './Paddle.js';

export async function runPongTournament(ctx: CanvasRenderingContext2D, players: string[]) {
	const game = new PongGameEngine(ctx);

	game.paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
	game.paddles.add(new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown'));

	game.start(players[0], players[1]);
	// game.destroy();
}

export async function runPongAI(ctx: CanvasRenderingContext2D, players: string[]) {
	const game = new PongGameEngine(ctx);
	
	game.paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
	game.paddles.add(new AI(ctx, 'yellow', 'right'));

	game.start(players[0], 'AI');
	// game.destroy();
}

export async function runPong2v2(ctx: CanvasRenderingContext2D, players: string[]) {
	const game = new PongGameEngine(ctx);
	
	game.paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
	game.paddles.add(new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown'));
	game.paddles.add(new Player(ctx, 'green', 'left', 'i', 'k'));
	game.paddles.add(new Player(ctx, 'orange', 'right', '5', '2'));

	game.start(`${players[0]} & ${players[1]}`, `${players[2]} & ${players[3]}`)
	// game.destroy();
}