(function() {
    angular
        .module('app')
        .component('landingHero', {
            bindings: {},
            templateUrl: 'landing-hero.tpl.html',
            controller: LandingHeroController,
            controllerAs: 'vm'
        });

    LandingHeroController.$inject = ['hashScroll','$state'];

    function LandingHeroController(hashScroll,$state) {
        var vm = this;

        vm.scrollTo = function(hash) {
            hashScroll.scrollToHash(hash);
        };
        
        vm.load = function(){
        	$state.go('login');
        }
    }
})();