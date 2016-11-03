(function() {
    angular
        .module('app')
        .component('subNavBar', {
            bindings: {
                icon: '@',
                text: '@'
            },
            templateUrl: 'sub-nav-bar.tpl.html',
            controller: controller,
            controllerAs: 'vm'
        });

    function controller() {

    }
})();