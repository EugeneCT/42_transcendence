var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import contract from "./contract";
export default function routes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        // Increment win count
        fastify.post("/win", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { username } = request.body;
            if (!username) {
                return reply.status(400).send({ error: "Username is required" });
            }
            try {
                const tx = yield contract.incrementWinForUser(username);
                yield tx.wait();
                return { success: true, username };
            }
            catch (err) {
                return reply.status(500).send({ error: err.message });
            }
        }));
        // Get win count
        fastify.get("/wins/:username", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { username } = request.params;
            try {
                const wins = yield contract.getWinsForUser(username);
                return { username, wins: Number(wins) };
            }
            catch (err) {
                return reply.status(500).send({ error: err.message });
            }
        }));
    });
}
