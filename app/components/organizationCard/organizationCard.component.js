(function() {
    angular
        .module('app')
        .component('organizationCard', {
            bindings: {
                logo: '@',
            },
            templateUrl: 'app/components/organizationCard/organization-card.tpl.html',
            controller: OrganizationCardController,
            controllerAs: 'vm'
        });

    function OrganizationCardController() {
        var vm = this;

        vm.orgName = "Care Community Center";
        vm.orgAddress = "2510 N 17th St #203Rogers, AR 72756";
        vm.orgPhone = "(479) 246-0104";
        vm.orgHours = "Open today · 9AM–4PM";

        vm.$onInit = function() {

        };
    }
})();