import { FastifyInstance } from 'fastify';
import { checkauth } from '../../middlewares/checkAuth';
import { prisma } from '../../init/prisma';
async function routes(fastify: FastifyInstance, options: any) {
  fastify.post('/auth/change-password', async (request, reply) => {
    const body: any = request.body
    if(!body){
      return {success: false, message: "No body", code: "NO_BODY"}
    }
    const { authorization } = request.headers
    const user = await checkauth(authorization as any)
    if(!user.user){
        return {success: false, message: "Invalid Auth", code: "INVALID_AUTH"}
    }
    const { newPassword } = body
    if(!newPassword){
        return {success: false, message: "Please provide a new password", code: "NO_PASSWORD"}
    }
    await prisma.user.update({
        where: {
            id: user.user.id
        },
        data: {
            password: newPassword
        }
    })
    await prisma.session.deleteMany({
        where: {
            userId: user.user.id
        }
    })
    return {success: true, message: "Password Updated!", code: "SUCCESS"}
  });
}

export default routes;