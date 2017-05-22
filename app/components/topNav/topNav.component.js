(function() {
    angular
        .module('app')
        .component('topNav', {
        bindings: {
            resolve: '=?',
            toggleCollapsedNav: '&'
        },
        transclude: true,
        templateUrl: 'top-nav.tpl.html',
        controller: TopNavController,
        controllerAs: 'vm'
    });

    TopNavController.$inject = ['$scope', '$element', '$transclude', 'userService', 'authService','$rootScope'];

    function TopNavController($scope, $element, $transclude, userService, authService,$rootScope) {
        var vm = this;

        let content = $element[0].querySelector('#toolbar-content');

        vm.showPopup = false;
        vm.userButton = authService.isUserLoggedIn();
        vm.role = authService.getUserRole();
        console.log( vm.userButton);

        $transclude($scope, (clone) => {
            angular.element(content).append(clone);
        });

        vm.$onInit = function() {
            vm.user = userService.getUser();

            if(vm.resolve) {
                Object.keys(vm.resolve).forEach((key) => {
                    $scope[key] = vm.resolve[key];
                });
            }
        };

        vm.togglePopup = function() {
            vm.showPopup = !vm.showPopup;
        }
              
        vm.toggleCollapsedNav = function(){
        	$rootScope.$broadcast("side-nav-lock");
        }
    }
})();