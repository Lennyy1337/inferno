"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletegame = void 0;
const prisma_1 = require("../init/prisma");
function deletegame() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            try {
                yield new Promise(resolve => setTimeout(resolve, 10000));
                const games = yield prisma_1.prisma.game.findMany({});
                const thirtyMinutesAgo = new Date();
                thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
                const oldGames = games.filter((game) => new Date(game.createdAt) < thirtyMinutesAgo);
                if (oldGames.length > 0) {
                    yield prisma_1.prisma.game.deleteMany({
                        where: {
                            id: {
                                in: oldGames.map((game) => game.id),
                            },
                        },
                    });
                }
            }
            catch (e) {
                console.error("[ERROR] Error in deleteoldgame.ts");
                console.error(e);
                deletegame();
            }
        }
    });
}
exports.deletegame = deletegame;
