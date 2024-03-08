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
exports.checkWl = void 0;
const checkAuth_1 = require("./checkAuth");
function checkWl(auth) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const check = yield (0, checkAuth_1.checkauth)(auth);
        if (((_a = check.user) === null || _a === void 0 ? void 0 : _a.role) == "WHITELISTED" || ((_b = check.user) === null || _b === void 0 ? void 0 : _b.role) == "OWNER" || ((_c = check.user) === null || _c === void 0 ? void 0 : _c.role) == "STAFF") {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.checkWl = checkWl;
