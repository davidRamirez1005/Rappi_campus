// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';

import {reviewOrder, reviewByRating} from '../../data/CristianQuerys.js'
//import { validationResult } from 'express-validator';
//import {validationPayment} from '../../validator/validaciones.js'


/**
 * ? Obtener todos los reviews con salida formateada y ordenadas de mas rankeadas a menos V3 3.1.0
 */
let coleccion = await genCollection("review")

export const getAllReviewV3 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        //let result = await coleccion.find().toArray();
        let result = await coleccion.aggregate(reviewOrder).toArray();
            (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `Algo fue mal`});
        
    } catch (error) {
        console.log(error);
    }
}

/**
 * ? Obtener los review por rating con salida formateada V3 3.1.0
 */

export const getReviewByIdV3 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        const {id} = req.params;
        console.log(id);
        let coleccion = await genCollection("review")

        //let result = await coleccion.find().toArray();
        let pipeline = await reviewByRating(Number(id))
        let result = await coleccion.aggregate(pipeline).toArray();
        (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `No existen reviews con nota de: ${id}, por si acaso, recuerde que las calificaciones van de 1-5 `});

        
    } catch (error) {
        console.log(error);
    }
}

