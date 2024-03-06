import { prisma } from "../init/prisma";

interface PrismaGame {
    id: string;
    name: string;
    createdAt: Date;
    players: number;
    thumbnail: string;
    description: string | null;
    jobid: string;
  }
  export async function deletegame() {
    while (true) {
      try {
        await new Promise(resolve => setTimeout(resolve, 10000));
  
        const games: PrismaGame[] = await prisma.game.findMany({});
  
        const thirtyMinutesAgo = new Date();
        thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
  
        const oldGames: PrismaGame[] = games.filter((game: PrismaGame) => new Date(game.createdAt) < thirtyMinutesAgo);
  
        if (oldGames.length > 0) {
          await prisma.game.deleteMany({
            where: {
              id: {
                in: oldGames.map((game: PrismaGame) => game.id),
              },
            },
          });
        }
      } catch (e) {
        console.error("[ERROR] Error in deleteoldgame.ts");
        console.error(e);
        deletegame();
      }
    }
  }
  