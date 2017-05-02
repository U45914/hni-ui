(function() {
    angular
        .module('app')
        .component('userDetail', {
        bindings: {
           
        },
        transclude: true,
        templateUrl: 'user-detail.tpl.html',
        controller: UserDetailController,
        controllerAs: 'vm'
    });
    
    UserDetailController.$inject = ['$scope', '$element', 'userService'];
    
    function UserDetailController($scope, $element, userService) {
        var vm = this;
        vm.user;
        
        
        vm.$onInit = function() {
            vm.user = userService.getUser();
        }
        debugger;
    }
    
}
)();
