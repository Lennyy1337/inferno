import { FastifyInstance, FastifyRequest } from 'fastify';
import { login } from '../../tools/login';

async function routes(fastify: FastifyInstance, options: any) {
  fastify.post('/auth/login', async (request, reply) => {
    try{
      const body: any = request.body
      const { username, password } = body
      const res = await login(username, password)
      reply.send(res)
      }catch(e){
        console.log("[ERROR] LoginRoute errored:")
        console.log(e)
        return {success: false, message: "Internal Server Error", code: "INTERNAL_SERVER_ERROR"}
    }
  });
}

export default routes;