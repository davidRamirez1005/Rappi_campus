import {limitget} from '../config/configLimit.js'
import Routes from 'express';
import routesVersioning  from 'express-routes-versioning';
import {getUserBga, getRegistro, insertUserV1, deleteUser} from '../controllers/v1/userRouterV1.js'
import {getUserPedidoName, getUserPendiente } from '../controllers/v2/userRouterV2.js'
import {userPagoPendienteCiudad,userPagoPendienteDesc, favorUser, favorUserV331 } from '../controllers/v3/userRouterV3.js'

const appUser = Routes();
const version = routesVersioning();
// appUser.use(passport.initialize());
//Headers 'Authorization: Bearer ....'
appUser.use(limitget());
//Headers 'Accept-Version: 1.0.0' 
/**
 * ? obtener todos los usuarios que residen en bucaramanga V1 1.1.0
 * ? obtener todos los usuarios que se registraron antes de una fecha especifica V1 1.2.0
 * ? obtener todos los pedidos que ha hecho un usuario por medio del nombre del usuario V2 2.0.0
 * ? obtener todos los usuarios que tienen pago pendiente V2 2.1.0
 * ? obtener todos los usuarios que tienen pago pendiente y residen en una ciudad en especifico V3 3.0.0
 * ? obtener todos los usuarios que tienen pago pendiente y residen en una ciudad en especifico con descripcion del favor V3 3.1.1
 * ? obtener la descripcion del favor completo por un usuario en especifico V3 3.2.0
 * ? obtener la descripcion del favor completo por un usuario en especifico y el tendero que atendió el favor V3 3.3.1
 * * http://127.0.0.3:5012/user/listar
 */
appUser.get('/listar',  version({
    "1.1.0": getUserBga,
    "^1.2.0": getRegistro,
    "2.0.0": getUserPedidoName,
    "2.1.0": getUserPendiente,
    "3.0.0": userPagoPendienteCiudad,
    "3.1.1": userPagoPendienteDesc,
    "3.2.0": favorUser,
    "3.3.1": favorUserV331,
}))
/**
 * ? insertar un nuevo usuario V1 1.0.0
 */
appUser.post('/agregar', version({
    "1.1.0" : insertUserV1
}))
/**
 * ? eliminar un usuario V1 1.0.0
 */
appUser.delete('/eliminar/:_id', version({
    "1.1.0" : deleteUser
}));

export default appUser;