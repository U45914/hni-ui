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
            var user = userService.getUser();
            vm.username = "veronica.bagwell@walmart.com";
        };
    }
})();