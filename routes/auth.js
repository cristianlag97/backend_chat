/*
  path: api/login
*/
const { Router } =  require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
  check('name', 'El nombre es obligatorio').not().isEmpty(), //verificar campo por campo
  check('email', 'El correo es obligatorio').isEmail(), //verificar campo por campo
  check('password', 'La contraseña debe ser mayor o igual a 6 caracteres').not().isEmpty().isLength({ min: 6 }), //verificar campo por campo
  validarCampos
], crearUsuario)

router.post('/', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña debe ser mayor o igual a 6 caracteres').not().isEmpty().isLength({ min: 6 }),
  validarCampos
], login)
//validaJwt
router.get('/renew', validarJWT, renewToken)

module.exports = router;