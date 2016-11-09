(function() {
    angular
        .module('app')
        .component('landingHowItWorks', {
            bindings: {},
            templateUrl: 'landing-how-it-works.tpl.html',
            controller: LandingHowItWorksController,
            controllerAs: 'vm'
        });

    function LandingHowItWorksController() {
        var vm = this;
    }
})();