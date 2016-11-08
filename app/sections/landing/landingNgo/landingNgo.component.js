(function() {
    angular
        .module('app')
        .component('landingNgo', {
            bindings: {},
            templateUrl: 'landing-ngo.tpl.html',
            controller: LandingNgoController,
            controllerAs: 'vm'
        });

    function LandingNgoController() {
        var vm = this;
    }
})();