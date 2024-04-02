import { FastifyInstance } from 'fastify';
import { checkauth } from '../../middlewares/checkAuth';
import { getid } from '../../tools/getrobloxid';
import { prisma } from '../../init/prisma';

async function routes(fastify: FastifyInstance, options: any) {
  fastify.post('/auth/change/roblox/username', async (request, reply) => {
    try{
        const { authorization }: any = request.headers
        if(!request.body){
            reply.send({success: false, message: "No body.", code: "NO_BODY"})
            return
        }
        const username: any = (request.body as any).username
        if(!username){
            reply.send({success: false, message: "No username provided.", code: "NO_USERNAME"})
        }
        const check = await checkauth(authorization)
        if(!check.success == true){
            reply.send(check)
            return
        }
        const id = await getid(username)
        if(id.length > 20){
            reply.send({success: false, message: "Invalid Username", code: "INVALID_USERNAME"})
        }
        await prisma.user.update({
            data: {
                rId: `${id}`
            },
            where: {
                id: check.user?.id,
            }
        })
        reply.send({success: true, message: "Username updated!", code: "SUCCESS"})
    }catch(e){
        console.log(e)
        reply.code(500).send({success: false, code: "Internal Server Error", response: "INTERNAL_SERVER_ERROR"})
    }
  });
}

export default routes;