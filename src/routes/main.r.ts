import { FastifyInstance } from 'fastify';

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get('/', async (request, reply) => {
    reply.send({ success: true, message: "Hey" });
  });
}

export default routes;