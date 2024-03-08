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
exports.register = void 0;
const prisma_1 = require("../init/prisma");
function register(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username || !password) {
            return { success: false, message: "No Username/Password Entered.", code: "MISSING_CREDENTIALS" };
        }
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (username.length < 3) {
            return { success: false, message: "Username under 3 characters!" };
        }
        if (password.length < 6) {
            return { success: false, message: "Password under 6 characters!" };
        }
        if (username.length > 20) {
            return { success: false, message: "Username over 20 characters!" };
        }
        if (password.length > 64) {
            return { success: false, message: "Password over 64 characters!" };
        }
        if (user) {
            return { success: false, message: "Username already in use.", code: "USERNAME_TAKEN" };
        }
        const newuser = yield prisma_1.prisma.user.create({
            data: {
                username: username,
                password: password,
                role: "NONE"
            }
        });
        return ({ success: true, message: "Account created! Please log in with the credentials.", code: "SUCCESS" });
    });
}
exports.register = register;
