(function() {
    angular
        .module('app')
        .component('landingHero', {
            bindings: {},
            templateUrl: 'landing-hero.tpl.html',
            controller: LandingHeroController,
            controllerAs: 'vm'
        });

    LandingHeroController.$inject = ['hashScroll'];

    function LandingHeroController(hashScroll) {
        var vm = this;

        vm.scrollTo = function(hash) {
            hashScroll.scrollToHash(hash);
        };
    }
})();