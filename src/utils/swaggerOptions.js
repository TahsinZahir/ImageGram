import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathToRoutesFile = join(__dirname, '../routers/v1/*.js');
console.log(pathToRoutesFile);
 export const options = {
     definition: {
         openapi: '3.0.0',
         info: {
             title: 'Image gram API',
             version: '1.0.0',
             description:
                 'This is a simple CRUD API application made with Express and documented with Swagger',
         },
         servers: [
             {
                 url: 'http://localhost:3000/api/v1',
             },
         ],
     },
     apis: [pathToRoutesFile],
 };