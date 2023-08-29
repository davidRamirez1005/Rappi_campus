// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';

import {categoryTotal} from '../../data/CristianQuerys.js'
//import { validationResult } from 'express-validator';
//import {validationPayment} from '../../validator/validaciones.js'


/**
 * ? obtener categprias mas pópulares V3 3.1.0
 */

export const getAllCategoryV3 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        let coleccion = await genCollection("task")
        //let result = await coleccion.find().toArray();
        let result = await coleccion.aggregate(categoryTotal).toArray();
            (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `Algo fue mal`});
        
    } catch (error) {
        console.log(error);
    }
}

