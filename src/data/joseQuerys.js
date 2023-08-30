
/**
 * ? consultas para tenderos
 */
/**
 * ! obtener todos los tenderos V1 1.1.0
 */
export const tenderos = [
    {
        $project: {
            _id: 0,
        }
    }
];
/**
 * ! obtener todos los tenderos con disponibilidad V1 1.1.1
 */
export const tenderosDis = [
    {
        $match : { availability : true}
    },
    {
        $project: {
            _id: 0,
        }
    }
];
/**
 * ! obtener todos los tenderos por medio del nombre V2 2.1.0
 */
const param = "Michael Johnson"
export const tenderoNombre = [
    {
        $match : { name : param}
    },
    {
        $project: {
            _id: 0,
        }
    }
];
/**
 * ! obtener todos los tenderos por medio de la cedula V2 2.2.0
 */
const identification = 78520
export const tenderosCedula = [
    {
        $match : { identification : identification}
    },
    {
        $project: {
            _id: 0,
        }
    }
];
/**
 * ? consultas para usuarios
*/
/**
 * ! obtener todos los usuarios que residen en bucaramanga V1 1.2.0
 */
export const userBgm = [
    {
        $match : { "address.city" : "bucaramanga"}
    },
    {
        $project: {
            _id: 0,
        }
    }
];
/**
 * ! obtener todos los usuarios que se registraron antes de una fecha especifica V1 1.3.0
 */
const fecha = "2023-08-31"
export const usuarioFecha = [
    {
        $match : { registrationDate: { $lt: new Date(fecha) }}
    },
    {
        $project: {
            _id: 0,
        }
    }
];
/**
 * ! obtener todos los pedidos que ha hecho un usuario por medio del nombre del usuario V2 2.0.0
 */
const nombre = "jose david ramirez"
export const usuarioPedido = [
    {
        $lookup: {
        from: "task",
        localField: "_id",
        foreignField: "user_id",
        as: "user_tasks"
        }
    },
    {
        $match: {
            username : nombre
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $project: {
            _id: 1, 
            username: 1,
            email: 1,
            phone : 1,
            'user_tasks.title': 1,
            'user_tasks.description': 1
        }
    }
];
/**
 * ! obtener todos los usuarios que tienen pago pendiente V2 2.1.0
 */
export const usuarioPendiente = [
    {
        $lookup: {
        from: "task",
        localField: "_id",
        foreignField: "user_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "payment",
        localField: "user_tasks._id",
        foreignField: "task_id",
        as: "task_payments"
        }
    },
    {
        $match: {
        "task_payments.status": "pendiente"
        }
    },
    {
        $project: {
        _id: 1,
        username: 1,
        email: 1,
        phone: 1,
        address: 1,
        registrationDate: 1,
        pendingPayments: {
            $filter: {
            input: "$task_payments",
            as: "payment",
            cond: { $eq: ["$$payment.status", "pendiente"] }
            }
        }
        }
    }
];
/**
 * ! obtener todos los usuarios que tienen pago pendiente y residen en una ciudad en especifico V3 3.0.0
 */
const ciudad = "bucaramanga"
export const usuarioPendienteCiudad = [
    {
        $lookup: {
        from: "task",
        localField: "_id",
        foreignField: "user_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "payment",
        localField: "user_tasks._id",
        foreignField: "task_id",
        as: "task_payments"
        }
    },
    {
        $match: {
        "task_payments.status": "pendiente",
        "address.city" : ciudad
        }
    },
    {
        $project: {
        _id: 1,
        username: 1,
        email: 1,
        phone: 1,
        address: 1,
        pendingPayments: {
            $filter: {
            input: "$task_payments",
            as: "payment",
            cond: { $eq: ["$$payment.status", "pendiente"] }
            }
        }
        }
    }
];
/**
 * ! obtener todos los usuarios que tienen pago pendiente y residen en una ciudad en especifico con descripcion del favor V3 3.1.1
 */
const ciudadV3 = "bucaramanga"
export const usuarioPendienteCiudadV3 = [
    {
        $lookup: {
        from: "task",
        localField: "_id",
        foreignField: "user_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "payment",
        localField: "user_tasks._id",
        foreignField: "task_id",
        as: "task_payments"
        }
    },
    {
        $match: {
        "task_payments.status": "pendiente",
        "address.city" : ciudadV3
        }
    },
    {
        $project: {
        _id: 1,
        username: 1,
        email: 1,
        phone: 1,
        address: 1,
        pendingPayments: {
            $filter: {
            input: "$task_payments",
            as: "payment",
            cond: { $eq: ["$$payment.status", "pendiente"] }
            }
        },
        titulo : "$user_tasks.title",
        descripcion : "$user_tasks.description"
        }
    }
];
/**
 * ! obtener la descripcion del favor completo por un usuario en especifico V3 3.2.0
*/
const nombreV3 = "jose david ramirez"
export const usuarioFavor = [
    {
        $lookup: {
        from: "task",
        localField: "_id",
        foreignField: "user_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "payment",
        localField: "user_tasks._id",
        foreignField: "task_id",
        as: "task_payments"
        }
    },
    {
        $match: {
        username : nombreV3
        }
    },
    {
        $project: {
        _id: 1,
        nombre_usuario: "$username",
        email_usuario : "$email",
        telefono_usuario : "$phone", 
        direccion_usuario: "$address",
        titulo : "$user_tasks.title",
        descripcion : "$user_tasks.description",
        estado_favor : "$user_tasks.status",
        precio: "$task_payments.amount",
        metodo_pago : "$task_payments.paymentMethod",
        estado_pago : "$task_payments.status",
        fecha_favor : "$user_tasks.createdAt"
        }
    }
];
/**
 * ! obtener la descripcion del favor completo po un usuario en especifico y el tendero que atendió el favor V3 3.3.1
*/
const nombreV331 = "jose david ramirez"
export const usuarioFavorV331 = [
    {
        $lookup: {
        from: "task",
        localField: "_id",
        foreignField: "user_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "payment",
        localField: "user_tasks._id",
        foreignField: "task_id",
        as: "task_payments"
        }
    },
    {
        $lookup: {
        from: "shopkeeper",
        localField: "_id",
        foreignField: "_id",
        as: "tendero_relacionado"
        }
    },
    {
        $match: {
        username : nombreV331
        }
    },
    {
        $project: {
        _id: 1,
        nombre_usuario: "$username",
        email_usuario : "$email",
        telefono_usuario : "$phone", 
        direccion_usuario: "$address",
        titulo : "$user_tasks.title",
        descripcion : "$user_tasks.description",
        estado_favor : "$user_tasks.status",
        precio: "$task_payments.amount",
        metodo_pago : "$task_payments.paymentMethod",
        estado_pago : "$task_payments.status",
        fecha_favor : "$user_tasks.createdAt",
        nombre_tendero : "$tendero_relacionado.name"
        }
    }
];