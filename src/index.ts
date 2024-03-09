import { deletegame } from './tools/deleteoldgame';
import { prisma } from './init/prisma';
import dotenv from 'dotenv';
import { fastify } from './init/fastify';
import registerRoutes from './router';
import { deletesession } from './tools/deleteoldSessions';
import { checkRblxIp } from './tools/checkRblxIp';

dotenv.config();

deletesession()
deletegame()

fastify.addHook('onSend', (request, reply, payload, next) => {
  reply.header('Content-Security-Policy', "default-src 'self' 'unsafe-inline' data:; connect-src 'self' misc-cozmo.yhsvrh.easypanel.host;");
  next();
});

fastify.register(registerRoutes);
const port = process.env.PORT as any;

fastify.listen({ port: port, host: "0.0.0.0"}, function (err, address){ 
    console.log(`Server started on port: ${port}`);
    if (err) {
      fastify.log.error(err);
    }
});
