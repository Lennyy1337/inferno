import { FastifyInstance } from 'fastify';
import * as path from 'path';
import * as fs from 'fs';

async function registerRoutes(fastify: FastifyInstance, options: any) {
  try {
    const routesPath = path.join(__dirname, './routes'); 

    const registerRoutesInDirectory = (directoryPath: string) => {
      const files = fs.readdirSync(directoryPath);

      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
          registerRoutesInDirectory(filePath);
        } else if (file.endsWith('.r.js') || file.endsWith('.r.ts')) {
          const route = require(filePath).default;
          route(fastify, options);
          console.log(`Added ${file}`);
        }
      });
    };

    registerRoutesInDirectory(routesPath);
  } catch (e) {
    console.error(e);
  }
}

export default registerRoutes;
