/**
 * Created by Felipe Estrada on 15/12/16.
 */

angular.module('app',
  ['ui.router',
    'app.controllers',
    'app.directives',
    'app.services',
    'chart.js'
  ])



/**
 * Created by Felipe Estrada on 15/12/16.
 */

angular.module('app')

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .state('perfil_contratista', {
        url: '/contratista',
        templateUrl: 'templates/contratista/perfil_contratista.html',
        controller: 'perfil_contratista_ctrl'
      })
      .state('perfil_admin', {
        url: '/admin',
        templateUrl: 'templates/admin/perfil_admin.html',
        controller: 'perfil_admin_ctrl'
      })
      .state('contratista_admin', {
        url:'/admin/contratista',
        templateUrl: 'templates/admin/contratista_admin.html',
        controller: 'perfil_contratista_ctrl'
      })
      .state('perifl_observador', {
      url:'/admin/observador',
      templateUrl: 'templates/admin/perfil_admin_observador.html',
      controller: 'perfil_admin_ctrl'
      });

    $urlRouterProvider.otherwise('/');
  })

/**
 * Created by pipe on 18/12/16.
 */

angular.module('app.controllers', [])

/**
 * Created by Felipe Estrada on 15/12/16.
 */


  .controller('homeCtrl',['$scope', '$state', '$stateParams', 'homeServ',
    function($scope, $state, $stateParams, homeServ){

      $('.modal').modal();
      $('.collapsible').collapsible();
      $('select').material_select();

      if(window.sessionStorage['tipo'] == "admin"){
        $state.go("perfil_admin");
      }
      else if( window.sessionStorage['tipo'] == 'contratista'){
        $state.go("perfil_contratista");
      }

      $scope.login = function(usuario, clave){
        homeServ.login(usuario, clave)
          .then(function (res) {
            console.log(res);
            if(res.data.id == "Login Invalido"){
              var $toastContent = $('<span>Login Invalido, usuario o clave Incorrectos</span>');
              Materialize.toast($toastContent, 5000);
            }
            else{
              $scope.perfil = res.data;
              homeServ.perfil(res.data.id)
                .then(perfilUsuario);
            }
          })
      };

      function perfilUsuario(res) {
        $scope.tipo = res.data[0];
        if($scope.tipo.nombre == "admin"){
          $state.go('perfil_admin');
          window.sessionStorage.setItem('tipo', $scope.tipo.nombre);
          window.sessionStorage.setItem('id', $scope.perfil.id);
        }
        else if($scope.tipo.nombre == 'contratista'){
          $state.go('perfil_contratista');
          window.sessionStorage.setItem('tipo', $scope.tipo.nombre);
          window.sessionStorage.setItem('id', $scope.perfil.id);
        }else if($scope.tipo.nombre == 'observador'){
          $state.go('contratista_admin_observador');
          window.sessionStorage.setItem('tipo', $scope.tipo.nombre);
          window.sessionStorage.setItem('id', $scope.perfil.id);
        }
      };

    }
  ])

/**
 * Created by Felipe Estrada on 15/12/16.
 */

angular.module('app.directives', [])

  .directive('footerHome', [function () {
    return {
      templateUrl: "templates/footer.html"
    };
  }])

  .directive('headerAdmin', [function () {
    return {
      templateUrl: "templates/admin/adminHeader.html"
    };
  }])

  .directive('searchBar', [function () {
    return {
      templateUrl: "templates/admin/modals/search.html"
    };
  }])

  .directive('controllerHeader', [function () {
    return {
      templateUrl: "templates/contratista/contratista_header.html"
    };
  }])

  .directive('headerObservador', [function () {
    return {
      templateUrl: "templates/admin/observadorHeader.html"
    };
  }])

/**
 * Created by pipe on 18/12/16.
 */

angular.module('app.services', [])

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
