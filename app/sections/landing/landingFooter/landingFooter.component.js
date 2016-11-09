(function() {
    angular
        .module('app')
        .component('landingFooter', {
            bindings: {},
            templateUrl: 'landing-footer.tpl.html',
            controller: LandingFooterController,
            controllerAs: 'vm'
        });

    function LandingFooterController() {
        var vm = this;
    }
})();