
import { prisma } from '../init/prisma'

export async function deletesession(){
    while (true){
        try{
            // i stole game code cry about it
            await new Promise(resolve => setTimeout(resolve, 10000));
            
            const sessions = await prisma.session.findMany({});

            const thirtyMinutesAgo = new Date();
            thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 10080);

            const oldSessions = sessions.filter(session => new Date(session.createdAt) < thirtyMinutesAgo);

            if (oldSessions.length > 0) {
            await prisma.session.deleteMany({
                where: {
                session: {
                    in: oldSessions.map(session => session.session),
                },
                },
            });
    }
    }catch(e){
        console.error("[ERROR] Error in deleteoldsessions.ts")
        console.error(e)
        deletesession()
    }
    }
}
