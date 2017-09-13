(function() {
    angular
        .module('app')
        .component('volunteerLanding', {
            bindings: {},
            templateUrl: 'volunteer-landing.tpl.html',
            controller: controller,
            controllerAs: 'vm'
        });

    controller.$inject = ['$window', '$state', 'selectedNavItemService', 'serviceConstants'];

    function controller($window, $state, selectedNavItemService, serviceConstants) {
        let vm = this;
        let baseUrl = serviceConstants.baseUrl;
        
        vm.$onInit = function() {
            selectedNavItemService.setSelectedItem("none");
        };

        vm.placeOrders = function() {
            $state.go('order-detail');
        };

        vm.openVideo = function() {
            $window.open('https://www.youtube.com/watch?v=aDuojsfsU2c', '_blank');
        };

        vm.signUp = function() {
            $window.open('https://calendly.com/hunger/30-minute-volunteer-session-hunger-not-impossible/12-01-2016', '_blank');
        };

        vm.openEmail = function() {
            $window.location.href = "mailto:mail@example.org";
        };
        
        vm.openPdf = function() {
        	$window.open(`${baseUrl}/help/volunteer/instruction/pdf`, '_blank');
        };
    }
})();