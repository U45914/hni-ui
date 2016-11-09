(function() {
    angular
        .module('app')
        .component('entityCard', {
            bindings: {
                header: '=',
                phone: '=',
                email: '=',
                org: '=',
                editFn: '&'
            },
            templateUrl: 'entity-card.tpl.html',
            controllerAs: 'vm'
        });
})();