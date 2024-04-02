import { prisma } from '../init/prisma';

interface PrismaSession {
  session: string;
  userId: string;
  createdAt: Date;
}

interface Session extends PrismaSession {
  user: {
    userId: string;
  };
}

export async function deletesession() {
  while (true) {
    try {
      await new Promise(resolve => setTimeout(resolve, 10000));

      const sessions: PrismaSession[] = await prisma.session.findMany({});

      const thirtyMinutesAgo = new Date();
      thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 10080);

      const oldSessions: Session[] = sessions
        .filter(session => new Date(session.createdAt) < thirtyMinutesAgo)
        .map(({ session, userId, createdAt }) => ({
          user: { userId },
          session,
          userId,
          createdAt,
        }));

      if (oldSessions.length > 0) {
        await prisma.session.deleteMany({
          where: {
            session: {
              in: oldSessions.map(session => session.session),
            },
          },
        });
      }
    } catch (e) {
      console.error("[ERROR] Error in deleteoldsessions.ts");
      console.error(e);
      deletesession();
    }
  }
}
