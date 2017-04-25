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

    function controller() {
        let vm = this;

        vm.selectedNavItem = "orders";
    }
})();