import { FastifyInstance } from "fastify";
import contract from "./contract";

export default async function routes(fastify: FastifyInstance) {
  
  // Increment win count
  fastify.post("/win", async (request, reply) => {
    const { username } = request.body as { username: string };
    if (!username) {
      return reply.status(400).send({ error: "Username is required" });
    }

    try {
      const tx = await contract.incrementWinForUser(username);
      await tx.wait();
      return { success: true, username };
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });

  // Get win count
  fastify.get("/wins/:username", async (request, reply) => {
    const { username } = request.params as { username: string };
    try {
      const wins = await contract.getWinsForUser(username);
      return { username, wins: Number(wins) };
    } catch (err: any) {
      return reply.status(500).send({ error: err.message });
    }
  });
}
