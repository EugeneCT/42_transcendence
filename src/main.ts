import { Paddle } from './Paddle.js';
import { Ball } from './Ball.js';
import { GameBoard } from './GameBoard.js';
import { BOARD_WIDTH, BOARD_HEIGHT, LEFT_GOAL_X, RIGHT_GOAL_X } from './settings.js';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

const ctx = canvas.getContext('2d')!;

let board = new GameBoard(ctx);

let players = new Set<Paddle>;
players.add(new Paddle(ctx, 'w', 's', 'red', 'left'));
players.add(new Paddle(ctx, 'ArrowUp', 'ArrowDown', 'yellow', 'right'));
// players.add(new Paddle(ctx, 'i', 'k', 'green', 'left');

let ball = new Ball(ctx);

let keys = new Set<string>;
document.addEventListener('keydown', (event: KeyboardEvent) => {
	keys.add(event.key);
});
document.addEventListener('keyup', (event: KeyboardEvent) => {
	keys.delete(event.key);
});

function gameLoop() {
	ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
	board.drawBlankCanvas();
	players.forEach(player => player.draw());
	ball.draw();
	
	players.forEach(player => player.move(keys));
	ball.bounce(players);
	ball.move();
	
	let result = ball.checkVictory();
	if (result !== undefined) {
		if (result === 'left-win') {
			board.leftScore++;
		} else if (result === 'right-win') {
			board.rightScore++;
		}
		players.forEach(player => player.resetPosition());
		ball.resetPosition();
	}

	requestAnimationFrame(gameLoop);
}

gameLoop();


/*
ISSUES:
- ball getting stuck on paddle => ball.checkCollision() does not take into account ball speed
	- define (xMin, xMax) zone where ball will bounce?
*/