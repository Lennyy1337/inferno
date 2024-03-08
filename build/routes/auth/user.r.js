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
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/auth/user', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = request.headers.authorization;
                const cautch = yield (0, checkAuth_1.checkauth)(auth);
                reply.send(cautch);
            }
            catch (e) {
                console.log(e);
                reply.code(500).send({ success: false, code: "Internal Server Error", response: "INTERNAL_SERVER_ERROR" });
            }
        }));
    });
}
exports.default = routes;
