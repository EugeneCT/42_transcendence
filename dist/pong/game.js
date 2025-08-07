var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AI, Player } from './Paddle.js';
import { PongGameEngine } from './PongGameEngine.js';
export function runPongTournament(ctx, players) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = new PongGameEngine(ctx);
        game.paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
        game.paddles.add(new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown'));
        game.start(players[0], players[1]);
        // game.destroy();
    });
}
export function runPongAI(ctx, players) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = new PongGameEngine(ctx);
        game.paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
        game.paddles.add(new AI(ctx, 'yellow', 'right'));
        game.start(players[0], 'AI');
        // game.destroy();
    });
}
export function runPong2v2(ctx, players) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = new PongGameEngine(ctx);
        game.paddles.add(new Player(ctx, 'red', 'left', 'w', 's'));
        game.paddles.add(new Player(ctx, 'yellow', 'right', 'ArrowUp', 'ArrowDown'));
        game.paddles.add(new Player(ctx, 'green', 'left', 'i', 'k'));
        game.paddles.add(new Player(ctx, 'orange', 'right', '5', '2'));
        game.start(`${players[0]} & ${players[1]}`, `${players[2]} & ${players[3]}`);
        // game.destroy();
    });
}
