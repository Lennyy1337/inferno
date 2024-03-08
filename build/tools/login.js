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
exports.login = void 0;
const prisma_1 = require("../init/prisma");
const makeid_1 = require("./makeid");
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!username || !password) {
                return { success: false, message: "No Username/Password Entered.", code: "MISSING_CREDENTIALS" };
            }
            const user = yield prisma_1.prisma.user.findFirst({
                where: {
                    password: password,
                    username: username
                }
            });
            if (!user) {
                return { success: false, message: "Invalid Credentials", code: "INVALID_CREDENTIALS" };
            }
            const session = yield prisma_1.prisma.session.create({
                data: {
                    session: `|_DO_NOT_SHARE_|${(0, makeid_1.makeid)(100)}`,
                    userId: user.id
                }
            });
            if (!session) {
                // how ??
                return { success: false, message: "No session created", code: "NO_SESSION_CREATED" };
            }
            return { success: true, message: "Logged in!", code: "SUCCESS", session: session, user: user };
        }
        catch (e) {
            console.log("[ERROR] Login errored:");
            console.log(e);
            return { success: false, message: "Internal Server Error", code: "INTERNAL_SERVER_ERROR" };
        }
    });
}
exports.login = login;
