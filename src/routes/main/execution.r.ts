import { FastifyInstance } from 'fastify';
import { checkWl } from '../../middlewares/checkWl';
import { prisma } from '../../init/prisma';
import { checkauth } from '../../middlewares/checkAuth';

async function routes(fastify: FastifyInstance, options: any) {
  fastify.post('/v1/execute', async (request, reply) => {
    try{

        if(!request.body){
            reply.send({success: false, message: "No body.", code: "NO_BODY"})
            return
        }

        const { authorization }: any = request.headers
        const { script }: any = request.body
        if(!script){
            reply.send({success: false, message: "No script to execute.", code: "NO_SCRIPT"})
        }

        const check = await checkWl(authorization)
        if(!check){
            reply.send({success: false, message: "You are not whitelisted.", code: "NOT_ WHITELISTED"})
        }

        const user: any = (await checkauth(authorization)).user

        const checkscript = await prisma.pending_script.findFirst({
            where: {
                userId: user.id
            }
        })

        if(checkscript){
            const updated = await prisma.pending_script.update({
                where: {
                    id: checkscript.id
                },
                data: {
                    script: script
                }
            })
        }else{
            const newscript = await prisma.pending_script.create({
                data: {
                    script: script,
                    userId: user.id
                }
            })
        }
        
        reply.send({success: true, message: "Script Executed!"})
    }catch(e){
        console.log(e)
    }
  });
}

export default routes;