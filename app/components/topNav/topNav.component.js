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

    TopNavController.$inject = ['$scope', '$element', '$transclude', 'userService', 'topNavService', '$timeout', 'authService', 'rolesConstant'];

    function TopNavController($scope, $element, $transclude, userService, topNavService, $timeout, authService, rolesConstant) {
        var vm = this;

        let content = $element[0].querySelector('#toolbar-content');
        let navHeight = 0;
        let collapsedNav = null;

        vm.role = authService.getRole();
        vm.selectedNavItem = topNavService.getSelectedItem();
        vm.rolesConstant = rolesConstant;

        $transclude($scope, (clone) => {
            angular.element(content).append(clone);

           $timeout(() => {
               collapsedNav = $element[0].querySelector('.collapsed-nav-menu');
               navHeight = $element[0].querySelector('#top-nav').clientHeight;

               if(collapsedNav) {
                   collapsedNav.style.top = navHeight + 'px';
               }
           }, 200)
        });

        vm.$onInit = function() {
            vm.user = userService.getUser();
        };

        vm.toggleCollapsedNav = function() {
            if(collapsedNav) {
                angular.element(collapsedNav).toggleClass('collapsed-nav-menu-shown');
            }
        }
    }
})();