// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import genCollection from '../../helpers/db.js';
import {usuarioPendienteCiudad, usuarioPendienteCiudadV3, usuarioFavor, usuarioFavorV331} from '../../data/joseQuerys.js'

/**
 * * obtener todos los usuarios que tienen pago pendiente y residen en una ciudad en especifico V3 3.0.0
 */
export const userPagoPendienteCiudad = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('user')
    let result = await coleccion.aggregate(usuarioPendienteCiudad).toArray();
    res.send(result)
}
/**
 * * obtener todos los usuarios que tienen pago pendiente y residen en una ciudad en especifico con descripcion del favor V3 3.1.1
 */
export const userPagoPendienteDesc = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('user')
    let result = await coleccion.aggregate(usuarioPendienteCiudadV3).toArray();
    res.send(result)
}
/**
 * * obtener la descripcion del favor completo por un usuario en especifico V3 3.2.0
 */
export const favorUser = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('user')
    let result = await coleccion.aggregate(usuarioFavor).toArray();
    res.send(result)
}
/**
 * * obtener la descripcion del favor completo po un usuario en especifico y el tendero que atendió el favor V3 3.3.1
 */
export const favorUserV331 = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('user')
    let result = await coleccion.aggregate(usuarioFavorV331).toArray();
    res.send(result)
}