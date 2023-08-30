

const validatePermissions = (req, res, next) => {
    //Comprueba que el usuario este accediendo a la url permitida para su rol
    const dataUser = req.user
    console.log({"datauser": dataUser});
    if(!(req.baseUrl in dataUser.rol_access)) return res.json({status:401,message: 'This endpoint is not allowed for this user'});
    console.log({"url": req.baseUrl});
    
    let versions = dataUser.rol_access[req.baseUrl];
    console.log({"versions": versions});
    console.log({"headers": req.headers["accept-version"]});
    if(!(versions.includes(req.headers["accept-version"]))) return res.json({status:505,message: 'This version is not allowed'})
    const allowedMethods = dataUser.rol_access[req.baseUrl];
    console.log({"allowedMethods": allowedMethods});
    const currentMethod = req.method.toLowerCase();
    console.log({"currentMethod": currentMethod});
    if (!allowedMethods.includes(currentMethod)) return res.json({status:405, message: 'The method is not allowed'});
    next()
}    





export {
    validatePermissions
}