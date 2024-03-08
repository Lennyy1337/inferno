import { FastifyInstance } from 'fastify';
import { checkWl } from '../../middlewares/checkWl';
import { prisma } from '../../init/prisma';

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get('/v1/games', async (request, reply) => {
    const { authorization } = request.headers
    if(!authorization){
        reply.send({success: false, message: "No Authorization", code: "NO_AUTHORIZATION"})
        return
    }
    const wlcheck = await checkWl(authorization as string)
    if (!wlcheck){
        reply.send({success: false, message: "You are not whitelisted.", code: "NOT_WHITELISTED"})
        return
    }
    const games = await prisma.game.findMany({})
    reply.send({success: true, message: "Success!", code: "SUCCESS", games: games})
  });
}

export default routes;