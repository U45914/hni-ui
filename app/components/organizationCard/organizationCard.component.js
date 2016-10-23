(function() {
    angular
        .module('app')
        .component('organizationCard', {
            bindings: {
                logo: '<',
                name: '<',
                address: '<',
                phone: '<',
                hours: '<'
            },
            templateUrl: 'app/components/organizationCard/organization-card.tpl.html',
            controller: OrganizationCardController,
            controllerAs: 'vm'
        });

    function OrganizationCardController() {
        var vm = this;

        vm.$onInit = function() {

        };
    }
})();