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
exports.checkRblxIp = void 0;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = require("../init/prisma");
function checkRblxIp(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const check = yield prisma_1.prisma.roblox_ip.findFirst({
                where: {
                    ip: ip
                }
            });
            if (check) {
                console.log("IP CACHE HIT X1");
                return true;
            }
            if (ip === "127.0.0.1") {
                return false;
            }
            const ipdata = yield (yield axios_1.default.get(`http://ip-api.com/json/${ip}?fields=status,message,isp,org,as,query`)).data;
            if (ipdata.status !== "SUCCESS") {
                return false;
            }
            if (!ipdata.as.includes("Roblox") || !ipdata.as.includes("AS22697") || !ipdata.org.includes("Roblox") || !ipdata.isp.includes("Roblox")) {
                return false;
            }
            yield prisma_1.prisma.roblox_ip.create({
                data: {
                    ip: ip
                }
            });
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    });
}
exports.checkRblxIp = checkRblxIp;
