import { FastifyInstance } from 'fastify';

async function routes(fastify: FastifyInstance, options: any) {
    fastify.get('/version', (request, reply) => {
        reply.send({version: "v1"})
    });
}

export default routes;