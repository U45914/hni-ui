(function() {
    angular
        .module('app')
        .component('landingDonate', {
            bindings: {},
            templateUrl: 'landing-donate.tpl.html',
            controller: LandingDonateController,
            controllerAs: 'vm'
        });

    function LandingDonateController() {
        var vm = this;
    }
})();