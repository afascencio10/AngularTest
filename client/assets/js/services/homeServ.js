/**
 * Created by Felipe Estrada on 15/12/16.
 */



  .factory('homeServ', function ($http) {
    var user = "/api/cuentas";
    return{
      login: function (usuario, clave) {
        var login = {usuario: usuario, clave: clave};
        return $http.post(user + "/login", login);
      },
      perfil: function (id) {
        var url = user + "/" + id + "/perfiles";
        return $http.get(url);
      }
    }
  })
