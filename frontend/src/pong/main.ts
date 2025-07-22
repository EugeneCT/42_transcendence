
import { Paddle, Player, AI } from './Paddle.js';
import { Ball } from './Ball.js';
import { Board } from './Board.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';



const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;

const ctx = canvas.getContext('2d')!;
const socket = new WebSocket('ws://localhost:4004/ws');
console.log('socket:', socket);

let playerNumber: number | null = null;
let keys = new Set<string>();

let board = new Board(ctx);
let ball = new Ball(ctx);

let leftPaddle: Paddle;
let rightPaddle: Paddle;


let gameStarted = false;
let animationId = null;
let lastSyncTime = 0;
const SYNC_INTERVAL = 16;

document.addEventListener('keydown', (event: KeyboardEvent) => keys.add(event.key));
document.addEventListener('keyup', (event: KeyboardEvent) => keys.delete(event.key));

// WebSocket event handlers
socket.onopen = () => {
    console.log('Connected to server');
};
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);
    
    switch (message.type) {
        case 'welcome':
            console.log('Server says:', message.data);
            break;
            
        case 'playerNumber':
            playerNumber = message.data;
            console.log(`Assigned as player ${playerNumber}`);
            
            if (playerNumber === 1) {
                leftPaddle = new Player(ctx, 'red', 'left', 'w', 's');
                rightPaddle = new AI(ctx, 'orange', 'right'); // or wait for player 2
                console.log('Player 1 setup complete');
            } else if (playerNumber === 2) {
                leftPaddle = new AI(ctx, 'green', 'left'); // or existing player 1
                rightPaddle = new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown');
                console.log('Player 2 setup complete');
            }
            
            startGame();
            break;
            
        case 'startGame':
            console.log('Game starting!');
            gameStarted = true;
            break;
            
        case 'syncPaddle':
            const paddleData = message.data;
            if (paddleData.side === 'left' && leftPaddle && !(leftPaddle instanceof AI)) {
                leftPaddle.y = paddleData.y;
            }
            if (paddleData.side === 'right' && rightPaddle && !(rightPaddle instanceof AI)) {
                rightPaddle.y = paddleData.y;
            }
            break;
            
        case 'syncBall':
            const ballData = message.data;
            if (ballData.x >= 0 && ballData.x <= BOARD_WIDTH && ballData.y >= 0 && ballData.y <= BOARD_HEIGHT) {
                ball.centerX = ballData.x;
                ball.centerY = ballData.y;
                ball.speedX = ballData.dx;
                ball.speedY = ballData.dy;
            }
            break;
            
        case 'gameReset':
            const resetData = message.data;
            board.leftScore = resetData.leftScore;
            board.rightScore = resetData.rightScore;
            if (leftPaddle) leftPaddle.resetPosition();
            if (rightPaddle) rightPaddle.resetPosition();
            ball.resetPosition();
            break;
            
        case 'playerDisconnected':
            stopGame();
            alert('Opponent disconnected');
            break;
            
        default:
            console.log('Unknown message type:', message.type);
    }
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

socket.onclose = (event) => {
    console.log('Disconnected from server');
	  console.log('🔌 WebSocket closed', event);
	console.log('Code:', event.code);
	console.log('Reason:', event.reason);
	console.log('Was clean?:', event.wasClean);
		stopGame();
};

// Helper function to send messages
function sendMessage(type, data) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type, data }));
    }
}

function startGame() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    gameLoop();
}

