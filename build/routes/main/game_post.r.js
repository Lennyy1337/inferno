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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const undici_1 = __importDefault(require("undici"));
const prisma_1 = require("../../init/prisma");
const checkRblxIp_1 = require("../../tools/checkRblxIp");
function routes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post('/v1/games', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ipcheck = yield (0, checkRblxIp_1.checkRblxIp)(request.ip);
                if (!ipcheck) {
                    reply.send({ success: false, message: "Request is coming from an unallowed Ip.", code: "IP_NOT_ALLOWED" });
                    return;
                }
                if (!request.body) {
                    reply.send({ success: false, message: "No body", code: "NO_BODY" });
                    return;
                }
                const roblox_id = request.headers['roblox-id'];
                const { placeid, jobid } = request.body;
                if (!roblox_id) {
                    reply.send({ success: false, message: "Invalid Request", code: "NO_ROBLOX_ID_HEADER" });
                }
                const thumbnailraw = yield undici_1.default.request(`https://thumbnails.roblox.com/v1/assets?assetIds=${roblox_id}&returnPolicy=PlaceHolder&size=480x270&format=Png&isCircular=false`);
                const thumbnailraw2 = yield thumbnailraw.body.json();
                if (!thumbnailraw2.data || thumbnailraw2.data.length === 0) {
                    reply.send({ success: false, message: "No thumbnail information found" });
                    return;
                }
                let thumbnail = thumbnailraw2.data[0].imageUrl;
                const universeraw = yield undici_1.default.request(`https://apis.roblox.com/universes/v1/places/${placeid}/universe`);
                const universeraw2 = yield universeraw.body.json();
                const universeid = universeraw2.universeId;
                if (!universeid) {
                    reply.send({ success: false, message: "No universe information found" });
                    return;
                }
                let description = "no description provided";
                const gameinforaw = yield undici_1.default.request(`https://games.roblox.com/v1/games?universeIds=${universeid}`);
                const gameinforaw2 = yield gameinforaw.body.json();
                const gameinfoArray = gameinforaw2.data;
                if (!gameinfoArray || gameinfoArray.length === 0) {
                    reply.send({ success: false, message: "No game information found" });
                    return;
                }
                const gameinfo = gameinfoArray[0];
                if (gameinfo.description) {
                    description = gameinfo.description.toString();
                }
                if (!description) {
                    description = "No description provided.";
                }
                if (thumbnail.includes("https://s3.amazonaws.com/images.roblox.com/325472601571f31e1bf00674c368d335.gif")) {
                    thumbnail = "https://t6.rbxcdn.com/1805a317a83eb68ca9654de3e8bfc446";
                }
                const checkExistingGame = yield prisma_1.prisma.game.findFirst({
                    where: {
                        id: roblox_id
                    }
                });
                if (checkExistingGame) {
                    yield prisma_1.prisma.game.update({
                        where: {
                            id: roblox_id
                        },
                        data: {
                            createdAt: new Date(),
                            jobid: jobid
                        }
                    });
                }
                if (!checkExistingGame) {
                    yield prisma_1.prisma.game.create({
                        data: {
                            id: roblox_id,
                            name: gameinfo.name,
                            players: gameinfo.playing,
                            thumbnail: thumbnail,
                            jobid: jobid,
                            description: description
                        }
                    });
                }
                reply.send({ success: true, message: "Game Added!", code: "SUCCESS" });
            }
            catch (e) {
                reply.send({ success: false, message: "Error!", code: "UNKNOWN_ERROR" });
                console.log(e);
            }
        }));
    });
}
exports.default = routes;
