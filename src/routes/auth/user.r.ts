import { FastifyInstance } from 'fastify';
import { checkauth } from '../../middlewares/checkAuth';
import { prisma } from '../../init/prisma';

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get('/auth/user', async (request, reply) => 
  {
    try{
        const auth = request.headers.authorization
        const cautch = await checkauth(auth as any)
        reply.send(cautch)
    }catch(e){
        console.log(e)
        reply.code(500).send({success: false, code: "Internal Server Error", response: "INTERNAL_SERVER_ERROR"})
    }
  });
}

export default routes;