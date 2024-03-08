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
exports.getid = void 0;
const undici_1 = require("undici");
function getid(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, undici_1.request)('https://users.roblox.com/v1/usernames/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usernames: [username],
                    excludeBannedUsers: true,
                }),
            });
            const responseBody = yield response.body.json();
            const id = responseBody.data[0].id;
            return yield id;
        }
        catch (e) {
            console.error(e);
        }
    });
}
exports.getid = getid;
