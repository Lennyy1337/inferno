"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deleteoldgame_1 = require("./tools/deleteoldgame");
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = require("./init/fastify");
const router_1 = __importDefault(require("./router"));
const deleteoldSessions_1 = require("./tools/deleteoldSessions");
dotenv_1.default.config();
(0, deleteoldSessions_1.deletesession)();
(0, deleteoldgame_1.deletegame)();
fastify_1.fastify.register(router_1.default);
const port = process.env.PORT;
fastify_1.fastify.listen({ port: port, host: "0.0.0.0" }, function (err, address) {
    console.log(`Server started on port: ${port}`);
    if (err) {
        fastify_1.fastify.log.error(err);
    }
});
