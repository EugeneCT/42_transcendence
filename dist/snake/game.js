var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Snake } from './Snake.js';
import { SnakeGameEngine } from './SnakeGameEngine.js';
export function runSnakeTournament(ctx, players) {
    return __awaiter(this, void 0, void 0, function* () {
        const game = new SnakeGameEngine(ctx);
        game.playerA = new Snake(ctx, 2, 3, 'N', 'w', 's', 'a', 'd', 'blue');
        game.playerB = new Snake(ctx, 5, 3, 'N', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'red');
        game.start(players[0], players[1]);
        game.destroy();
    });
}
/*
TODO:
- create fruit
- head marker?
*/ 
