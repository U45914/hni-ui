(function() {
    angular
        .module('app')
        .component('userProfile', {
        bindings: {},
        templateUrl: 'user-profile.tpl.html',
        controller: UserProfileController,
        controllerAs: 'vm'
    });

    UserProfileController.$inject = ['userService'];

    function UserProfileController(userService) {
        var vm = this;
        vm.addOrganization = addOrganization;

        vm.$onInit = function() {
            vm.user = userService.getUser();
        };

        function addOrganization() {
            
        }
    }
})();
