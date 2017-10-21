'use strict';

module.exports = function(Cuenta) {

	Cuenta.login = function (usuario, clave, cb) {

    var correoInsensitive = new RegExp('.*'+usuario+'.*', "i");
    var filter = {
      where:
        {
          usuario: correoInsensitive,
          clave: clave
        }
    };
    Cuenta.findOne(filter, function (err, instance) {
      if(instance == null){
        cb(null, "Login Invalido", "Usuario o clave incorrectos");
      }
      else{
        var response = instance.id;
        var tipo = instance.rol;
        cb(null, response, tipo);
      }

    });
  };

  Cuenta.remoteMethod(
    'login',
    {
      http: {
        path: '/login',
        verb: 'post'
      },
      description:'Login, ingresa usuario y clave, responde id si correcto',
      accepts: [
        {
          arg: 'usuario',
          type: 'string',
          description: 'Nombre de usuario'
        },
        {
          arg: 'clave',
          type: 'string',
          description: 'Clave del usuario'
        }
      ],
      returns: [
        {
          arg: 'id',
          type: 'number'
        },
        {
          arg: 'tipo',
          type: 'string'
        }
      ]
    }
  );

};
