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
const checkWl_1 = require("../../middlewares/checkWl");
const prisma_1 = require("../../init/prisma");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/v1/games', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { authorization } = request.headers;
            if (!authorization) {
                reply.send({ success: false, message: "No Authorization", code: "NO_AUTHORIZATION" });
                return;
            }
            if (!(yield (0, checkWl_1.checkWl)(authorization))) {
                reply.send({ success: false, message: "You are not whitelisted.", code: "NOT_WHITELISTED" });
                return;
            }
            const games = yield prisma_1.prisma.game.findMany({});
            reply.send({ success: true, message: "Success!", code: "SUCCESS", games: games });
        }));
    });
}
exports.default = routes;
