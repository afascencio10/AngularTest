/**
 * Created by Felipe Estrada on 15/12/16.
 */



.factory('perfil_contratista_serv', function ($http) {
  var contratista_cuenta = "/api/cuentas/";
  var contratista = "/api/contratistas";
  var vehiculos = "/api/vehiculos";
  var trabajadores = "/api/trabajadores";
  var brigadas = "/api/brigadas";
  var contactos = "/api/contactos";
  var servicio_brigadas = "/api/servicio_brigadas";
  var servicio_vehiculos = "/api/servicio_vehiculos";
  var funcion_trabajador = "/api/funcion_trabajadors";
  var ubicacion_vehiculo = "/api/ubicacion_vehiculos";
  var ubicacion_trabajador = "/api/ubicacion_trabajadores";
  var ubicacion_brigada = "/api/ubicacion_brigadas";
  return{
    getContratista: function () {
      var url = contratista_cuenta + window.sessionStorage['id'] + "/contratista";
      return $http.get(url);
    },
    getContactosContratista: function (id) {
      var url = contratista + "/" + id + "/contactos";
      return $http.get(url);
    },
    getVehiculosContratista: function (id) {
      var url = contratista + "/" + id + "/vehiculos_contratista";
      return $http.get(url);
    },
    getTrabajadroesContratista: function (id) {
      var url = contratista + "/" + id + "/trabajadores_contratista";
      return $http.get(url);
    },
    getBrigadasContratista: function (id) {
      var url = contratista + "/" + id + "/brigadas_contratista";
      return $http.get(url);
    },
    getServiciosBrigada: function (id) {
      var url = brigadas + "/" + id + "/servicio";
      return $http.get(url);
    },
    getServiciosVehiculos: function (id) {
      var url = vehiculos + "/" + id + "/servicio_veh?[filter][include][serviciosVehiculos]";
      return $http.get(url);
    },
    getFuncionesTrabajador: function (id) {
      var url = trabajadores + "/" + id + "/funciones_trabaj?[filter][include][funcion]";
      return $http.get(url);
    },
    getUbicacionBrigada: function (id) {
      var url = brigadas + "/" + id + "/ubicacionBrigada";
      return $http.get(url);
    },
    getUbicacionVehiculos: function (id) {
      var url = vehiculos + "/" + id + "/ubicacionVeh?[filter][include][localizacion]";
      return $http.get(url);
    },
    getUbicacionTrabajador: function (id) {
      var url = trabajadores + "/" + id + "/ubicacionTrabaj?[filter][include][localizacion]";
      return $http.get(url);
    },
    getUbicacionContacto: function (id) {
      var url = contactos + "/" + id + "/ubicacionTrabaj";
      return $http.get(url);
    },
    postContacto: function (contacto, id) {
      var url = contratista + "/" + id + "/contactos";
      return $http.post(url, contacto);
    },
    postVehiculo: function (vehiculo, id) {
      var url = contratista + "/" + id + "/vehiculos_contratista";
      return $http.post(url, vehiculo);
    },
    postTrabajador: function (trabajador, id) {
      var url = contratista + "/" + id + "/trabajadores_contratista";
      return $http.post(url, trabajador);
    },
    postBrigada: function (brigada, id) {
      var url = contratista + "/" + id + "/brigadas_contratista";
      return $http.post(url, brigada);
    },
    postServiciosBrigada: function (servicio) {
      return $http.post(servicio_brigadas, servicio);
    },
    postServiciosVehiculos: function (servicio) {
      return $http.post(servicio_vehiculos, servicio);
    },
    postFuncionesTrabajador: function (funcion) {
      return $http.post(funcion_trabajador, funcion);
    },
    postUbicacionBrigada: function (ubicacion) {
      return $http.post(ubicacion_brigada, ubicacion);
    },
    postUbicacionVehiculos: function (ubicacion) {
      return $http.post(ubicacion_vehiculo, ubicacion);
    },
    postUbicacionTrabajador: function (ubicacion) {
      return $http.post(ubicacion_trabajador, ubicacion);
    },
    updateContacto: function(contacto){
      return $http.put(contactos, contacto);
    },
    updateTrabajador: function (trabajador) {
      return $http.put(trabajadores, trabajador);
    },
    updateVehiculo: function (vehiculo) {
      return $http.put(vehiculos, vehiculo);
    },
    updateBrigada: function (brigada) {
      return $http.put(brigadas, brigada);
    },
    updateServiciosBrigada: function (servicio) {
      return $http.put(servicio_brigadas, servicio);
    },
    updateServiciosVehiculos: function (servicio) {
      return $http.put(servicio_vehiculos, servicio);
    },
    updateFuncionesTrabajador: function (funcion) {
      return $http.put(funcion_trabajador, funcion);
    },
    updateUbicacionBrigada: function (ubicacion) {
      return $http.put(ubicacion_brigada, ubicacion);
    },
    updateUbicacionVehiculos: function (ubicacion) {
      return $http.put(ubicacion_vehiculo, ubicacion);
    },
    updateUbicacionTrabajador: function (ubicacion) {
      return $http.put(ubicacion_trabajador, ubicacion);
    }
  }
})
