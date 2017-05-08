(function() {
    angular
        .module('app')
        .component('toastComponent', {
        	templateUrl : 'toast-template.tpl.html',
		controller : toastController,
		controllerAs: 'vm'
        });
    
    toastController.$inject = ['$scope', 'toastService']
    function toastController($scope, toastService) {
    	$scope.msg = toastService.msg;
    	let vm = this;
	    
    	vm.closeToast = function() {
	        $mdToast.hide();
	      };
    }
 
})();