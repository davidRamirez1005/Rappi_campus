// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import {ObjectId} from 'mongodb'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';
import {userBgm, usuarioFecha} from '../../data/joseQuerys.js'
import { validationResult } from 'express-validator';
import {validationUser} from '../../validator/validaciones.js'

/**
 * * obtener todos los usuarios que residen en bucaramanga V1 1.2.0
 */
export const getUserBga = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('user')
    let result = await coleccion.aggregate(userBgm).toArray();
    res.send(result)
}
/**
 * * obtener todos los usuarios que se registraron antes de una fecha especifica V1 1.3.0
 */
export const getRegistro = async(req, res) =>{
    if(!req.rateLimit) return;

    let coleccion = await genCollection('user')
    let result = await coleccion.aggregate(usuarioFecha).toArray();
    res.send(result)
}
/**
 * * insertar un nuevo usuario
 */
/*
{
    "username": "benito perez",
    "identification" : 1012114
    "email": "benito@example.com",
    "password": "benito123",
    "phone": "+578909809",
    "address": {
        "city": "bucaramanga",
        "street": "san francisco"
    },
    "registrationDate": "2023-08-27",
    "rol" : 2
}
*/
export const insertUserV1 = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        const newId = await siguienteId( "user");

        await Promise.all(validationUser.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('user')
        
        const newDocument = {
            _id: newId,
            ...req.body,
            registrationDate : new Date
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
 * * eliminar un usuario
 */
export const deleteUser = async (req, res) => {
    if (!req.rateLimit) return;

    const _id = req.params._id;
    console.log('ID:', _id); // Agregar un log para verificar el ID

    try {
        let coleccion = await genCollection('user');
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
