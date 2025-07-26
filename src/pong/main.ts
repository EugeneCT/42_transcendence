import { Paddle, Player, AI } from './Paddle.js';
import { Ball } from './Ball.js';
import { Board } from './Board.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../settings.js';

let ctx: CanvasRenderingContext2D;
let board: Board;
let paddles: Set<Paddle>;
let ball: Ball;
let keys: Set<string>;

// TODO: input gameMode (pvp, ai, multiplayer)
// output winner

export function run(canvasCtx: CanvasRenderingContext2D) {
	ctx = canvasCtx;
	board = new Board(ctx);
	
	// Paddles can be either of class Player or AI
	paddles = new Set<Paddle>;
	paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
	paddles.add(new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown'));
	paddles.add(new AI(ctx, 'green', 'left'));
	paddles.add(new AI(ctx, 'orange', 'right'));
	
	ball = new Ball(ctx);
	
	keys = new Set<string>;
	document.addEventListener('keydown', (event: KeyboardEvent) => {
		keys.add(event.key);
	});
	document.addEventListener('keyup', (event: KeyboardEvent) => {
		keys.delete(event.key);
	});

	gameLoop();
}
	
function gameLoop() {
	ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
	board.drawBlankCanvas();
	paddles.forEach(paddle => paddle.draw());
	ball.draw();
	
	paddles.forEach(paddle => {
		if (paddle instanceof Player) {
			paddle.move(keys);
		} else if (paddle instanceof AI) {
			paddle.move(ball.centerX, ball.centerY, ball.speedX, ball.speedY);
		}
	});
	ball.move(paddles);

	let result = ball.checkVictory();
	if (result !== undefined) {
		if (result === 'left-win') {
			board.leftScore++;
		} else if (result === 'right-win') {
			board.rightScore++;
		}
		paddles.forEach(paddle => paddle.resetPosition());
		ball.resetPosition();
	}

	requestAnimationFrame(gameLoop);
}
