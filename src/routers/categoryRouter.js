import {Router} from 'express';
import dotenv from 'dotenv';
import routesVersioning  from 'express-routes-versioning';
import {limitget} from '../config/configLimit.js'
import {getAllCategoryV1, getCategoryByIdV1, NewCategory} from '../controllers/v1/categoryRouterV1.js'
import {getAllcategoryV2, getCategoryByIdV2} from '../controllers/v2/categoryRouterV2.js'
import {getAllCategoryV3} from '../controllers/v3/categoryRouterV3.js'

dotenv.config();
const appCategory = Router()
const version = routesVersioning();

appCategory.use(limitget())

/**
 * ! GET
 * ? Obtener todas las categorias  V1 1.1.0.
 * ? Obtener todos las categorias ordenadas alfabeticamente por nombre y con salida formateada V2 2.1.0
 * ? Obtener categprias mas pópulares V3 3.1.0
 * * http://127.10.10.10:5050/category
 */
appCategory.get('/',  version({
    "~1.1.0": getAllCategoryV1,
    "~2.1.0": getAllcategoryV2,
    "~3.1.0": getAllCategoryV3
}))

/**
 * ! GET
 * ? listar por id las categorias  V1 1.1.0
 * ? listar por id las categorias pero con la salida formateada  V2 2.1.0
 * * http://127.10.10.10:5050/category/:id
 */
appCategory.get('/:id',  version({
    "~1.1.0": getCategoryByIdV1,
    "~2.1.0": getCategoryByIdV2
}))

/**
 * ! POST
 * ? Crear una categoria V1 1.1.0
 * {
  "Nombre": "Servicio de cerrajeria",
  "Descripcion": "Este servicio consta de arreglar chapas, replicas de llaves, etc...",
  "Icono": "fas fa-lock"
}
 * * http://127.10.10.10:5050/category
 */
appCategory.post('/',  version({
    "~1.1.0": NewCategory
}))


export default appCategory;