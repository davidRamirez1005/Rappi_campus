import genCollection from '../helpers/db.js'

const pruebV1 = async(req, res) =>{
    try {
        const {ROL_EMAIL: email_rol, ROL_PASSWORD: psw_rol, ROL_NAME: coleccion_name} = req.body;
        if(coleccion_name === "user"){
            let coleccion = await genCollection(coleccion_name)
            let result = await coleccion.findOne({"email": email_rol, "password": psw_rol});
            (result) ? console.log("ok, si existe") :console.log({status:406, message:"Este usuario no se encuentra registrado"})
            let rol_coleccion = await genCollection("rols")
            let rol_asignado = await rol_coleccion.findOne({"name_rol": coleccion.name}) 
            res.send(rol_asignado)
        }else if(coleccion_name === "shopkeeper"){
            let coleccion = await genCollection(coleccion_name)
            let result = await coleccion.findOne({"email": email_rol, "password": psw_rol});
            (result) ? console.log("ok, si existe") :console.log({status:406, message:"Este usuario no se encuentra registrado"})
            let rol_coleccion = await genCollection("rols")
            let rol_asignado = await rol_coleccion.findOne({"name_rol": coleccion_name}) 
            res.send(rol_asignado)
        }else if(coleccion_name == "admin"){
            
        }
    } catch (error){
        console.log(error);
    }
}


export {
    pruebV1
} 