(function() {
    angular
        .module('app')
        .service('toastService', toastService);
    	
    toastService.$inject = ['$mdToast'];

    function toastService($mdToast) {
    	var service = {
    		showToast
    	};
    	  
    	return service;
         
          function showToast(msg){
        	  service.msg = msg;
        	  $mdToast.show({
        		  hideDelay: 5000,
        		  templateUrl: 'toast-template.tpl.html',
        		  controller: 'toastController',
        		  position: 'top right'
        	  });
        		    
          }	  
 }
})();