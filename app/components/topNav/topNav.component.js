(function() {
    angular
        .module('app')
        .component('topNav', {
        bindings: {},
        transclude: true,
        templateUrl: 'top-nav.tpl.html',
        controller: TopNavController,
        controllerAs: 'vm'
    });

    TopNavController.$inject = ['$scope', '$element', '$transclude', 'userService', 'topNavService'];

    function TopNavController($scope, $element, $transclude, userService, topNavService) {
        var vm = this;

        let content = $element[0].querySelector('#toolbar-content');

        vm.selectedNavItem = topNavService.getSelectedItem();

        $transclude($scope, (clone) => {
            angular.element(content).append(clone);
        });

        vm.$onInit = function() {
            vm.user = userService.getUser();
        };
    }
})();