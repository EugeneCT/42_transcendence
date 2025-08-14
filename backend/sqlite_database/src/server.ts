import Fastify from "fastify";
import routes from "./routes.js";
import cors from '@fastify/cors';

import * as dotenv from "dotenv";
dotenv.config();

import { initDb } from './db.js';

const { HOST_PORT} = process.env;

const fastify = Fastify({ logger: true });

fastify.register(cors);

// Register routes


// Start server
const start = async () => {
  try {
    await initDb();
    fastify.register(routes);
    const port = Number(process.env.HOST_PORT) || 3002;
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server running at http://localhost:${HOST_PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
