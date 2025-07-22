import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

interface Player {
  socket: any;
  playerNumber: number;
  id: string;
}

interface GameRoom {
  players: Player[];
  gameStarted: boolean;
}

export async function registerGameSocket(fastify: FastifyInstance) {
  await fastify.register(cors, {
    origin: true, // or true for all origins
    methods: ['GET'],                  // for WS handshake
  });


  const gameRoom: GameRoom = {
    players: [],
    gameStarted: false
  };

  fastify.get('/ws', { websocket: true }, (conn, req) => {
    const playerId = Math.random().toString(36).substr(2, 9);
    console.log(`🔌 Player ${playerId} connected!`);
    
    // Assign player number
    let playerNumber: number;
    if (gameRoom.players.length === 0) {
      playerNumber = 1;
    } else if (gameRoom.players.length === 1) {
      playerNumber = 2;
    } else {
      // Room is full
      conn.socket.send(JSON.stringify({ 
        type: 'error', 
        data: 'Game room is full' 
      }));
      conn.socket.close();
      return;
    }

    // Add player to room
    const player: Player = {
      socket: conn.socket,
      playerNumber,
      id: playerId
    };
    gameRoom.players.push(player);

    // Send welcome and player number
    conn.socket.send(JSON.stringify({ 
      type: 'welcome', 
      data: 'Pong server ready' 
    }));
    
    conn.socket.send(JSON.stringify({ 
      type: 'playerNumber', 
      data: playerNumber 
    }));

    // If we have 2 players, start the game
    if (gameRoom.players.length === 2) {
      gameRoom.gameStarted = true;
      broadcast({ type: 'startGame', data: null });
      console.log('🎮 Game started with 2 players');
    }

    conn.socket.on('message', (message: any) => {
      try {
        const msg = JSON.parse(message.toString());
        console.log(`📨 Received from Player ${playerNumber}:`, msg.type);
        
        switch (msg.type) {
          case 'syncPaddle':
            // Broadcast paddle position to other player
            broadcastToOthers(player, {
              type: 'syncPaddle',
              data: msg.data
            });
            break;
            
          case 'syncBall':
            // Only player 1 should send ball updates
            if (playerNumber === 1) {
              broadcastToOthers(player, {
                type: 'syncBall',
                data: msg.data
              });
            }
            break;
            
          case 'gameReset':
            // Only player 1 should send game resets
            if (playerNumber === 1) {
              broadcastToOthers(player, {
                type: 'gameReset',
                data: msg.data
              });
            }
            break;
            
          default:
            console.log('❓ Unknown message type:', msg.type);
        }
      } catch (error) {
        console.error('💥 Error parsing message:', error);
      }
    });

    conn.socket.on('close', () => {
      console.log(`❌ Player ${playerId} (Player ${playerNumber}) disconnected`);
      
      // Remove player from room
      gameRoom.players = gameRoom.players.filter(p => p.id !== playerId);
      gameRoom.gameStarted = false;
      
      // Notify remaining player
      if (gameRoom.players.length > 0) {
        broadcast({ type: 'playerDisconnected', data: null });
      }
      
      console.log(`👥 Players remaining: ${gameRoom.players.length}`);
    });

    conn.socket.on('error', (error: any) => {
      console.error(`💥 Socket error for player ${playerId}:`, error);
    });
  });

  // Helper function to broadcast to all players
  function broadcast(message: { type: string; data: any }) {
    gameRoom.players.forEach(player => {
      if (player.socket.readyState === 1) { // WebSocket.OPEN
        player.socket.send(JSON.stringify(message));
      }
    });
  }

  // Helper function to broadcast to all players except sender
  function broadcastToOthers(sender: Player, message: { type: string; data: any }) {
    gameRoom.players.forEach(player => {
      if (player.id !== sender.id && player.socket.readyState === 1) {
        player.socket.send(JSON.stringify(message));
      }
    });
  }
}