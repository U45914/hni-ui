(function() {
    angular
        .module('app')
        .component('landingAbout', {
            bindings: {},
            templateUrl: 'landing-about.tpl.html',
            controller: LandingAboutController,
            controllerAs: 'vm'
        });

    function LandingAboutController() {
        var vm = this;
    }
})();