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
