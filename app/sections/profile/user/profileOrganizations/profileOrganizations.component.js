(function() {
    angular
        .module('app')
        .component('profileOrganizations', {
        bindings: {},
        templateUrl: 'profile-organizations.tpl.html',
        controller: ProfileOrganizationsController,
        controllerAs: 'vm'
    });

    ProfileOrganizationsController.$inject = ['userService'];

    function ProfileOrganizationsController(userService) {
        var vm = this;

        vm.$onInit = function() {
          vm.orgs = userService.getOrganizations();
        };
    }
})();
