(function() {
    angular
        .module('app')
        .component('landingStats', {
            bindings: {},
            templateUrl: 'landing-stats.tpl.html',
            controller: LandingStatsController,
            controllerAs: 'vm'
        });

    function LandingStatsController() {
        var vm = this;
    }
})();