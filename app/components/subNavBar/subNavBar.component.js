(function() {
    angular
        .module('app')
        .component('subNavBar', {
            bindings: {
                icon: '@',
                text: '@',
                showFab: '<',
                fabFn: '&'
            },
            templateUrl: 'sub-nav-bar.tpl.html',
            controllerAs: 'vm'
        });
})();