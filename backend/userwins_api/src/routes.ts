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
  // Get top X users by wins

fastify.get("/topWinners/:x", async (request, reply) => {
  const xParam = request.params as { x: string };
  const x = parseInt(xParam.x, 10);

  if (isNaN(x) || x <= 0) {
    return reply.status(400).send({ error: "Parameter x must be a positive integer" });
  }

  try {
    // Get total number of users
    const totalUsers: number = await contract.getUsernamesCount();

    // Fetch all usernames and their wins
    const users: { username: string; wins: number }[] = [];

    for (let i = 0; i < totalUsers; i++) {
      const username: string = await contract.getUsernameAt(i);
      const winsBigNumber = await contract.getWinsForUser(username);
      const wins = winsBigNumber.toNumber ? winsBigNumber.toNumber() : Number(winsBigNumber);
      users.push({ username, wins });
    }

    // Sort descending by wins
    users.sort((a, b) => b.wins - a.wins);

    // Take top x users
    const topUsers = users.slice(0, x);

    return { topUsers };
  } catch (err: any) {
    return reply.status(500).send({ error: err.message });
  }
});


}

