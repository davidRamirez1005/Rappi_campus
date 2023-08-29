import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';
import { validationResult } from 'express-validator';
import {validationTask} from '../../validator/validaciones.js'


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

/**
 * ? Crear una tarea/pedido
 */

export const NewTask = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        await Promise.all(validationTask.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('task')
        const { Titulo:title, Descripcion:description,Id_Usuario:user_id,Id_Tendero:shopkeeper_id,Estado: status ,Id_Categoria: category_id ,Ciudad :city ,direccion: street,Id_Pago:payment_id } = req.body;
        const newDocument = {
            _id: await siguienteId( "task"),
            title: title,
            description: description,
            user_id: user_id,
            shopkeeper_id: shopkeeper_id,
            status: status,
            createdAt: new Date(),
            category_id: category_id,
            address: {
                city: city,
                street: street
            },
            payment_id: payment_id
        };

        let result = await coleccion.insertOne(newDocument);
        console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}


/**
 * ? Actualizar el estado de una tarea
 */

export const updateTask = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        await Promise.all(validationTask.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('task')
        const { Titulo:title, Descripcion:description,Id_Usuario:user_id,Id_Tendero:shopkeeper_id,Estado: status ,Id_Categoria: category_id ,Ciudad :city ,direccion: street,Id_Pago:payment_id } = req.body;
        const newDocument = {
            _id: await siguienteId( "task"),
            title: title,
            description: description,
            user_id: user_id,
            shopkeeper_id: shopkeeper_id,
            status: status,
            createdAt: new Date(),
            category_id: category_id,
            address: {
                city: city,
                street: street
            },
            payment_id: payment_id
        };

        let result = await coleccion.insertOne(newDocument);
        console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}


