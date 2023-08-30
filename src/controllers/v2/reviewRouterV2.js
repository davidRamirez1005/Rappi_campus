// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';

import {reviewV2, reviewByUser} from '../../data/CristianQuerys.js'
//import { validationResult } from 'express-validator';
//import {validationPayment} from '../../validator/validaciones.js'


/**
 * ? obtener todos los reviews con salida formateada  V2 2.1.0
 */
let coleccion = await genCollection("review")

export const getAllReviewV2 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        //let result = await coleccion.find().toArray();
        let result = await coleccion.aggregate(reviewV2).toArray();
            (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `Algo fue mal`});
        
    } catch (error) {
        console.log(error);
    }
}

/**
 * ? obtener los review por nombre de usuario con salida formateada V2 2.1.0
 */

export const getReviewByIdV2 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        const {id} = req.params;
        console.log(id);
        let coleccion = await genCollection("review")

        //let result = await coleccion.find().toArray();
        let pipeline = await reviewByUser(id)
        let result = await coleccion.aggregate(pipeline).toArray();
        (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `El usuario con el nombre ${id} no ha realizado reseñas`});

        
    } catch (error) {
        console.log(error);
    }
}

