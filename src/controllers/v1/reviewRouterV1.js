
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';

import { validationResult } from 'express-validator';
import {validationReview} from '../../validator/validaciones.js'


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


/**
 * ? Crear un review del servicio
 */

export const NewReview = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        await Promise.all(validationReview.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('review')
        const { Id_Tarea :task_id, Id_Usuario:user_id,Calificacion:rating,Comentario: comment} = req.body;
        const newDocument = {
            _id: await siguienteId( "review"),
            task_id: task_id,
            user_id: user_id,
            rating: rating,
            comment: comment,
            createdAt: new Date(),
        };
       
        let result = await coleccion.insertOne(newDocument);
        console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}
