import { FastifyInstance } from 'fastify';
import undici from 'undici'
import { prisma } from '../../init/prisma';
import { checkRblxIp } from '../../tools/checkRblxIp';
async function routes(fastify: FastifyInstance, options: any) {
  fastify.post('/v1/games', async (request, reply) => {
    try{
        const ipcheck = await checkRblxIp(request.ip)
        if(!ipcheck){
            reply.send({success: false, message: "Request is coming from an unallowed Ip.", code: "IP_NOT_ALLOWED"})
            return
        }
        if(!request.body){
            reply.send({success: false, message: "No body", code: "NO_BODY"})
            return
        }
        
        const roblox_id = request.headers['roblox-id'];

        const { placeid, jobid }: any = request.body

        if(!roblox_id){
            reply.send({success: false, message: "Invalid Request", code: "NO_ROBLOX_ID_HEADER"})
        }

        const thumbnailraw = await undici.request(`https://thumbnails.roblox.com/v1/assets?assetIds=${roblox_id}&returnPolicy=PlaceHolder&size=480x270&format=Png&isCircular=false`);
        const thumbnailraw2 : any= await thumbnailraw.body.json();
        
        if (!thumbnailraw2.data || thumbnailraw2.data.length === 0) {
            reply.send({ success: false, message: "No thumbnail information found" });
            return;
        }

        let thumbnail: any = thumbnailraw2.data[0].imageUrl;

        const universeraw = await undici.request(`https://apis.roblox.com/universes/v1/places/${placeid}/universe`);
        const universeraw2 = await universeraw.body.json();
        const universeid = (universeraw2 as any).universeId;

        if (!universeid) {
            reply.send({ success: false, message: "No universe information found" });
            return;
        }

        let description = "no description provided";

        const gameinforaw = await undici.request(`https://games.roblox.com/v1/games?universeIds=${universeid}`);
        const gameinforaw2 = await gameinforaw.body.json();
        const gameinfoArray = (gameinforaw2 as any).data;

        if (!gameinfoArray || gameinfoArray.length === 0) {
            reply.send({ success: false, message: "No game information found" });
            return;
        }

        const gameinfo = gameinfoArray[0];

        if (gameinfo.description) {
            description = gameinfo.description.toString();
        }

        if (!description) {
            description = "No description provided.";
        }

        if (thumbnail.includes("https://s3.amazonaws.com/images.roblox.com/325472601571f31e1bf00674c368d335.gif")) {
                    thumbnail = "https://t6.rbxcdn.com/1805a317a83eb68ca9654de3e8bfc446";
        }

        const checkExistingGame = await prisma.game.findFirst({
            where: {
                id: roblox_id as string
            }
        })
        if(checkExistingGame){
            await prisma.game.update({
                where: {
                    id: roblox_id as string
                },
                data: {
                    createdAt: new Date(),
                    jobid: jobid
                }
            })
        }
        if(!checkExistingGame){
            await prisma.game.create({
                data: {
                    id: roblox_id as string,
                    name: gameinfo.name,
                    players: gameinfo.playing,
                    thumbnail: thumbnail,
                    jobid: jobid,
                    description: description
                }
            })
        
        }
        reply.send({success: true, message: "Game Added!", code: "SUCCESS"})
    }catch(e){
        reply.send({success: false, message: "Error!", code: "UNKNOWN_ERROR"})
        console.log(e)
    }
  });
}

export default routes;