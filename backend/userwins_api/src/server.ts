import Fastify from "fastify";
import routes from "./routes";
import cors from '@fastify/cors';

import * as dotenv from "dotenv";
dotenv.config();

const { HOST_PORT} = process.env;

const fastify = Fastify({ logger: true });
fastify.register(cors);

// Register routes
fastify.register(routes);

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: HOST_PORT, host: "0.0.0.0" });
    console.log(`🚀 Server running at http://localhost:${HOST_PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
