(function() {
    angular
        .module('app')
        .service('popupService', popupService);
    	
    popupService.$inject = ['$mdDialog'];

    function popupService($mdDialog) {
    	var service = {
    			showAlert
    	};
    	  
    	return service;
         
        function showAlert (msg){
        	  service.msg = msg;
        	  
        	   return $mdDialog.show({
                  controller: 'popupController',
                  controllerAs: 'vm',
                  parent: angular.element(document.body),
                  templateUrl: 'popupTemplate.tpl.html'
        		    });
          }         
          
 }
})();