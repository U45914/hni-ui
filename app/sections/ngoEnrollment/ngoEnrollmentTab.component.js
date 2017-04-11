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
  
  ngoEnrollmentTabController.$inject = [];

  function ngoEnrollmentTabController() {
      var vm = this;
      vm.tabIndex = 0;
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
        