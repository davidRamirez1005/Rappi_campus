// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';
//import { validationResult } from 'express-validator';
//import {validationPayment} from '../../validator/validaciones.js'


/**
 * ? Listar las todas las tareas 
 */

export const getAlltaskV1 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        let coleccion = await genCollection("task")
        //let result = await coleccion.find().toArray();
        let result = await coleccion.aggregate([{$project: { "_id":0}}]).toArray();
        (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `Algo fue mal`});
        
    } catch (error) {
        console.log(error);
    }
}


/**
 * ? Listar las tareas por id especifico 
 */

export const getTaskByIdV1 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        const {id} = req.params;
        let coleccion = await genCollection("task")
        //let result = await coleccion.find().toArray();
        let result = await coleccion.findOne({"_id": Number(id)});
        (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `La tarea con el id ${id} no existe`});
        
    } catch (error) {
        console.log(error);
    }
}

