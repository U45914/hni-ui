(function() {
    angular
        .module('app')
        .component('subNavBar', {
            bindings: {
                icon: '@',
                text: '@',
                showFab: '<',
                fabFn: '&'
            },
            templateUrl: 'sub-nav-bar.tpl.html',
            controller: controller,
            controllerAs: 'vm'
        });

    function controller() {
        let vm = this;

        vm.selectedNavItem = "orders";
    }
})();