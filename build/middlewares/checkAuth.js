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
exports.checkauth = void 0;
const prisma_1 = require("../init/prisma");
function checkauth(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!auth || auth == undefined) {
                return { success: false, message: "No Authorization Provided.", code: "INVALID_AUTH" };
            }
            const session = yield prisma_1.prisma.session.findFirst({
                where: {
                    session: auth
                }
            });
            if (!session) {
                return { success: false, message: "Invalid Session", code: "INVALID_AUTH" };
            }
            const user = yield prisma_1.prisma.user.findFirst({
                where: {
                    id: session.userId
                }
            });
            if (!user) {
                return { success: false, message: "Invalid Session", code: "INVALID_AUTH" };
            }
            return { success: true, message: "Success!", code: "SUCCESS", user: user, session: session };
        }
        catch (e) {
            console.log("[ERROR] CheckAuth errored:");
            console.log(e);
            return { success: false, message: "Internal Server Error", code: "INTERNAL_SERVER_ERROR" };
        }
    });
}
exports.checkauth = checkauth;
