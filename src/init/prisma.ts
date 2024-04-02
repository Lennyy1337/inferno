import { PrismaClient } from '@prisma/client'
import { fieldEncryptionExtension } from 'prisma-field-encryption'

const client = new PrismaClient()

export const prisma = client.$extends(
    fieldEncryptionExtension()
)