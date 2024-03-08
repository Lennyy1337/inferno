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
const register_1 = require("../../tools/register");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/auth/register', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                if (!body) {
                    return { success: false, message: "No body", code: "NO_BODY" };
                }
                const username = body.username;
                const password = body.password;
                const res = yield (0, register_1.register)(username, password);
                reply.send(res);
            }
            catch (e) {
                console.log("[ERROR] RegisterRoute errored:");
                console.log(e);
                reply.code(500).send({ success: false, code: "Internal Server Error", response: "INTERNAL_SERVER_ERROR" });
            }
        }));
    });
}
exports.default = routes;
