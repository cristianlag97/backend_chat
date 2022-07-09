const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {

  const errores = validationResult(req);

  if(!errores.isEmpty()) {
    return res.status(400).json({
      estadoPeticion: false,
      errors: errores.mapped()
    })
  }

  next();

}


module.exports = {
  validarCampos
}