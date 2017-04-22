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
  clientsEnrollmentTabController.$inject = ['$rootScope'];

  function clientsEnrollmentTabController($rootScope) {
      var vm = this;
      
      $rootScope.$on("scroll-tab", function(event, data){
     	 vm.scroll()
      });
       vm.scroll = function(){
     	  if(vm.tabIndex ==  4){
     		  vm.tabIndex = 0;
     	  }
     	  else{
     	  ++vm.tabIndex 
     	  }
       }

  }
  
})();
        