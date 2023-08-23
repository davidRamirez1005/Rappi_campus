import express from 'express';
import dotenv from 'dotenv';
import appPruebas from './routers/pruebasRouter.js' 


dotenv.config()

const appExpress = express();

appExpress.use(express.json());

appExpress.use('/prueba', appPruebas);

let config = JSON.parse(process.env.MY_SERVER);
appExpress.listen(config, () =>{
    console.log(`listening on http://${config.hostname}:${config.port}`);
})
