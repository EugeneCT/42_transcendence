import { SnakeGameEngine } from './GameEngine.js';
import { Snake } from './Snake.js';

export async function runSnakeTournament(ctx: CanvasRenderingContext2D, players: string[]) {
	const game = new SnakeGameEngine(ctx);
	
	game.playerA = new Snake(ctx, 2, 3, 'N', 'w', 's', 'a', 'd', 'blue');
	game.playerB = new Snake(ctx, 5, 3, 'N', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'red')

	game.start(players[0], players[1]);
	game.destroy();
}

/*
TODO:
- create fruit
- head marker?
*/