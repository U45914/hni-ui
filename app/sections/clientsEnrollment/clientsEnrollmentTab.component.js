(function () {
  angular
      .module('app')
      .component('clientsEnrollmentTab',{
          bindings: {

          },
          templateUrl: 'clientsEnrollmentTab.tpl.html',
          controller: clientsEnrollmentTabController,
          controllerAs: 'vm'
  }) ;
  clientsEnrollmentTabController.$inject = [];

  function clientsEnrollmentTabController() {
      var vm = this;

  }
  
})();
        