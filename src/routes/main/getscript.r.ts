import { FastifyInstance } from 'fastify';
import { prisma } from '../../init/prisma';
import { checkRblxIp } from '../../tools/checkRblxIp';

async function routes(fastify: FastifyInstance, options: any) {
  fastify.get('/v1/get-script/:id', async (request, reply) => {
    const ipcheck = await checkRblxIp(request.ip)
    if(!ipcheck){
        reply.send({success: false, message: "Request is coming from an unallowed Ip.", code: "IP_NOT_ALLOWED"})
        return
    }
    const { id }: any = request.params 
    if(!id || isNaN(id)){
        reply.send({success: false, message: "Invalid Params.", code: "INVALID_PARAMS"})
    }
    const user = await prisma.user.findFirst({
        where: {
            rId: id
        }
    })
    if(!user){
        reply.send({success: false, message: "Invalid ID.", code: "INVALID_ID"})
    }
    const script = await prisma.pending_script.findFirst({
        where: {
            userId: user?.id
        }
    })
    if(script){
        await prisma.pending_script.delete({
            where: {
                id: script.id
            }
        })
        reply.send({success: true, message: "SUCCESS!", code: "SUCCESS", script: script})
    }else{
        reply.send({success: false, message: "No script to execute.", code: "NO_SCRIPT"})
    }
  });
}

export default routes;