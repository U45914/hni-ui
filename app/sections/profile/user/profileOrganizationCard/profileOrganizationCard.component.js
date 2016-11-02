(function() {
    angular
        .module('app')
        .component('profileOrganizationCard', {
            bindings: {
                logo: '<',
                name: '<',
                address: '<',
                phone: '<',
                hours: '<'
            },
            templateUrl: 'profile-organization-card.tpl.html',
            controller: ProfileOrganizationCardController,
            controllerAs: 'vm'
        });

    function ProfileOrganizationCardController() {
        var vm = this;
        vm.viewProfile = viewProfile;
        vm.viewOrders = viewOrders;

        vm.$onInit = function() {

        };

        function viewProfile() {

        }

        function viewOrders() {
            
        }
    }
})();
