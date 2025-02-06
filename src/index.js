import express from 'express';
import connectDB from './config/dbConfig.js';

const PORT=3099;

const app=express();//create express app server instance

//create a route for the app

app.get('/ping',(req,res)=>{
return res.json({message:'pong'});
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
