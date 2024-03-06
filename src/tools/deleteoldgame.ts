
import { prisma } from '../init/prisma'

export async function deletegame(){
    while (true){
        try{
            await new Promise(resolve => setTimeout(resolve, 10000));
            
            const games = await prisma.game.findMany({});

            const thirtyMinutesAgo = new Date();
            thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

            const oldGames = games.filter(game => new Date(game.createdAt) < thirtyMinutesAgo);

            if (oldGames.length > 0) {
            await prisma.game.deleteMany({
                where: {
                id: {
                    in: oldGames.map(game => game.id),
                },
                },
            });
    }
    }catch(e){
        console.error("[ERROR] Error in deleteoldgame.ts")
        console.error(e)
        deletegame()
    }
    }
}
