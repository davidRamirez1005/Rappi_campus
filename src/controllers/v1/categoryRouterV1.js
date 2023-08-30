
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';
import { validationResult } from 'express-validator';
import {validationCategory} from '../../validator/validaciones.js'


/**
 * ? obtener todos las categorias
 */

export const getAllCategoryV1 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        let coleccion = await genCollection("category")
        //let result = await coleccion.find().toArray();
        let result = await coleccion.aggregate([{$project: { "_id":0}}]).toArray();
        (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `Algo fue mal`});
        
    } catch (error) {
        console.log(error);
    }
}


/**
 * ? listar por id las categorias 
 */

export const getCategoryByIdV1 = async(req, res) =>{
    if(!req.rateLimit) return;
    try {
        const {id} = req.params;
        let coleccion = await genCollection("category")
        //let result = await coleccion.find().toArray();
        let result = await coleccion.findOne({"_id": Number(id)});
        (result) ? res.send(result) : res.status(404).send({"status": 404, "message": `la categoria con el id ${id} no existe`});
        
    } catch (error) {
        console.log(error);
    }
}


/**
 * ? Crear un review del servicio
 */

export const NewCategory = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        await Promise.all(validationCategory.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('category')
        const { Nombre :name, Descripcion:description,Icono:icon} = req.body;
        const newDocument = {
            _id: await siguienteId( "category"),
            name: name,
            description: description,
            icon: icon,
        };
       
        let result = await coleccion.insertOne(newDocument);
        console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.status(406).send('no se ha podido crear el documento');
    }
}
