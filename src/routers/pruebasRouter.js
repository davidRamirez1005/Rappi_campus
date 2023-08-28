import {Router} from 'express';
import dotenv from 'dotenv';

import { pruebV1 } from '../controllers/Pruebas.js'

dotenv.config();
const appPruebas = Router()
/**
 * ! GET
 * ? Obtener todas las citas alfabéticamente
 * * http://127.0.0.3:5012/prueba
 */
appPruebas.get('/', pruebV1)


export default appPruebas;