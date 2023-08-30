/**
 * ? consultas para task
 */
/**
 * ! Obtener todas las tareas ordenadas por fecha y con su salida formateada V1 1.3.0
 V3 3.1.0
 */
export const TaskDate = [
    {
        $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "payment",
        localField: "payment_id",
        foreignField: "task_id",
        as: "task_payments"
        }
    },
    {
        $unwind: "$task_payments"
    }
    ,
    {
        $lookup: {
        from: "shopkeeper",
        localField: "shopkeeper_id",
        foreignField: "_id",
        as: "task_shopkeepers"
        }
    },
    {
        $unwind: "$task_shopkeepers"
    },
    {
        $lookup: {
        from: "category",
        localField: "category_id",
        foreignField: "_id",
        as: "category_task"
        }
    },
    {
        $unwind: "$category_task"
    },
    {
        $project: {
        _id: 0,
        Titulo: "$title",
        Usuario: "$task_user.username",
        Rappi_Tendero: "$task_shopkeepers.name",
        Direccion_tendero: "$task_shopkeepers.address",
        Descripcion: "$description",
        Estado_pedido: "$status",
        Direccion_pedido: {
            Ciudad: "$address.city",
            Calles: "$address.street"
        },
        Categoria_favor: "$category_task.name",
        Precio: "$task_payments.amount",
        Metodo_pago : "$task_payments.paymentMethod",
        Estado_pago : "$task_payments.status",
        Fecha_favor : "$createdAt"
    }}];

/**
 * ! Listar tareas segun su estado con salida formateada V2 2.1.0
 */
export const TaskByState= async (state) => {
    let pipeline ;
    return pipeline =  [
    {$match: {"status": state}},
    {
        $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "payment",
        localField: "payment_id",
        foreignField: "task_id",
        as: "task_payments"
        }
    },
    {
        $unwind: "$task_payments"
    }
    ,
    {
        $lookup: {
        from: "shopkeeper",
        localField: "shopkeeper_id",
        foreignField: "_id",
        as: "task_shopkeepers"
        }
    },
    {
        $unwind: "$task_shopkeepers"
    },
    {
        $lookup: {
        from: "category",
        localField: "category_id",
        foreignField: "_id",
        as: "category_task"
        }
    },
    {
        $unwind: "$category_task"
    },
    {
        $project: {
        _id: 0,
        Titulo: "$title",
        Usuario: "$task_user.username",
        Rappi_Tendero: "$task_shopkeepers.name",
        Direccion_tendero: "$task_shopkeepers.address",
        Descripcion: "$description",
        Estado_pedido: "$status",
        Direccion_pedido: {
            Ciudad: "$address.city",
            Calles: "$address.street"
        },
        Categoria_favor: "$category_task.name",
        Precio: "$task_payments.amount",
        Metodo_pago : "$task_payments.paymentMethod",
        Estado_pago : "$task_payments.status",
        Fecha_favor : "$createdAt"
    }}
   ]};
/**
 * ! listar tareas realizadas un dia en especifico y con su salida formateada V1 1.3.0

 */
export const TaskByDay = (date) => [
    {$match: {"createdAt": new Date(date)}},
    {
        $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "payment",
        localField: "payment_id",
        foreignField: "task_id",
        as: "task_payments"
        }
    },
    {
        $unwind: "$task_payments"
    }
    ,
    {
        $lookup: {
        from: "shopkeeper",
        localField: "shopkeeper_id",
        foreignField: "_id",
        as: "task_shopkeepers"
        }
    },
    {
        $unwind: "$task_shopkeepers"
    },
    {
        $lookup: {
        from: "category",
        localField: "category_id",
        foreignField: "_id",
        as: "category_task"
        }
    },
    {
        $unwind: "$category_task"
    },
    {
        $project: {
        _id: 0,
        Titulo: "$title",
        Usuario: "$task_user.username",
        Rappi_Tendero: "$task_shopkeepers.name",
        Direccion_tendero: "$task_shopkeepers.address",
        Descripcion: "$description",
        Estado_pedido: "$status",
        Direccion_pedido: {
            Ciudad: "$address.city",
            Calles: "$address.street"
        },
        Categoria_favor: "$category_task.name",
        Precio: "$task_payments.amount",
        Metodo_pago : "$task_payments.paymentMethod",
        Estado_pago : "$task_payments.status",
        Fecha_favor : "$createdAt"
    }}
   ]

   /**
    * ? consultas para reviews
   */
  
  
