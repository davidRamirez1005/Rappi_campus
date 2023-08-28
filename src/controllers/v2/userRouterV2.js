// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import genCollection from '../../helpers/db.js';
import {usuarioPedido, usuarioPendiente} from '../../data/joseQuerys.js'

/**
 * * obtener todos los pedidos que ha hecho un usuario por medio del nombre del usuario V2 2.0.0
 */
export const getUserPedidoName = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('user')
    let result = await coleccion.aggregate(usuarioPedido).toArray();
    res.send(result)
}
/**
 * * obtener todos los usuarios que tienen pago pendiente V2 2.1.0
 */
export const getUserPendiente = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('user')
    let result = await coleccion.aggregate(usuarioPendiente).toArray();
    res.send(result)
}