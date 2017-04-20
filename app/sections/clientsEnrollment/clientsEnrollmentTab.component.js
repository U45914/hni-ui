(function () {
  angular
      .module('app')
      .component('clientsEnrollmentTab',{
          bindings: {

          },
          templateUrl: 'clientsEnrollmentTab.tpl.html',
          controller: ngoEnrollmentTabController,
          controllerAs: 'vm'
  }) ;
  ngoEnrollmentTabController.$inject = ['$q','$rootScope', '$scope','ngoEnrollmentService'];

  function ngoEnrollmentTabController($q,$rootScope, $scope,ngoEnrollmentService) {
      var vm = this;
  }
  
})();