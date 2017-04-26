(function() {
    angular
        .module('app')
        .component('toastTemplate', {
            bindings: {
            	msg:'@'
            },
            templateUrl: 'toast-template.tpl.html',
            controller: ToastCtrl,
            controllerAs: 'vm'
        });
    
    ToastCtrl.inject =['$mdToast'];
    
    function ToastCtrl($mdToast) {
    	let vm = this;

	     vm.closeToast = function() {

	        $mdToast.hide();
	      };
       
    }
})();