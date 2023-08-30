import express from 'express';
import dotenv from 'dotenv';

import appTask from './routers/taskRouter.js' 
import appReview from './routers/reviewRouter.js';
import appCategory from './routers/categoryRouter.js';
import appShopkeeper from './routers/shopkeeperRouter.js';
import appUser from './routers/userRouter.js';
import appPayment from './routers/paymentRouter.js';

import { generateToken } from './middlewares/token.js';
import passport from './middlewares/passport.js';

dotenv.config()

const appExpress = express();

appExpress.use(express.json());

appExpress.post('/login', generateToken)

appExpress.use('/task', passport.authenticate('bearer', { session: false }), appTask);
appExpress.use('/review', passport.authenticate('bearer', { session: false }), appReview);
appExpress.use('/category', passport.authenticate('bearer', { session: false }), appCategory);
appExpress.use('/shopkeeper', passport.authenticate('bearer', { session: false }), appShopkeeper);
appExpress.use('/user', passport.authenticate('bearer', { session: false }), appUser);
appExpress.use('/payment', passport.authenticate('bearer', { session: false }), appPayment);



let config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, () =>{
    console.log(`listening on http://${config.hostname}:${config.port}`);
})
