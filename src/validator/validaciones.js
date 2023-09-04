import { check } from 'express-validator';

const validationUser = [
    check('username').notEmpty().isString().withMessage('el nombre es obligatorio y debe ser string'),
    check('identification').notEmpty().isNumeric().withMessage('el numero de identificacion es obligatorio y debe ser numerico'),
    check('email').isEmail().withMessage('el email es obligatorio y debe ser string ademas debe cumplir las caracteristicas de un e-mail'),
    check('password').isString().withMessage('la contraseña es obligatoria y debe ser string'),
    check('phone').isString().notEmpty().withMessage('es obligatorio el numero de telefono y debe ser string'),
    check('address.city').notEmpty().isString().withMessage('el nombre de la ciudad es obligatorio y debe ser string'),
    check('address.street').notEmpty().isString().withMessage('la direccion es obligatoria y debe ser string'),
    check('registrationDate').notEmpty().isString().withMessage('La fecha es obligatoria y debe ser una fecha válida'),
];
const validationShopkeeper = [
    check('name').notEmpty().isString().withMessage('el nombre es obligatorio y debe ser string'),
    check('identification').notEmpty().isNumeric().withMessage('el numero de identificacion es obligatorio y debe ser numerico'),
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

const validationTask = [
    check('Titulo').replace("Titulo","title").notEmpty().isString().withMessage('el Titulo es obligatorio y debe ser string'),
    check('Descripcion').notEmpty().isString().withMessage('La Descripcion es obligatoria y debe ser string '),
    check('Id_Usuario').notEmpty().isNumeric().withMessage('el Id_Usuario es obligatorio y debe ser numerico'),
    check('Id_Tendero').notEmpty().isNumeric().withMessage('el Id_Tendero es obligatorio y debe ser numerico'),
    check('Estado').isIn(["Solicitado", "Asignado", "Completado", "Cancelado", "en Proceso"]).withMessage("Debe ser un estado valido es decir, 'Solicitado', 'Asignado', 'Completado', 'Cancelado', o 'en Proceso'"),
    check('Id_Categoria').notEmpty().isNumeric().withMessage('el Id_Categoria es obligatorio y debe ser numerico'),
    check('Ciudad').notEmpty().isString().withMessage('el nombre de la ciudad es obligatorio y debe ser string'),
    check('direccion').notEmpty().isString().withMessage('la direccion es obligatoria y debe ser string'),
    check('Id_Pago').notEmpty().isNumeric().withMessage('el Id_Pago es obligatorio y debe ser numerico'),
];

const validationReview = [
    check('Id_Usuario').notEmpty().isNumeric().withMessage('el Id_Usuario es obligatorio y debe ser numerico'),
    check('Id_Tarea').notEmpty().isNumeric().withMessage('el Id_Tarea es obligatorio y debe ser numerico'),
    check('Calificacion').custom(value => /^[1-5]$/.test(value)).withMessage('El valor de la Calificacion debe ser un número entero del 1 al 5'),
    check('Comentario').optional().isString().withMessage('el comenario es opcional y debe ser string'),
];

const validationCategory = [
    check('Nombre').notEmpty().isString().withMessage('el Nombre es obligatorio y debe ser numerico'),
    check('Descripcion').notEmpty().isString().withMessage('La Descripcion es obligatoria y debe ser string '),
    check('Icono').optional().isString().withMessage('el Icono es opcional y debe ser string que sea fas'),
];

const validationLogin = [
    check('ROL').isIn(["admin", "user", "shopkeeper"]).withMessage("Debe ser un estado valido es decir, 'admin', 'user', 'shopkeeper'"),
    check('ROL_EMAIL').isEmail().withMessage('el ROL_EMAIL es obligatorio y debe ser string ademas debe cumplir las caracteristicas de un e-mail'),
    check('ROL_PASSWORD').isString().withMessage('la ROL_PASSWORD es obligatoria y debe ser string'),
];
export { validationLogin, validationUser, validationShopkeeper, validationPayment, validationTask, validationReview , validationCategory};


/** _id: Number(siguienteId("task")),
            title: "Reparación de jardineria",
            description: "Se necesita reparar el jardin que esta vuelto nada.",
            user_id: 4,
            shopkeeper_id: 5,
            status: "Solicitado",
            createdAt: ISODate("2023-08-22"),
            category_id: 2,
            address: {
                city: "Bogotá",
                street: "Calle 123"
            },
            payment_id: 4 
        }, */