function stopGame() {
    gameStarted = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    
    // Draw board
    board.drawBlankCanvas();
    
    // Check if objects exist
    if (!leftPaddle || !rightPaddle) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Waiting for players...', BOARD_WIDTH/2 - 100, BOARD_HEIGHT/2);
        animationId = requestAnimationFrame(gameLoop);
        return;
    }
    
    const currentTime = Date.now();
    const shouldSync = currentTime - lastSyncTime > SYNC_INTERVAL;

    // Handle paddle movement
    if (leftPaddle instanceof Player) {
        leftPaddle.move(keys);
        if (shouldSync && typeof leftPaddle.getY === 'function') {
            sendMessage('syncPaddle', { side: 'left', y: leftPaddle.getY() });
        }
    } else if (leftPaddle instanceof AI) {
        leftPaddle.move(ball);
    }

    if (rightPaddle instanceof Player) {
        rightPaddle.move(keys);
        if (shouldSync && typeof rightPaddle.getY === 'function') {
            sendMessage('syncPaddle', { side: 'right', y: rightPaddle.getY() });
        }
    } else if (rightPaddle instanceof AI) {
        rightPaddle.move(ball);
    }

    // Draw objects
    try {
        leftPaddle.draw();
        rightPaddle.draw();
        ball.draw();
    } catch (error) {
        console.error('Draw error:', error);
        // Fallback drawing for debugging
        ctx.fillStyle = 'red';
        ctx.fillRect(50, BOARD_HEIGHT/2 - 50, 20, 100);
        ctx.fillStyle = 'blue';
        ctx.fillRect(BOARD_WIDTH - 70, BOARD_HEIGHT/2 - 50, 20, 100);
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(BOARD_WIDTH/2, BOARD_HEIGHT/2, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    // Ball physics (only for player 1)
    if (playerNumber === 1) {
        try {
            const paddles = [leftPaddle, rightPaddle];
            ball.move(paddles);
            
            if (shouldSync) {
                sendMessage('syncBall', {
                    x: ball.centerX,
                    y: ball.centerY,
                    dx: ball.speedX,
                    dy: ball.speedY,
                });
            }

            let result = ball.checkVictory();
            if (result !== undefined) {
                if (result === 'left-win') board.leftScore++;
                else if (result === 'right-win') board.rightScore++;
                
                leftPaddle.resetPosition();
                rightPaddle.resetPosition();
                ball.resetPosition();
                
                sendMessage('gameReset', { 
                    leftScore: board.leftScore, 
                    rightScore: board.rightScore 
                });
            }
        } catch (error) {
            console.error('Ball physics error:', error);
        }
    }

    if (shouldSync) {
        lastSyncTime = currentTime;
    }

    // Draw score
    try {
        board.drawScore();
    } catch (error) {
        console.error('Score draw error:', error);
    }

    animationId = requestAnimationFrame(gameLoop);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopGame();
    socket.close();
});

// socket.onmessage('playerNumber', (num: number) => {
// 	playerNumber = num;

// 	if (num === 1) {
// 		leftPaddle = new Player(ctx, 'red', 'left', 'w', 's');
// 		// rightPaddle = new AI(ctx, 'orange', 'right'); // optional AI
// 	} else if (num === 2) {
// 		// leftPaddle = new AI(ctx, 'green', 'left'); // optional AI
// 		rightPaddle = new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown');
// 	}

// 	gameLoop();
// });

// socket.on('startGame', () => {
// 	console.log("Both players connected, starting game.");
// });

// socket.on('syncPaddle', (data: { side: 'left' | 'right'; y: number }) => {
// 	if (data.side === 'left' && leftPaddle instanceof AI === false) {
// 		leftPaddle.resetPosition;
// 	}
// 	if (data.side === 'right' && rightPaddle instanceof AI === false) {
// 		rightPaddle.resetPosition;
// 	}
// });

// // socket.on('syncPaddle', (data: { side: 'left' | 'right'; y: number }) => {
// // 	if (data.side === 'left' && leftPaddle instanceof AI === false) {
// // 		leftPaddle.y = data.y;
// // 	}
// // 	if (data.side === 'right' && rightPaddle instanceof AI === false) {
// // 		rightPaddle.y = data.y;
// // 	}
// // });

// socket.on('syncBall', (data: { x: number; y: number; dx: number; dy: number }) => {
// 	ball.centerX = data.x;
// 	ball.centerY = data.y;
// 	ball.speedX = data.dx;
// 	ball.speedY = data.dy;
// });

// socket.on('playerDisconnected', () => {
// 	alert("Opponent disconnected.");
// });

// function gameLoop() {
// 	ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
// 	board.drawBlankCanvas();

// 	// Paddle movement
// 	if (leftPaddle instanceof Player) {
// 		leftPaddle.move(keys);
// 		socket.emit('syncPaddle', { side: 'left', y: leftPaddle.getY });
// 	}
// 	if (rightPaddle instanceof Player) {
// 		rightPaddle.move(keys);
// 		socket.emit('syncPaddle', { side: 'right', y: rightPaddle.getY });
// 	}

// 	leftPaddle.draw();
// 	rightPaddle.draw();
// 	ball.draw();

// 	// Ball logic: Only Player 1 controls ball
// 	if (playerNumber === 1) {
// 		// ball.move([leftPaddle, rightPaddle]);
// 		ball.move(new Set([leftPaddle, rightPaddle])); // ✅ Set<Paddle>

// 		socket.emit('syncBall', {
// 			x: ball.centerX,
// 			y: ball.centerY,
// 			dx: ball.speedX,
// 			dy: ball.speedY,
// 		});
// 	}

// 	let result = ball.checkVictory();
// 	if (result !== undefined) {
// 		if (result === 'left-win') board.leftScore++;
// 		else if (result === 'right-win') board.rightScore++;

// 		leftPaddle.resetPosition();
// 		rightPaddle.resetPosition();
// 		ball.resetPosition();
// 	}

// 	requestAnimationFrame(gameLoop);
// }

// /*
// ISSUES:
// - ball getting stuck on paddle => ball.checkCollision() does not take into account ball speed
// 	- define (xMin, xMax) zone where ball will bounce?
// */