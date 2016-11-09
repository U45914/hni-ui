(function() {
    angular
        .module('app')
        .component('landingGetInvolved', {
            bindings: {},
            templateUrl: 'landing-get-involved.tpl.html',
            controller: LandingGetInvolvedController,
            controllerAs: 'vm'
        });

    function LandingGetInvolvedController() {
        var vm = this;
    }
})();