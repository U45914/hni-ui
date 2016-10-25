(function() {
    angular
        .module('app')
        .component('organizationSection', {
            bindings: {
                logo: '@'
            },
            templateUrl: 'organization-section.tpl.html',
            controller: OrganizationCardController,
            controllerAs: 'vm'
        });

    OrganizationCardController.$inject = ['userService'];

    function OrganizationCardController(userService) {
        var vm = this;

        vm.$onInit = function() {
            vm.orgs = userService.getOrganizations();
            vm.userRole = 1;
        };
    }
})();