import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import multer from 'multer';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
 import swaggerJSDoc from 'swagger-jsdoc';
 import {options} from './utils/swaggerOptions.js';
import ip from 'ip';
import { rateLimit }  from 'express-rate-limit';
const PORT=3000;

const app=express();//create express app server instance


const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 5 // limit each IP to 5 requests per windowMs
});
app.use(limiter); // apply rate limiter to all requests

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const swaggerDocs = swaggerJSDoc(options);
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', apiRouter);// If the url starts with /api then the request is forwarded to the apiRouter

app.get('/ping', isAuthenticated, (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.user);
return res.json({message:'pong'});
});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
