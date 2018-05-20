(function() {
    angular
        .module('app')
        .component('leftNavBar', {
            bindings: {
            	
            },
            templateUrl: 'left-nav-bar.tpl.html',
            controller: controller,
            controllerAs: 'vm'
        });
    controller.$inject = ['$element', '$window', '$document',  'authService', 'rolesConstantName','$rootScope'];
    function controller($element, $window, $document, authService, rolesConstantName, $rootScope) {
        let vm = this;
        vm.selectedNavItem = "orders";
        vm.role = authService.getUserRole();
        vm.rolesConstantName=rolesConstantName;
        vm.showLeft = false;
        vm.child =false;
        vm.parent = function(){
        	if(vm.child == true){
        		vm.child =false;
        	}else{
        		vm.child =true;
        	}
        	
        }
        
        
        vm.logout = function() {
            authService.logout();
        };
        
        $rootScope.$on("side-nav-lock", function() {
        	vm.showLeft = vm.showLeft ? false : true;
		});
        
      
    }
})();