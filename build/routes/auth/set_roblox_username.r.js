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
const checkAuth_1 = require("../../middlewares/checkAuth");
const getrobloxid_1 = require("../../tools/getrobloxid");
const prisma_1 = require("../../init/prisma");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/auth/change/roblox/username', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { authorization } = request.headers;
                if (!request.body) {
                    reply.send({ success: false, message: "No body.", code: "NO_BODY" });
                    return;
                }
                const username = request.body.username;
                if (!username) {
                    reply.send({ success: false, message: "No username provided.", code: "NO_USERNAME" });
                }
                const check = yield (0, checkAuth_1.checkauth)(authorization);
                if (!check.success == true) {
                    reply.send(check);
                    return;
                }
                const id = yield (0, getrobloxid_1.getid)(username);
                if (id.length > 20) {
                    reply.send({ success: false, message: "Invalid Username", code: "INVALID_USERNAME" });
                }
                yield prisma_1.prisma.user.update({
                    data: {
                        rId: `${id}`
                    },
                    where: {
                        id: (_a = check.user) === null || _a === void 0 ? void 0 : _a.id,
                    }
                });
                reply.send({ success: true, message: "Username updated!", code: "SUCCESS" });
            }
            catch (e) {
                console.log(e);
                reply.code(500).send({ success: false, code: "Internal Server Error", response: "INTERNAL_SERVER_ERROR" });
            }
        }));
    });
}
exports.default = routes;
