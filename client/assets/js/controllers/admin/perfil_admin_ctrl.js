/**
 * Created by pipe on 13/09/17.
 */

.controller('perfil_admin_ctrl',['$scope', '$state', '$stateParams', 'perfil_admin_serv',
  function($scope, $state, $stateParams, perfil_admin_serv){

    $('.modal').modal();
    $('.collapsible').collapsible();
    $('select').material_select();

    function load() {
      perfil_admin_serv.getCuentas()
        .then(cuentas);
      perfil_admin_serv.getServiciosVehiculos()
        .then(servicios_vehiculos);
      perfil_admin_serv.getServiciosBrigadas()
        .then(servicios_brigadas);
      perfil_admin_serv.getFuncionesTrabajadores()
        .then(funciones_trabajadores);
      perfil_admin_serv.getPerfiles()
        .then(perfiles);
      perfil_admin_serv.getLocalizaciones()
        .then(localizaciones);
      perfil_admin_serv.getContratista()
        .then(contratistas);
    }

    function cuentas(res) {
      $scope.cuentas = res.data;
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
    function perfiles(res) {
      $scope.perfiles = res.data;
    }
    function localizaciones(res) {
      $scope.localizaciones = res.data;
    }
    function contratistas(res) {
      $scope.contratistas = res.data;
      _.forEach($scope.contratistas, cuentasContratista);
    }
    function cuentasContratista(contratista) {
      perfil_admin_serv.getCuentasContratista(contratista.id)
        .then(function (res) {
          contratista.cuentas = res.data;
        })
    }

    $scope.seeContratista = function (id) {
      window.sessionStorage.setItem("id", id);
      $state.go('contratista_admin');
    };
    $scope.crearCuenta = function (cuenta) {
      perfil_admin_serv.postCuenta(cuenta)
        .then(function (res) {
          var perfilCuenta = {id_cuenta: res.data.id, id_perfil: cuenta.perfil};
          perfil_admin_serv.postCrearPerfilCuenta(perfilCuenta).then(load);
          if(cuenta.perfil == 2){
            var contratista = {rut: cuenta.rut, nombre: cuenta.nombre, razon_social: cuenta.razon_social};
            perfil_admin_serv.postContratista(res.data.id, contratista).then(load);
          }
        })
    };
    $scope.crearServicioBrigada = function (servicio) {
      perfil_admin_serv.postServicioBrigadas(servicio)
        .then(load);
    };
    $scope.crearServicioVehiculo = function (servicio) {
      perfil_admin_serv.postServicioVehiculos(servicio)
        .then(load);
    };
    $scope.crearFuncionTrabajador = function (servicio) {
      perfil_admin_serv.postFuncionTrabajadores(servicio)
        .then(load);
    };

    $scope.crearLocalizacion = function (localizacion) {
      perfil_admin_serv.postLocalizaciones(localizacion)
        .then(load);
    };

    $scope.editLocalizacion = function(localizacion){
      $scope.editing = true;
      $scope.localizacion = localizacion;
      $('#localizaciones').modal('open');
    };
    $scope.editServicioBrigadas = function(servicio){
      $scope.editing = true;
      $scope.servicio = servicio;
      $('#servicioBrigadas').modal('open');
    };
    $scope.editServiciosVehiculos = function(servicio){
      $scope.editing = true;
      $scope.servicio = servicio;
      $('#servicioVehiculos').modal('open');
    };
    $scope.editFuncionesTrab = function(servicio){
      $scope.editing = true;
      $scope.servicio = servicio;
      $('#servicioTrabajadores').modal('open');
    };

    $scope.updateServiciosBrigada = function(servicio){
      $scope.editing = false;
      $scope.servicio = {};
      perfil_admin_serv.updateServiciosBrigada(servicio)
        .then(load);
    };
    $scope.updateServicioVehiculo = function(servicio){
      $scope.editing = false;
      $scope.servicio = {};
      perfil_admin_serv.updateServicioVehiculo(servicio)
        .then(load);
    };
    $scope.updateFuncionTrabajador = function(servicio){
      $scope.editing = false;
      $scope.servicio = {};
      perfil_admin_serv.updateFuncionTrabajador(servicio)
        .then(load);
    };
    $scope.updateLocalizacion = function(localizacion){
      $scope.editing = false;
      $scope.localizacion = {};
      perfil_admin_serv.updateLocalizacion(localizacion)
        .then(load);
    };
    $scope.editContratista = function (contratista) {
      $scope.editing = true;
      $scope.contat = contratista;
      if(contratista.cuentas){
        $scope.editingCont = contratista.cuentas.length;
      }
      $('#contrat').modal('open');
    };
    $scope.updateContratista = function (contratista) {
      $scope.contat = {};
      $scope.editing = false;
      perfil_admin_serv.updateContratista(contratista)
        .then(load);
      _.forEach(contratista.cuentas, function(cuenta){
        perfil_admin_serv.updateCuenta(cuenta).then(load);
      })
    };

    $scope.crearContratista = function (contratista) {
      _.forEach(contratista.cuentas, function (cuenta, index) {
        perfil_admin_serv.postCuenta(cuenta)
          .then(function (res) {
            var perfilCuenta = {id_cuenta: res.data.id, id_perfil: cuenta.perfil};
            perfil_admin_serv.postCrearPerfilCuenta(perfilCuenta).then(load);
            if(cuenta.perfil == 2 && index == 1){
              var contratista = {rut: contratista.rut, nombre: contratista.nombre, razon_social: contratista.razon_social};
              perfil_admin_serv.postContratista(res.data.id, contratista).then(load);
            }
          })
      })
    };

    load();

    $scope.cerrarSession = function(){
      window.sessionStorage.clear();
      $state.go("home");
    }

  }
])
