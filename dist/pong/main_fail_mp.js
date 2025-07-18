// import { Player, AI } from './Paddle.js';
// import { Ball } from './Ball.js';
// import { Board } from './Board.js';
// import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';

// const canvas = document.getElementById('gameCanvas');
// canvas.width = BOARD_WIDTH;
// canvas.height = BOARD_HEIGHT;
// const ctx = canvas.getContext('2d');
// const socket = io();

// let playerNumber = null;
// let keys = new Set();
// let board = new Board(ctx);
// let ball = new Ball(ctx);
// let leftPaddle;
// let rightPaddle;

// // Add game state tracking
// let gameStarted = false;
// let lastSyncTime = 0;
// const SYNC_INTERVAL = 16; // ~60 FPS

// document.addEventListener('keydown', (event) => keys.add(event.key));
// document.addEventListener('keyup', (event) => keys.delete(event.key));

// socket.on('playerNumber', (num) => {
//     playerNumber = num;
//     if (num === 1) {
//         leftPaddle = new Player(ctx, 'red', 'left', 'w', 's');
//         rightPaddle = new AI(ctx, 'orange', 'right');
//     } else if (num === 2) {
//         leftPaddle = new AI(ctx, 'green', 'left');
//         rightPaddle = new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown');
//     }
//     console.log(`Player ${num} initialized`);
// });

// socket.on('startGame', () => {
//     console.log("Both players connected, starting game.");
//     gameStarted = true;
//     gameLoop();
// });

// socket.on('syncPaddle', (data) => {
//     // Fixed: Actually call the method and properly sync position
//     if (data.side === 'left' && leftPaddle && !(leftPaddle instanceof AI)) {
//         leftPaddle.y = data.y;
//     }
//     if (data.side === 'right' && rightPaddle && !(rightPaddle instanceof AI)) {
//         rightPaddle.y = data.y;
//     }
// });

// socket.on('syncBall', (data) => {
//     // Add validation to prevent erratic ball behavior
//     if (data.x >= 0 && data.x <= BOARD_WIDTH && data.y >= 0 && data.y <= BOARD_HEIGHT) {
//         ball.centerX = data.x;
//         ball.centerY = data.y;
//         ball.speedX = data.dx;
//         ball.speedY = data.dy;
//     }
// });

// socket.on('gameReset', (data) => {
//     // Handle game reset from server
//     board.leftScore = data.leftScore;
//     board.rightScore = data.rightScore;
//     leftPaddle.resetPosition();
//     rightPaddle.resetPosition();
//     ball.resetPosition();
// });

// socket.on('playerDisconnected', () => {
//     gameStarted = false;
//     alert("Opponent disconnected.");
// });

// socket.on('disconnect', () => {
//     gameStarted = false;
//     console.log("Disconnected from server");
// });

// function gameLoop() {
//     if (!gameStarted || !leftPaddle || !rightPaddle) {
//         return;
//     }

//     ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
//     board.drawBlankCanvas();

//     const currentTime = Date.now();
//     const shouldSync = currentTime - lastSyncTime > SYNC_INTERVAL;

//     // Paddle movement and synchronization
//     if (leftPaddle instanceof Player) {
//         leftPaddle.move(keys);
//         if (shouldSync) {
//             socket.emit('syncPaddle', { 
//                 side: 'left', 
//                 y: leftPaddle.getY() // Fixed: Actually call the getter method
//             });
//         }
//     } else if (leftPaddle instanceof AI) {
//         // AI paddle movement (if needed)
//         leftPaddle.move(ball);
//     }

//     if (rightPaddle instanceof Player) {
//         rightPaddle.move(keys);
//         if (shouldSync) {
//             socket.emit('syncPaddle', { 
//                 side: 'right', 
//                 y: rightPaddle.getY() // Fixed: Actually call the getter method
//             });
//         }
//     } else if (rightPaddle instanceof AI) {
//         // AI paddle movement (if needed)
//         rightPaddle.move(ball);
//     }

//     // Draw paddles
//     leftPaddle.draw();
//     rightPaddle.draw();
//     ball.draw();

//     // Ball logic: Only Player 1 controls ball physics
//     if (playerNumber === 1) {
//         // Create paddles array for collision detection
//         const paddles = [leftPaddle, rightPaddle];
//         ball.move(paddles);
        
//         if (shouldSync) {
//             socket.emit('syncBall', {
//                 x: ball.centerX,
//                 y: ball.centerY,
//                 dx: ball.speedX,
//                 dy: ball.speedY,
//             });
//         }

//         // Victory check and scoring
//         let result = ball.checkVictory();
//         if (result !== undefined) {
//             let gameResetData = {
//                 leftScore: board.leftScore,
//                 rightScore: board.rightScore
//             };

//             if (result === 'left-win') {
//                 board.leftScore++;
//                 gameResetData.leftScore = board.leftScore;
//             } else if (result === 'right-win') {
//                 board.rightScore++;
//                 gameResetData.rightScore = board.rightScore;
//             }

//             // Reset positions
//             leftPaddle.resetPosition();
//             rightPaddle.resetPosition();
//             ball.resetPosition();

//             // Sync reset with other player
//             socket.emit('gameReset', gameResetData);
//         }
//     }

//     if (shouldSync) {
//         lastSyncTime = currentTime;
//     }

