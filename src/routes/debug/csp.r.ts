import { FastifyInstance } from 'fastify';

async function routes(fastify: FastifyInstance, options: any) {
    fastify.post('/csp-report-endpoint', (request, reply) => {
        console.log('Received CSP violation report:', request.body);
        reply.status(204).send(); 
    });
}

export default routes;