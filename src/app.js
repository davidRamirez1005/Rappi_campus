import express from 'express';
import dotenv from 'dotenv';
import appPruebas from './routers/pruebasRouter.js' 
import appShopkeeper from './routers/shopkeeperRouter.js';
import appUser from './routers/userRouter.js';
import appPayment from './routers/paymentRouter.js';


dotenv.config()

const appExpress = express();

appExpress.use(express.json());

appExpress.use('/prueba', appPruebas);
appExpress.use('/shopkeeper', appShopkeeper);
appExpress.use('/user', appUser);
appExpress.use('/payment', appPayment);


let config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, () =>{
    console.log(`listening on http://${config.hostname}:${config.port}`);
})
