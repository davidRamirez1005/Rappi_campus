// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';

import {TaskDate, TaskByDay} from '../../data/CristianQuerys.js'
//import { validationResult } from 'express-validator';
//import {validationPayment} from '../../validator/validaciones.js'


/**
 * ? Obtener todas las tareas completadas V3 3.1.0
 */
let coleccion = await genCollection("task")

export const getAlltaskV3 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        //let result = await coleccion.find().toArray();
        let result = await coleccion.aggregate(TaskDate).toArray();
            (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `Algo fue mal`});
        
    } catch (error) {
        console.log(error);
    }
}

/**
 * ? listar tareas realizadas un dia en especifico y con su salida formateada V1 3.1.0
 */

export const getTaskByIdV3 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        const {id} = req.params;
        console.log(id);
        let coleccion = await genCollection("task")

        //let result = await coleccion.find().toArray();
        let pipeline = await TaskByDay(id)
        let result = await coleccion.aggregate(pipeline).toArray();
        (result.length != 0) ? res.send(result) : res.status(404).send({"status": 404, "message": `La tarea con el id ${id} no existe`});

        
    } catch (error) {
        console.log(error);
    }
}

