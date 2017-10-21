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
