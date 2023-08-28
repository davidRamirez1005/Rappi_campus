import { check } from 'express-validator';

const validationUser = [
    check('username').notEmpty().isString().withMessage('el nombre es obligatorio y debe ser string'),
    check('email').isEmail().withMessage('el email es obligatorio y debe ser string ademas debe cumplir las caracteristicas de un e-mail'),
    check('password').isString().withMessage('la contraseña es obligatoria y debe ser string'),
    check('phone').isString().notEmpty().withMessage('es obligatorio el numero de telefono y debe ser string'),
    check('address.city').notEmpty().isString().withMessage('el nombre de la ciudad es obligatorio y debe ser string'),
    check('address.street').notEmpty().isString().withMessage('la direccion es obligatoria y debe ser string'),
    check('registrationDate').notEmpty().isString().withMessage('La fecha es obligatoria y debe ser una fecha válida'),
];
const validationShopkeeper = [
    check('name').notEmpty().isString().withMessage('el nombre es obligatorio y debe ser string'),
    check('email').isEmail().withMessage('el email es obligatorio y debe ser string ademas debe cumplir las caracteristicas de un e-mail'),
    check('password').isString().withMessage('la contraseña es obligatoria y debe ser string'),
    check('phone').isString().notEmpty().withMessage('es obligatorio el numero de telefono y debe ser string'),
    check('address.city').notEmpty().isString().withMessage('el nombre de la ciudad es obligatorio y debe ser string'),
    check('address.street').notEmpty().isString().withMessage('la direccion es obligatoria y debe ser string'),
    check('availability').notEmpty().isBoolean().withMessage('La disponibilidad es obligatoria y debe ser booleano'),
];
const validationPayment = [
    check('task_id').notEmpty().isNumeric().withMessage('el id del favor es obligatorio y debe ser numerico'),
    check('amount').notEmpty().isNumeric().withMessage('el precio del favor es obligatorio y debe ser numerico'),
    check('paymentDate').isString().withMessage('la fecha es obligatoria y debe ser string'),
    check('paymentMethod').isString().notEmpty().withMessage('es obligatorio el tipo de pago y debe ser string'),
    check('status').notEmpty().isString().withMessage('el estado del pago es obligatorio y debe ser string'),
];

export { validationUser, validationShopkeeper, validationPayment };