import {limitget} from '../config/configLimit.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {insertPaymentV1} from '../controllers/v1/paymentRouterV1.js'

const appPayment = Routes();
const version = routesVersioning();
// appPayment.use(passport.initialize());
//Headers 'Authorization: Bearer ....'
appPayment.use(limitget());
//Headers 'Accept-Version: 1.0.0' 
/**
 * ? insertar un nuevo metodo de pago V1 1.0.0
 */
appPayment.post('/agregar', version({
    "1.1.0" : insertPaymentV1
}))

export default appPayment;