// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import {ObjectId} from 'mongodb'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';
import {tenderos, tenderosDis} from '../../data/joseQuerys.js'
import { validationResult } from 'express-validator';
import {validationShopkeeper} from '../../validator/validaciones.js'

/**
 * * obtener todos los tenderos V1 1.1.0
 */
export const getTenderos = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('shopkeeper')
    let result = await coleccion.aggregate(tenderos).toArray();
    res.send(result)
}
/**
 * * obtener todos los tenderos con disponibilidad V1 1.1.1
 */
export const getTenderosTrue = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('shopkeeper')
    let result = await coleccion.aggregate(tenderosDis).toArray();
    res.send(result)
}
/**
 * * insertar un nuevo tendero
 */
/*
{
    "name": "pepito perez",
    "identification" : 96586
    "email": "pepito@example.com",
    "identification" : 202321
    "password": "pepito123",
    "phone": "+4567890345",
    "address": {
    "city": "bucaramanga",
    "street": "Calle Principal"
    },
    "availability": true,
    "rol" : 3
}
*/
export const insertShopkeeperV1 = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        const newId = await siguienteId( "shopkeeper");

        await Promise.all(validationShopkeeper.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('shopkeeper')
        
        const newDocument = {
            _id: newId,
            ...req.body
        };
        let result = await coleccion.insertOne(newDocument);
        // console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}
/**
 * * eliminar un tendero
 */
export const deleteShopkeeper = async (req, res) => {
    if (!req.rateLimit) return;

    const _id = req.params._id;
    console.log('ID:', _id); // Agregar un log para verificar el ID

    try {
        let coleccion = await genCollection('shopkeeper');
        console.log('Conexión a la colección exitosa');

        const filter = isNaN(parseInt(_id))
            ? { _id: new ObjectId(_id) }
            : { _id: parseInt(_id) };
        console.log('Filtro:', filter); // Agregar un log para verificar el filtro

        const result = await coleccion.deleteOne(filter);
        console.log('Resultado:', result);

        if (result.deletedCount === 1) {
            res.send('Documento eliminado con éxito');
        } else {
            res.send('Documento no eliminado');
        }
    } catch (err) {
        console.error(err);

        // Agregar logs de depuración
        console.error('Error al eliminar el documento:', err.message);
        console.error('Filtro utilizado:', filter);

        res.status(500).send('Error al eliminar los datos de la base de datos.');
    }
}