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
const checkAuth_1 = require("../../middlewares/checkAuth");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/v1/execute', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!request.body) {
                    reply.send({ success: false, message: "No body.", code: "NO_BODY" });
                    return;
                }
                const { authorization } = request.headers;
                const { script } = request.body;
                if (!script) {
                    reply.send({ success: false, message: "No script to execute.", code: "NO_SCRIPT" });
                }
                const check = yield (0, checkWl_1.checkWl)(authorization);
                if (!check) {
                    reply.send({ success: false, message: "You are not whitelisted.", code: "NOT_ WHITELISTED" });
                }
                const user = (yield (0, checkAuth_1.checkauth)(authorization)).user;
                const checkscript = yield prisma_1.prisma.pending_script.findFirst({
                    where: {
                        userId: user.id
                    }
                });
                if (checkscript) {
                    const updated = yield prisma_1.prisma.pending_script.update({
                        where: {
                            id: checkscript.id
                        },
                        data: {
                            script: script
                        }
                    });
                }
                else {
                    const newscript = yield prisma_1.prisma.pending_script.create({
                        data: {
                            script: script,
                            userId: user.id
                        }
                    });
                }
                reply.send({ success: true, message: "Script Executed!" });
            }
            catch (e) {
                console.log(e);
            }
        }));
    });
}
exports.default = routes;
