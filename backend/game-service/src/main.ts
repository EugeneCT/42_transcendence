import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import { registerGameSocket } from './socket/server';

const fastify = Fastify();
await fastify.register(websocket);

// Register WebSocket endpoint
registerGameSocket(fastify);

fastify.listen({ port: 4006 }, () => {
  console.log('🎮 Game Service WebSocket running on ws://localhost:4006/ws');
 
});
