import {Router} from 'express';
import dotenv from 'dotenv';
import routesVersioning  from 'express-routes-versioning';

import {limitget} from '../config/configLimit.js'
import {getAllReviewV1, getReviewByIdV1, NewReview} from '../controllers/v1/reviewRouterV1.js'
import {getAllReviewV2, getReviewByIdV2} from '../controllers/v2/reviewRouterV2.js'
import {getAllReviewV3, getReviewByIdV3} from '../controllers/v3/reviewRouterV3.js'

dotenv.config();
const appReview = Router()
const version = routesVersioning();

appReview.use(limitget())

/**
 * ! GET
 * ? Obtener todas las reviews  V1 1.1.0.
 * ? Obtener todas las reviews con salida formateada V2 2.1.0
 * ? Obtener todos los reviews con salida formateada y ordenadas de mas rankeadas a menos V3 3.1.0
 * * http://127.10.10.10:5050/review
 */
appReview.get('/',  version({
    "~1.1.0": getAllReviewV1,
    "~2.1.0": getAllReviewV2,
    "~3.1.0": getAllReviewV3
}))

/**
 * ! GET
 * ? listar reviews por id V1 1.1.0
 * ? Obtener los review por nombre de usuario con salida formateada V2 2.1.0
 * ? Obtener los review por rating con salida formateada V3 3.1.0
 * * http://127.10.10.10:5050/review/:id
 */
appReview.get('/:id',  version({
    "~1.1.0": getReviewByIdV1,
    "~2.1.0": getReviewByIdV2,
    "~3.1.0": getReviewByIdV3
}))

/**
 * ! GET
 * ? Crear una reseña V1 1.1.0
 * * http://127.10.10.10:5050/review
 */
appReview.post('/',  version({
    "~1.1.0": NewReview
}))


export default appReview;