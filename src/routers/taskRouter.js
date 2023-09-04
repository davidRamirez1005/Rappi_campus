import {Router} from 'express';
import dotenv from 'dotenv';
import routesVersioning  from 'express-routes-versioning';

import {limitget} from '../config/configLimit.js'
import {getAlltaskV1, getTaskByIdV1, NewTask, updateTask} from '../controllers/v1/taskRouterV1.js'
import {getAlltaskV2, getTaskByIdV2} from '../controllers/v2/taskRouterV2.js'
import {getAlltaskV3, getTaskByIdV3} from '../controllers/v3/taskRouterV3.js'

dotenv.config();
const appTask = Router()
const version = routesVersioning();

appTask.use(limitget())

/**
 * ! GET
 * ? Obtener todas las tareas  V1 1.1.0.
 * ? Obtener todas las tareas completadas V2 2.1.0
 * ? Obtener todas las tareas ordenadas por fecha y con su salida formateada V3 3.1.0
 * * http://127.10.10.10:5050/task
 */
appTask.get('/',  version({
    "~1.1.0": getAlltaskV1,
    "~2.1.0": getAlltaskV2,
    "~3.1.0": getAlltaskV3
}))

/**
 * ! GET
 * ? listar tareas por id V1 1.1.0
 * ? Listar tareas segun su estado y con salida formateada V2 2.1.0
 * ? Listar tareas realizadas un dia en especifico y con su salida formateada V3 3.1.0
 * * http://127.10.10.10:5050/task/:id
 */
appTask.get('/:id',  version({
    "~1.1.0": getTaskByIdV1,
    "~2.1.0": getTaskByIdV2,
    "~3.1.0": getTaskByIdV3
}))

/**
 * ! POST
 * ? Ingresar una nueva tarea V1 1.1.0
 * * http://127.10.10.10:5050/task
 */
appTask.post('/',  version({
    "~1.1.0": NewTask
}))

/**
 * ! UPDATE
 * ? Ingresar una nueva tarea V1 1.1.0
 *  {
        "Id_Tarea": 5,
        "Estado": "Completado"
    }
 * * http://127.10.10.10:5050/task
 */
appTask.put('/',  version({
    "~1.1.0": updateTask
}))


export default appTask;