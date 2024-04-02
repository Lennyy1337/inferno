import { FastifyInstance, FastifyRequest } from 'fastify';
import { register } from '../../tools/register';

async function routes(fastify: FastifyInstance, options: any) {
  fastify.post('/auth/register', async (request, reply) => {
    try{
      const body: any = request.body
      if(!body){
        return {success: false, message: "No body", code: "NO_BODY"}
      }
      const username = body.username
      const password = body.password
      const res = await register(username, password)
      reply.send(res)
      }catch(e){
        console.log("[ERROR] RegisterRoute errored:")
        console.log(e)
        reply.code(500).send({success: false, code: "Internal Server Error", response: "INTERNAL_SERVER_ERROR"})
    }
  });
}

export default routes;