// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';
//import { validationResult } from 'express-validator';
//import {validationPayment} from '../../validator/validaciones.js'


/**
 * ? Listar las todas las reviews 
 */

export const getAllReviewV1 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        let coleccion = await genCollection("review")
        //let result = await coleccion.find().toArray();
        let result = await coleccion.aggregate([{$project: { "_id":0}}]).toArray();
        (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `Algo fue mal`});
        
    } catch (error) {
        console.log(error);
    }
}


/**
 * ? Listar los reviews por id especifico 
 */

export const getReviewByIdV1 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        const {id} = req.params;
        let coleccion = await genCollection("review")
        //let result = await coleccion.find().toArray();
        let result = await coleccion.findOne({"_id": Number(id)});
        (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `El review con el id ${id} no existe`});
        
    } catch (error) {
        console.log(error);
    }
}

