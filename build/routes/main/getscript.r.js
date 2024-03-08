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
const prisma_1 = require("../../init/prisma");
const checkRblxIp_1 = require("../../tools/checkRblxIp");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/v1/get-script/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const ipcheck = yield (0, checkRblxIp_1.checkRblxIp)(request.ip);
            if (!ipcheck) {
                reply.send({ success: false, message: "Request is coming from an unallowed Ip.", code: "IP_NOT_ALLOWED" });
                return;
            }
            const { id } = request.params;
            if (!id || isNaN(id)) {
                reply.send({ success: false, message: "Invalid Params.", code: "INVALID_PARAMS" });
            }
            const user = yield prisma_1.prisma.user.findFirst({
                where: {
                    rId: id
                }
            });
            if (!user) {
                reply.send({ success: false, message: "Invalid ID.", code: "INVALID_ID" });
            }
            const script = yield prisma_1.prisma.pending_script.findFirst({
                where: {
                    userId: user === null || user === void 0 ? void 0 : user.id
                }
            });
            if (script) {
                yield prisma_1.prisma.pending_script.delete({
                    where: {
                        id: script.id
                    }
                });
                reply.send({ success: true, message: "SUCCESS!", code: "SUCCESS", script: script });
            }
            else {
                reply.send({ success: false, message: "No script to execute.", code: "NO_SCRIPT" });
            }
        }));
    });
}
exports.default = routes;
