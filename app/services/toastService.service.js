(function() {
    angular
        .module('app')
        .service('toastService', toastService);
    	
    toastService.$inject = ['$mdToast'];

    function toastService($mdToast) {
    	var service = {
    		showToast,
    		showToastWithFormatting,
    		showSaveToast
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
          
          function showSaveToast(msg){
        	  service.msg = msg;
        	  $mdToast.show({
        		  hideDelay: 2000,
        		  templateUrl: 'toast-template.tpl.html',
        		  controller: 'toastController',
        		  position: 'top right'
        	  });
        		    
          }	
          
          function showToastWithFormatting(msg){
        	  service.msg = msg;
        	  $mdToast.show({
        		  hideDelay: 7000,
        		  template: '<md-toast >'+
        			  '<div class="md-toast-content md_toast_new_validation" flex >' + msg +'<br /><br /></div> </md-toast>',
        		  position: 'top right'
        	  });
        		    
          }	
 }
})();