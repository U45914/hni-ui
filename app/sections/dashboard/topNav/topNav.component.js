(function() {
    angular
        .module('app')
        .component('topNav', {
        bindings: {},
        templateUrl: 'top-nav.tpl.html',
        controller: TopNavController,
        controllerAs: 'vm'
    });

    TopNavController.$inject = ['userService'];

    function TopNavController(userService) {
        var vm = this;

        vm.$onInit = function() {
            vm.user = userService.getUser();
        };
    }
})();