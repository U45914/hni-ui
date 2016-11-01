(function() {
    angular
        .module('app')
        .component('organizationCard', {
            bindings: {
                logo: '<',
                name: '<',
                address: '<',
                phone: '<',
                website: '<'
            },
            templateUrl: 'organization-card.tpl.html',
            controller: OrganizationCardController,
            controllerAs: 'vm'
        });

    OrganizationCardController.$inject = ['$state'];

    function OrganizationCardController($state) {
        var vm = this;

        vm.$onInit = function() {

        };

        vm.enterOrg = function() {
            $state.go('order-detail');
        }
    }
})();