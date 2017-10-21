/**
 * Created by pipe on 12/09/17.
 */


.controller('perfil_contratista_ctrl',['$scope', '$state', '$stateParams', 'perfil_contratista_serv', 'perfil_admin_serv',
  function($scope, $state, $stateParams, perfil_contratista_serv, perfil_admin_serv){

    $('.modal').modal();
    $('.collapsible').collapsible();
    $('select').material_select();
    $('.datepicker').pickadate({
      selectMonths: false, // Creates a dropdown to control month
      selectYears: 40, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true, // Close upon selecting a date
      formatSubmit: 'yyyy/mm/dd'

    });


    function load() {
      perfil_contratista_serv.getContratista()
        .then(contratista);
      perfil_admin_serv.getServiciosVehiculos()
        .then(servicios_vehiculos);
      perfil_admin_serv.getServiciosBrigadas()
        .then(servicios_brigadas);
      perfil_admin_serv.getFuncionesTrabajadores()
        .then(funciones_trabajadores);
      perfil_admin_serv.getLocalizaciones()
        .then(localizaciones);
    }

    function servicios_vehiculos(res){
      $scope.servicios_vehiculos = res.data;
    }
    function servicios_brigadas(res){
      $scope.servicios_brigadas = res.data;
    }
    function funciones_trabajadores(res){
      $scope.funciones_trabajadores = res.data;
    }
    function localizaciones(res) {
      $scope.localizaciones = res.data;
    }

    function contratista(res) {
      $scope.contratista = res.data[0];
      perfil_contratista_serv.getContactosContratista($scope.contratista.id)
        .then(contactos);
      perfil_contratista_serv.getVehiculosContratista($scope.contratista.id)
        .then(vehiculos);
      perfil_contratista_serv.getTrabajadroesContratista($scope.contratista.id)
        .then(trabajadores);
      perfil_contratista_serv.getBrigadasContratista($scope.contratista.id)
        .then(brigadas);
    }

    function vehiculos(res) {
      $scope.vehiculos = res.data;
      _.forEach($scope.vehiculos, servicio_vehiculo);
    }

    function servicio_vehiculo(vehiculo) {
      perfil_contratista_serv.getServiciosVehiculos(vehiculo.id)
        .then(function (res) {
          vehiculo.servicio = res.data[res.data.length-1];
        });
      perfil_contratista_serv.getUbicacionVehiculos(vehiculo.id)
        .then(function (res) {
          vehiculo.ubicacion = res.data[res.data.length-1];
        });
    }

    function trabajadores(res) {
      $scope.trabajadores = res.data;
      _.forEach($scope.trabajadores, funciones_trabajador);
    }

    function funciones_trabajador(trabajador) {
      perfil_contratista_serv.getFuncionesTrabajador(trabajador.id)
        .then(function (res) {
          trabajador.funciones = _.filter(res.data, function (func) {
            return func.fecha_fin == null;
          });
        });
      perfil_contratista_serv.getUbicacionTrabajador(trabajador.id)
        .then(function (res) {
          trabajador.ubicacion = res.data[res.data.length-1];
        });
    }

    function brigadas(res) {
      $scope.brigadas = res.data;
      _.forEach($scope.brigadas, servicio_brigada);
    }

    function servicio_brigada(brigada) {
      perfil_contratista_serv.getServiciosBrigada(brigada.id)
        .then(function (res) {
          brigada.servicio = res.data[res.data.length-1];
        })
      perfil_contratista_serv.getUbicacionBrigada(brigada.id)
        .then(function (res) {
          brigada.ubicacion = res.data[res.data.length-1];
        })
    }

    function contactos(res) {
      $scope.contactos = res.data;
    }

    $scope.crearContacto = function (contacto) {
      contacto.activo = true;
      perfil_contratista_serv.postContacto(contacto, $scope.contratista.id)
        .then(load);
    };

    $scope.crearVehiculo = function (vehiculo) {
      vehiculo.activo = true;
      perfil_contratista_serv.postVehiculo(vehiculo, $scope.contratista.id)
        .then(function (res) {
          var servicio = {id_vehiculo: res.data.id, id_servicio_vehiculos: vehiculo.id_servicio};
          perfil_contratista_serv.postServiciosVehiculos(servicio).then(load);
          var ubicacion = {id_vehiculo: res.data.id, id_ubicacion: vehiculo.localizacion};
          perfil_contratista_serv.postUbicacionVehiculos(ubicacion).then(load);
        });
    };

    $scope.crearTrabajador = function (trabajador) {
      perfil_contratista_serv.postTrabajador(trabajador, $scope.contratista.id)
        .then(function (res) {
          var funcion1 = {tipo: "Principal", id_funcion: trabajador.funcionP.id_funcion, id_trabajador: res.data.id, fecha_inicio: new Date()};
          perfil_contratista_serv.postFuncionesTrabajador(funcion1).then(load);
          if(trabajador.funcion2.id_funcion){
            var funcion2 = {tipo: "Secundaria", id_funcion: trabajador.funcion2.id_funcion, id_trabajador: res.data.id, fecha_inicio: new Date()};
            perfil_contratista_serv.postFuncionesTrabajador(funcion2).then(load);
          }
          if(trabajador.funcion3.id_funcion){
            var funcion3 = {tipo: "Tercera", id_funcion: trabajador.funcion3.id_funcion, id_trabajador: res.data.id, fecha_inicio: new Date()};
            perfil_contratista_serv.postFuncionesTrabajador(funcion3).then(load);
          }
          var ubicacion = {id_trabajador: res.data.id, id_ubicacion: trabajador.localizacion};
          perfil_contratista_serv.postUbicacionTrabajador(ubicacion).then(load);
        });
    };

    $scope.crearBrigada = function (brigada) {
      perfil_contratista_serv.postBrigada(brigada, $scope.contratista.id)
        .then(function (res) {
          var servicio = {id_servicio: brigada.id_servicio, id_brigada:res.data.id};
          perfil_contratista_serv.postServiciosBrigada(servicio).then(load);
          var ubicacion = {id_brigada: res.data.id, id_ubicacion: brigada.localizacion};
          perfil_contratista_serv.postUbicacionBrigada(ubicacion).then(load);
        });
    };

    $scope.editContacto = function(contacto){
      $scope.editing = true;
      $scope.contacto = contacto;
      $('#conctacto').modal('open');
    };
    $scope.editBrigada = function(brigada){
      $scope.editing = true;
      $scope.brigada = brigada;
      $('#brigada').modal('open');
    };
    $scope.editVehiculo = function(vehiculo){
      $scope.editing = true;
      $scope.vehiculo = vehiculo;
      $('#vehiculo').modal('open');
    };
    $scope.editTrabajador = function(trabajador){
      $scope.editing = true;
      $scope.trabajador = trabajador;
      $('#trabajador').modal('open');
    };

    $scope.updateContacto = function(contacto){
      $scope.editing = false;
      $scope.contacto = {};
      perfil_contratista_serv.updateContacto(contacto)
        .then(load);
    };
    $scope.updateTrabajador = function(trabajador){
      $scope.editing = false;
      $scope.trabajador = {};
      perfil_contratista_serv.updateTrabajador(trabajador)
        .then(load);
      if(trabajador.funcionP && trabajador.funciones[0].id_funcion != trabajador.funcionP.id_funcion){
        var funcionNueva = {tipo: "Principal", id_funcion: trabajador.funcionP.id_funcion, id_trabajador: trabajador.id, fecha_inicio: new Date()};
        var funcionVieja = trabajador.funciones[0];
        funcionVieja.fecha_fin = new Date();
        perfil_contratista_serv.updateFuncionesTrabajador(funcionVieja);
        perfil_contratista_serv.postFuncionesTrabajador(funcionNueva).then(load);
      }
      if(trabajador.funciones[1] && trabajador.funcion2 && trabajador.funciones[1].id_funcion != trabajador.funcion2.id_funcion){
        var funcionNueva = {tipo: "Secundaria", id_funcion: trabajador.funcion2.id_funcion, id_trabajador: trabajador.id, fecha_inicio: new Date()};
        var funcionVieja = trabajador.funciones[1];
        funcionVieja.fecha_fin = new Date();
        perfil_contratista_serv.updateFuncionesTrabajador(funcionVieja);
        perfil_contratista_serv.postFuncionesTrabajador(funcionNueva).then(load);
      }
      if(trabajador.funciones[2] && trabajador.funcion3 &&  trabajador.funciones[2].id_funcion != trabajador.funcion3.id_funcion){
        var funcionNueva = {tipo: "Tercera", id_funcion: trabajador.funcion3.id_funcion, id_trabajador: trabajador.id, fecha_inicio: new Date()};
        var funcionVieja = trabajador.funciones[2];
        funcionVieja.fecha_fin = new Date();
        perfil_contratista_serv.updateFuncionesTrabajador(funcionVieja);
        perfil_contratista_serv.postFuncionesTrabajador(funcionNueva).then(load);
      }
      if(trabajador.localizacion && trabajador.ubicacion.id_ubicacion != trabajador.localizacion){
        var ubicacionNueva = {id_trabajador: trabajador.id, id_ubicacion: trabajador.localizacion};
        var ubicacionVieja = {id: trabajador.ubicacion.id, id_trabajador: trabajador.id, id_ubicacion: trabajador.ubicacion.id_ubicacion, activo: false};
        perfil_contratista_serv.postUbicacionTrabajador(ubicacionNueva);
        perfil_contratista_serv.updateUbicacionTrabajador(ubicacionVieja).then(load);
      }

    };
    $scope.updateVehiculo = function(vehiculo){
      $scope.editing = false;
      $scope.vehiculo = {};
      perfil_contratista_serv.updateVehiculo(vehiculo)
        .then(load);
      if(vehiculo.localizacion && vehiculo.ubicacion && vehiculo.ubicacion.id_ubicacion != vehiculo.localizacion){
        var ubicacionNueva = {id_vehiculo: vehiculo.id, id_ubicacion: vehiculo.localizacion};
        var ubicacionVieja = {id: vehiculo.ubicacion.id, id_vehiculo: vehiculo.id, id_ubicacion: vehiculo.ubicacion.id_ubicacion, activo: false};
        perfil_contratista_serv.postUbicacionVehiculos(ubicacionNueva);
        perfil_contratista_serv.updateUbicacionVehiculos(ubicacionVieja).then(load);
      }else if(!vehiculo.ubicacion && vehiculo.localizacion){
        var ubicacionNueva = {id_vehiculo: vehiculo.id, id_ubicacion: vehiculo.localizacion};
        perfil_contratista_serv.postUbicacionVehiculos(ubicacionNueva).then(load);
      }
      if(vehiculo.id_servicio && vehiculo.id_servicio != vehiculo.servicio.id_servicio_vehiculos){
        var servicioNuevo = {id_vehiculo: vehiculo.id, id_servicio_vehiculos: vehiculo.id_servicio};
        var servicioViejo = {id_vehiculo: vehiculo.id, id_servicio_vehiculos: vehiculo.servicio.id_servicio_vehiculos, activio: false};
        perfil_contratista_serv.postServiciosVehiculos(servicioNuevo);
        perfil_contratista_serv.updateServiciosVehiculos(servicioViejo).then(load);
      }
    };
    $scope.updateBrigada = function(brigada){
      $scope.editing = false;
      $scope.brigada = {};
      perfil_contratista_serv.updateBrigada(brigada)
        .then(load);
    };

    load();

    $scope.patchContratista = function (contratista) {

    }

    $scope.cerrarSession = function(){
      window.sessionStorage.clear();
      $state.go("home");
    }

  }
])