/**
* ! obtener todos los reviews con salida formateada V2 2.1.0
*/
export const reviewV2 = [
    {
        $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "task",
        localField: "task_id",
        foreignField: "_id",
        as: "review_tasks"
        }
    },
    {
        $unwind: "$review_tasks"
    },
    {
        $project: {
        _id: 0,
        Calificacion: "$rating",
       Comentario: "$comment",
        Usuario: "$user_tasks.username",
       
        
    }
}];
  

/**
 * ! //obtener todos los reviews  con salida formateada y ordenadas de mas rankeadas a menos V3 3.1.0
 */
export const reviewOrder = [
    {
        $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "task",
        localField: "task_id",
        foreignField: "_id",
        as: "review_tasks"
        }
    },
    {
        $unwind: "$review_tasks"
    },
    {
        $project: {
        _id: 0,
        Calificacion: "$rating",
       Comentario: "$comment",
        Usuario: "$user_tasks.username",
       
        
    }}
,{
    $sort: {
      Calificacion: -1
    }
}];
/**
 * ! Obtener los review por nombre de usuario con salida formateada V2 2.1.0
*/
export const reviewByUser = (nameUser) => [
    {
        $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "task",
        localField: "task_id",
        foreignField: "_id",
        as: "review_tasks"
        }
    },
    {
        $unwind: "$review_tasks"
    },
    {
        $project: {
        _id: 0,
        Calificacion: "$rating",
       Comentario: "$comment",
        Usuario: "$user_tasks.username",
       
        
    }}
,{
    $match: {
        Usuario: nameUser
    }
}];
/**
 * ! Obtener los review por rating con salida formateada V3 3.1.0
 */

export const reviewByRating =(nota) => [
    {
        $lookup: {
        from: "user",
        localField: "user_id",
        foreignField: "_id",
        as: "user_tasks"
        }
    },
    {
        $unwind: "$user_tasks"
    },
    {
        $lookup: {
        from: "task",
        localField: "task_id",
        foreignField: "_id",
        as: "review_tasks"
        }
    },
    {
        $unwind: "$review_tasks"
    },
    {
        $project: {
        _id: 0,
        Calificacion: "$rating",
       Comentario: "$comment",
        Usuario: "$user_tasks.username",
       
        
    }},
    {
        $match: {
            Calificacion: {$eq: nota}
        },
    },
];

/**
 * ! Peticiones get para category
 */

/**
 * ! Obtener todos las categorias ordenadas alfabeticamente por nombre y con salida formateada v2 2.1.0
 */
export const categoryOrder =[{$project: { "_id":0, Nombre_categoria: "$name",
Descripcion_categoria: "$description",
Icono_FAS: "$icon"}}, {$sort: {
  "Nombre_categoria": 1
}}]

/**
 * ! obtener las cantidades de pedidos que se han realizado de todas las categorias disponibles V3 3.1.0
 */

export const categoryTotal = [
    {
        $lookup: {
            from: "category",
            localField: "category_id",
            foreignField: "_id",
            as: "category_task"
        }
    },
    {
        $unwind: "$category_task"
    },
    {
        $group: {
            _id: "$category_id",
            Nombre_categoria: { $first: "$category_task.name" },
            Numero_de_pedidos: { $sum: 1 }
        }
    },
    { $sort:{
        "Numero_de_pedidos": -1
    }
    }
];


/**
 * ! listar por id las categorias pero con la salida formateada V3 3.1.0
 */
export const categoryById = (parametro) =>[
    {
        $match: { "_id": parametro }
    },
    {
        $project: {
            _id: 0,
          Nombre_categoria: "$name",
          Descripcion_categoria: "$description",
          Icono_FAS: "$icon"
        }
    }
];