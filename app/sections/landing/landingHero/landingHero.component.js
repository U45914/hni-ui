(function() {
    angular
        .module('app')
        .component('landingHero', {
            bindings: {},
            templateUrl: 'landing-hero.tpl.html',
            controller: LandingHeroController,
            controllerAs: 'vm'
        });

    function LandingHeroController() {
        var vm = this;
    }
})();