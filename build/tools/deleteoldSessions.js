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
exports.deletesession = void 0;
const prisma_1 = require("../init/prisma");
function deletesession() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            try {
                yield new Promise(resolve => setTimeout(resolve, 10000));
                const sessions = yield prisma_1.prisma.session.findMany({});
                const thirtyMinutesAgo = new Date();
                thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 10080);
                const oldSessions = sessions
                    .filter(session => new Date(session.createdAt) < thirtyMinutesAgo)
                    .map(({ session, userId, createdAt }) => ({
                    user: { userId },
                    session,
                    userId,
                    createdAt,
                }));
                if (oldSessions.length > 0) {
                    yield prisma_1.prisma.session.deleteMany({
                        where: {
                            session: {
                                in: oldSessions.map(session => session.session),
                            },
                        },
                    });
                }
            }
            catch (e) {
                console.error("[ERROR] Error in deleteoldsessions.ts");
                console.error(e);
                deletesession();
            }
        }
    });
}
exports.deletesession = deletesession;
