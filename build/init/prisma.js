"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma_field_encryption_1 = require("prisma-field-encryption");
const client = new client_1.PrismaClient();
exports.prisma = client.$extends((0, prisma_field_encryption_1.fieldEncryptionExtension)());
