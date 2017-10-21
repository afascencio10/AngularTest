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
