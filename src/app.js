import express from 'express';
import dotenv from 'dotenv';
import appTask from './routers/taskRouter.js' 
import appReview from './routers/reviewRouter.js';
import appCategory from './routers/categoryRouter.js';
dotenv.config()

const appExpress = express();

appExpress.use(express.json());

appExpress.use('/task', appTask);
appExpress.use('/review', appReview);
appExpress.use('/category', appCategory);

let config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, () =>{
    console.log(`listening on http://${config.hostname}:${config.port}`);
})
