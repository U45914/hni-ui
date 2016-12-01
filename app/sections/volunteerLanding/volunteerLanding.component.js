(function() {
    angular
        .module('app')
        .component('volunteerLanding', {
            bindings: {},
            templateUrl: 'volunteer-landing.tpl.html',
            controller: controller,
            controllerAs: 'vm'
        });

    controller.$inject = ['$window', '$state'];

    function controller($window, $state) {
        let vm = this;

        vm.placeOrders = function() {
            $state.go('order-detail');
        };

        vm.openVideo = function() {
            $window.open('https://www.youtube.com/watch?v=aDuojsfsU2c', '_blank');
        };

        vm.signUp = function() {
            $window.open('https://calendly.com/hunger/30-minute-volunteer-session-hunger-not-impossible/12-01-2016', '_blank');
        };
    }
})();