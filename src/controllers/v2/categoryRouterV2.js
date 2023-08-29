// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';

import {categoryOrder, categoryById} from '../../data/CristianQuerys.js'
//import { validationResult } from 'express-validator';
//import {validationPayment} from '../../validator/validaciones.js'


/**
 * ? Obtener todos las categorias ordenadas alfabeticamente por nombre y con salida formateada V2 2.1.0
 */
let coleccion = await genCollection("category")

export const getAllcategoryV2 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        //let result = await coleccion.find().toArray();
        let result = await coleccion.aggregate(categoryOrder).toArray();
            (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `Algo fue mal`});
        
    } catch (error) {
        console.log(error);
    }
}

/**
 * ?listar por id las categorias pero con la salida formateada  V2 2.1.0
 */

export const getCategoryByIdV2 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        const {id} = req.params;
        console.log(id);
        let coleccion = await genCollection("category")

        //let result = await coleccion.find().toArray();
        let pipeline = await categoryById(Number(id))
        let result = await coleccion.aggregate(pipeline).toArray();
        (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `No se encuentran cateogrias con el estado: ${id}`});

        
    } catch (error) {
        console.log(error);
    }
}

