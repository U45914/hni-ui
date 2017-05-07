(function() {
    angular
        .module('app')
        .controller('toastController', toastController);
    
    toastController.$inject = ['$scope', 'toastService']
    function toastController($scope, toastService) {
    	$scope.msg = toastService.msg;
    	let vm = this;
	    
    	vm.closeToast = function() {
	        $mdToast.hide();
	      };
    }
 
})();