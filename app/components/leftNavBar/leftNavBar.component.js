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
    controller.$inject = ['$element', '$window', '$document',  'authService', 'rolesConstantName'];
    function controller($element, $window, $document, authService, rolesConstantName) {
        let vm = this;
        vm.selectedNavItem = "orders";
        vm.role = authService.getUserRole();
        vm.rolesConstantName=rolesConstantName;
        
        
        
        vm.logout = function() {
            authService.logout();
        };
        
    }
})();