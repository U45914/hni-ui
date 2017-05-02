(function() {
    angular
        .module('app')
        .service('toastService', toastService);

    toastService.$inject = ['$mdToast' ];

    function toastService( $mdToast) {
    	return{
    		showToast
    	};
    	  var vm = this;
          var last = {
          	      bottom: false,
          	      top: true,
          	      left: false,
          	      right: true
          	    };

          	var toastPosition = angular.extend({},last);
          	
          function showToast(msg){
        	  $mdToast.show(
        		      $mdToast.simple()
        		        .textContent(msg)
        		       // .position(toastPosition)
        		        .hideDelay(3000)
        		    );  
          }	  
 }
})();