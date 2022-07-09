const jwt = require('jsonwebtoken');

const generateJtw = (uuid) => {

  return new Promise((resolve, reject) => {

    const payload = { uuid };

  jwt.sign( payload, process.env.JWT_KEY, {
    expiresIn: '12h'
  }, ( err, token ) => {

    if(err){
      //No se pudo crear el token
      reject('No se pudo generar el jwt')
    } else {
      //TOKEN
      resolve( token );
    }

  })

  });

}

module.exports = {
  generateJtw
}