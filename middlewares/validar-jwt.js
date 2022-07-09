const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

  //Leer token
  const token = req.header('x-token');

  if(!token) {
    return res.status(401).json({
      estadoPeticion: false,
      msg: 'No hay token en la aplicación'
    });
  }

  try {

    const { uuid } = jwt.verify( token, process.env.JWT_KEY );
    req.uuid = uuid

    next();

  } catch (error) {
    return res.status(401).json({
      estadoPeticion: false,
      msg: 'Token no válido'
    });
  }


}

module.exports = {
  validarJWT
}