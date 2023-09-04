import {limitget} from '../config/configLimit.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {getTenderos, getTenderosTrue, insertShopkeeperV1, deleteShopkeeper} from '../controllers/v1/shopkeeperRouterV1.js'
import {getTenderosName, getTenderosCedula} from '../controllers/v2/shopkeeperRouterV2.js'

const appShopkeeper = Routes();
const version = routesVersioning();
// appShopkeeper.use(passport.initialize());
//Headers 'Authorization: Bearer ....'
appShopkeeper.use(limitget());
//Headers 'Accept-Version: 1.0.0' 
/**
 * ? obtener todos los tenderos V1 1.1.0
 * ? obtener todos los tenderos con disponibilidad V1 1.2.0
 * ? obtener todos los tenderos por medio del nombre V2 2.0.0
 * ? obtener todos los tenderos por medio de la cedula V2 2.1.0
 * * http://127.0.0.3:5012/shopkeeper/listar/:78520
 */
appShopkeeper.get('/listar/:identification?',  version({
    "~1.1.0": getTenderos,
    "~1.2.0": getTenderosTrue,
    "~2.0.0": getTenderosName,
    "~2.1.0": getTenderosCedula,
}))
/**
 * ? insertar un nuevo tendero V1 1.1.0
 */
appShopkeeper.post('/agregar', version({
    "~1.1.0" : insertShopkeeperV1
}))
/**
 * ? eliminar un tendero V1 1.1.0
 */
appShopkeeper.delete('/eliminar/:_id', version({
    "~1.1.0" : deleteShopkeeper
}));

export default appShopkeeper;