(function() {
    angular
        .module('app')
        .controller('popupController', popupController);
    
    popupController.$inject = ['$scope', 'popupService','$mdDialog']
    function popupController($scope, popupService, $mdDialog) {
    	$scope.msg = popupService.msg;
    	let vm = this;
	    
    	$scope.hide = function() {
    		
                $mdDialog.hide();
    	};
	   
    }
 
})();