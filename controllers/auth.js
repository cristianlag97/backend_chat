const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generateJtw } = require('../helpers/jwt');

const crearUsuario = async (req, res) => {

  const { email, password } = req.body

  try {

    const existEmail = await Usuario.findOne({ email });
    if( existEmail ) {
      return res.status(400).json({
        estadoPeticion: false,
        msg: "Credencial no valido"
    })
    }

    const usuario = new Usuario( req.body )

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Generar mi JWT
    const token = await generateJtw( usuario.id )

    res.status(200).json({
      estadoPeticion: true,
      usuario,
      token
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      estadoPeticion: false,
      msg: "Hable con el administrador"
    })
  }
}

const login = async (req, res) => {

  const { email, password } = req.body

  try {

    //validar o encontrar email
    const usuariodb = await Usuario.findOne({email});
    if( !usuariodb ) {
      return res.status(404).json({
        estadoPeticion: false,
        msg: "Valor no valido"
      })
    }

    //validar password
    const validarPassword = bcrypt.compareSync(password, usuariodb.password);
    if ( !validarPassword ) {
      return res.status(404).json({
        estadoPeticion: false,
        msg: "Valor no valido"
      })
    }

    //Generate JWT
    const token = await generateJtw( usuariodb.id );
    res.status(200).json({
      estadoPeticion: true,
      usuariodb,
      token
    })

  } catch (error) {
    res.status(400).json({
      estadoPeticion: false,
      msg: 'Hable con el administrador'
    })
  }
}

const renewToken = async(req, res) => {

  try {
    const uuid = req.uuid
    const token = await generateJtw(uuid)
    const usuario = await Usuario.findById(uuid)

    res.status(200).json({
      estadoPeticion: true,
      usuario,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      estadoPeticion: false,
      msg: 'Hable con el administrador'
    })
  }

}

module.exports = {
  crearUsuario,
  login,
  renewToken
}