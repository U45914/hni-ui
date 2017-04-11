(function () {
  angular
      .module('app')
      .component('ngoEnrollmentTab',{
          bindings: {

          },
          templateUrl: 'ngoEnrollmentTab.tpl.html',
          controller: ngoEnrollmentTabController,
          controllerAs: 'vm'
  }) ;
  
  ngoEnrollmentTabController.$inject = ['$rootScope', '$scope'];

  function ngoEnrollmentTabController($rootScope, $scope) {
      var vm = this;
      vm.tabIndex = 0;
      
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
        