//     // Draw score
//     board.drawScore();

//     requestAnimationFrame(gameLoop);
// }

// // Handle page visibility changes to pause/resume game
// document.addEventListener('visibilitychange', () => {
//     if (document.hidden) {
//         gameStarted = false;
//     } else if (playerNumber !== null) {
//         gameStarted = true;
//     }
// });

// // Error handling for socket connection
// socket.on('connect_error', (error) => {
//     console.error('Connection error:', error);
// });

// /*
// FIXES APPLIED:
// 1. Fixed syncPaddle event - was calling resetPosition instead of setting y position
// 2. Fixed getter method calls - added parentheses to getY()
// 3. Added proper game state management with gameStarted flag
// 4. Added throttling for network sync to prevent overwhelming the server
// 5. Added validation for ball position sync
// 6. Added proper AI paddle movement
// 7. Added gameReset event handling for score synchronization
// 8. Added error handling and connection management
// 9. Added page visibility handling
// 10. Fixed ball collision detection by passing array instead of Set

// REMAINING CONSIDERATIONS:
// - Ball collision detection improvement: Consider implementing a collision zone
//   system where the ball bounces within a specific x-range of the paddle
// - Add interpolation for smoother remote player movement
// - Consider adding lag compensation for better multiplayer experience
// - Add reconnection logic for dropped connections
// */
import { Player, AI } from './Paddle.js';
import { Ball } from './Ball.js';
import { Board } from './Board.js';
import { BOARD_WIDTH, BOARD_HEIGHT } from './settings.js';

const canvas = document.getElementById('gameCanvas');
canvas.width = BOARD_WIDTH;
canvas.height = BOARD_HEIGHT;
const ctx = canvas.getContext('2d');
const socket = io();

let playerNumber = null;
let keys = new Set();
let board = new Board(ctx);
let ball = new Ball(ctx);
let leftPaddle;
let rightPaddle;
let gameStarted = false;
let animationId = null;
let lastSyncTime = 0;
const SYNC_INTERVAL = 16;

console.log('Game initialized');

document.addEventListener('keydown', (event) => keys.add(event.key));
document.addEventListener('keyup', (event) => keys.delete(event.key));

socket.on('playerNumber', (num) => {
    console.log(`Player ${num} connected`);
    playerNumber = num;
    
    if (num === 1) {
        leftPaddle = new Player(ctx, 'red', 'left', 'w', 's');
        rightPaddle = new AI(ctx, 'orange', 'right');
    } else if (num === 2) {
        leftPaddle = new AI(ctx, 'green', 'left');
        rightPaddle = new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown');
    }
    
    console.log('Paddles created:', !!leftPaddle, !!rightPaddle);
    startGame();
});

socket.on('startGame', () => {
    console.log("Both players connected");
    gameStarted = true;
});

socket.on('syncPaddle', (data) => {
    if (data.side === 'left' && leftPaddle && !(leftPaddle instanceof AI)) {
        leftPaddle.y = data.y;
    }
    if (data.side === 'right' && rightPaddle && !(rightPaddle instanceof AI)) {
        rightPaddle.y = data.y;
    }
});

socket.on('syncBall', (data) => {
    if (data.x >= 0 && data.x <= BOARD_WIDTH && data.y >= 0 && data.y <= BOARD_HEIGHT) {
        ball.centerX = data.x;
        ball.centerY = data.y;
        ball.speedX = data.dx;
        ball.speedY = data.dy;
    }
});

socket.on('playerDisconnected', () => {
    stopGame();
    alert("Opponent disconnected.");
});

function startGame() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    gameStarted = true;
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
    if (!gameStarted) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
    
    // Draw board
    board.drawBlankCanvas();
    
    // Check if objects exist
    if (!leftPaddle || !rightPaddle) {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Waiting for connection...', BOARD_WIDTH/2 - 100, BOARD_HEIGHT/2);
        animationId = requestAnimationFrame(gameLoop);
        return;
    }
    
    const currentTime = Date.now();
    const shouldSync = currentTime - lastSyncTime > SYNC_INTERVAL;

    // Handle paddle movement
    if (leftPaddle instanceof Player) {
        leftPaddle.move(keys);
        if (shouldSync && typeof leftPaddle.getY === 'function') {
            socket.emit('syncPaddle', { side: 'left', y: leftPaddle.getY() });
        }
    } else if (leftPaddle instanceof AI) {
        leftPaddle.move(ball);
    }

    if (rightPaddle instanceof Player) {
        rightPaddle.move(keys);
        if (shouldSync && typeof rightPaddle.getY === 'function') {
            socket.emit('syncPaddle', { side: 'right', y: rightPaddle.getY() });
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
        // Fallback drawing
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
                socket.emit('syncBall', {
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

// Test mode for offline testing
setTimeout(() => {
    if (!playerNumber) {
        console.log('Starting offline test mode...');
        playerNumber = 1;
        try {
            leftPaddle = new Player(ctx, 'red', 'left', 'w', 's');
            rightPaddle = new AI(ctx, 'orange', 'right');
            startGame();
        } catch (error) {
            console.error('Test mode error:', error);
        }
    }
}, 1000);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopGame();
});

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopGame();
    } else if (playerNumber !== null) {
        startGame();
    }
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});