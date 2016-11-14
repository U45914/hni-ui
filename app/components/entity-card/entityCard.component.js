(function() {
    angular
        .module('app')
        .component('entityCard', {
            bindings: {
                header: '=',
                phone: '=',
                email: '=',
                org: '=',
                content: '=',
                entityItem: '=',
                editFn: '&',
                deleteFn: '&'
            },
            templateUrl: 'entity-card.tpl.html',
            controller: controller,
            controllerAs: 'vm'
        });

    function controller() {
        let vm = this;

        vm.edit = function() {
            vm.editFn()(vm.entityItem);
        };

        vm.delete = function() {
            vm.deleteFn()(vm.entityItem);
        }
    }
})();