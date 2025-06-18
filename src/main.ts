import { Paddle } from './Paddle.js';
import { Ball } from './Ball.js';
import { GameBoard } from './GameBoard.js';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
canvas.width = 800;
canvas.height = 600;

const ctx = canvas.getContext('2d')!;

// define the left and right goals. Game over if ball passes this line.
const leftGoal = 50;
const rightGoal = canvas.width - 50;

let board = new GameBoard(canvas.width, canvas.height, leftGoal, rightGoal, ctx);
board.drawBlankCanvas()

let player1 = new Paddle(leftGoal, canvas.height, 'w', 's', 'red', ctx, 'left');
let player2 = new Paddle(rightGoal, canvas.height, 'ArrowUp', 'ArrowDown', 'yellow', ctx, 'right');
let ball = new Ball(canvas.width/2, canvas.height/2, ctx);

document.addEventListener('keydown', (event: KeyboardEvent) => {
	switch (event.key) {
		case 'w':
			player1.toMove = 'up';
			break;
		case 's':
			player1.toMove = 'down';
			break;
		case 'ArrowUp':
			player2.toMove = 'up';
			break;
		case 'ArrowDown':
			player2.toMove = 'down';
			break;
	}
});

document.addEventListener('keyup', (event: KeyboardEvent) => {
	switch (event.key) {
		case 'w':
			player1.toMove = 'none';
			break;
		case 's':
			player1.toMove = 'none';
			break;
		case 'ArrowUp':
			player2.toMove = 'none';
			break;
		case 'ArrowDown':
			player2.toMove = 'none';
			break;
	}
});


let isGameRunning = true;
function gameLoop() {
	if (!isGameRunning) return;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	board.drawBlankCanvas();
	player1.draw();
	player2.draw();
	ball.draw();
	
	player1.move();
	player2.move();

	requestAnimationFrame(gameLoop);
}

gameLoop();



/*
1) draw blank screen
2) move paddle and ball
3) draw paddles and ball
4) detect collision
*/


// const keysPressed = new Set<string>();

// document.addEventListener('keydown', (event: KeyboardEvent) => {
//   keysPressed.add(event.key);
// });

// document.addEventListener('keyup', (event: KeyboardEvent) => {
//   keysPressed.delete(event.key);
// });

// function updatePlayerMovement() {
//   // player 1
//   if (keysPressed.has('w')) {
//     player1.toMove = 'up';
//   } else if (keysPressed.has('s')) {
//     player1.toMove = 'down';
//   } else {
//     player1.toMove = 'none';
//   }

//   // player 2
//   if (keysPressed.has('ArrowUp')) {
//     player2.toMove = 'up';
//   } else if (keysPressed.has('ArrowDown')) {
//     player2.toMove = 'down';
//   } else {
//     player2.toMove = 'none';
//   }
// }
