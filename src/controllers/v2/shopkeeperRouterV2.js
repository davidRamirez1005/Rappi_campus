// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import genCollection from '../../helpers/db.js';
import {tenderoNombre, tenderosCedula} from '../../data/joseQuerys.js'

/**
 * * obtener todos los tenderos por medio del nombre V2 2.1.0
 */
export const getTenderosName = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('shopkeeper')
    let result = await coleccion.aggregate(tenderoNombre).toArray();
    res.send(result)
}
/**
 * * obtener todos los tenderos por medio de la cedula V2 2.1.0
 */
export const getTenderosCedula = async(req, res) =>{
    if(!req.rateLimit) return;
    const {cedula} = req.params;

    let coleccion = await genCollection("shopkeeper")
    let result = await coleccion.findOne({"identification": cedula});
    res.send(result)
}