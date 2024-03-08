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
const login_1 = require("../../tools/login");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/auth/login', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                const { username, password } = body;
                const res = yield (0, login_1.login)(username, password);
                reply.send(res);
            }
            catch (e) {
                console.log("[ERROR] LoginRoute errored:");
                console.log(e);
                return { success: false, message: "Internal Server Error", code: "INTERNAL_SERVER_ERROR" };
            }
        }));
    });
}
exports.default = routes;
