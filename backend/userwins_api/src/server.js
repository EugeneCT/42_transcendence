var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fastify from "fastify";
import routes from "./routes";
import * as dotenv from "dotenv";
dotenv.config();
const { HOST_PORT } = process.env;
const fastify = Fastify({ logger: true });
// Register routes
fastify.register(routes);
// Start server
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen({ port: HOST_PORT, host: "0.0.0.0" });
        console.log(`🚀 Server running at http://localhost:${HOST_PORT}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
start();
