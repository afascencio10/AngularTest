/**
 * Created by Felipe Estrada on 15/12/16.
 */



.factory('perfil_admin_serv', function ($http) {
  var cuentas = "/api/cuentas";
  var serviciosBrigadas = "/api/servicios";
  var serviciosVehiculos = "/api/servicios_vehiculos";
  var funcionesTrabajadores = "/api/funciones";
  var perfiles = "/api/perfiles";
  var perfilCuenta = "/api/perfil_cuenta";
  var localizaciones = "/api/localizaciones";
  var contratista = "/api/contratistas";
  return{
    getCuentas: function () {
      return $http.get(cuentas);
    },
    getContratista: function () {
      return $http.get(contratista);
    },
    getCuentasContratista: function (id_contratista) {
      var url = contratista + "/"+id_contratista+"/cuenta_contratista";
      return $http.get(url);
    },
    getServiciosBrigadas: function () {
      return $http.get(serviciosBrigadas);
    },
    getServiciosVehiculos: function () {
      return $http.get(serviciosVehiculos);
    },
    getFuncionesTrabajadores: function () {
      return $http.get(funcionesTrabajadores);
    },
    getPerfiles: function () {
      return $http.get(perfiles);
    },
    getLocalizaciones: function () {
      return $http.get(localizaciones);
    },
    postCuenta: function (cuenta) {
      return $http.post(cuentas, cuenta);
    },
    postContratista: function (id, contratista) {
      var url = cuentas + "/" + id + "/contratista";
      return $http.post(url, contratista);
    },
    postServicioBrigadas: function (servicio) {
      return $http.post(serviciosBrigadas, servicio);
    },
    postServicioVehiculos: function (servicio) {
      return $http.post(serviciosVehiculos, servicio);
    },
    postFuncionTrabajadores: function (funcion) {
      return $http.post(funcionesTrabajadores, funcion);
    },
    postCrearPerfilCuenta: function (perfil) {
      return $http.post(perfilCuenta, perfil);
    },
    postLocalizaciones : function (localizacion) {
      return $http.post(localizaciones, localizacion);
    },
    updateServiciosBrigada : function (servicio) {
      return $http.put(serviciosBrigadas, servicio);
    },
    updateServicioVehiculo : function (servicio) {
      return $http.put(serviciosVehiculos, servicio);
    },
    updateFuncionTrabajador : function (servicio) {
      return $http.put(funcionesTrabajadores, servicio);
    },
    updateLocalizacion : function (localizacion) {
      return $http.put(localizaciones, localizacion);
    },
    updateContratista: function (contratistas) {
      return $http.put(contratista, contratistas);
    },
    updateCuenta: function (cuenta) {
      return $http.put(cuentas, cuenta);
    }
  }
})
