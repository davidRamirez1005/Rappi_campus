// import { validationResult } from 'express-validator';
// import {validationIncidencia} from '../../validator/validaciones.js'
import siguienteId from '../../helpers/autoincrementoId.js'
import genCollection from '../../helpers/db.js';
import { validationResult } from 'express-validator';
import {validationPayment} from '../../validator/validaciones.js'

/**
 * * insertar un nuevo metodo de pago
 */
/*
{
    "task_id": 7,
    "amount": 50000,
    "paymentDate": "2023-08-20",
    "paymentMethod": "nequi",
    "status": "aprobado"
}
*/
export const insertPaymentV1 = async(req, res) =>{
    if (!req.rateLimit) return;

    try {
        const newId = await siguienteId( "payment");

        await Promise.all(validationPayment.map(rule => rule.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let coleccion = await genCollection('payment')
        
        const newDocument = {
            _id: newId,
            ...req.body,
            paymentDate : new Date
        };
        let result = await coleccion.insertOne(newDocument);
        // console.log(result);
        res.status(201).send({ status: 201, message: 'documento creado con exito' });
    } catch (error) {
        console.log(error);
        res.status(406).send('no se ha podido crear el documento');
    }
}