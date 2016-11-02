(function() {
    angular
        .module('app')
        .component('actionCard', {
            bindings: {
                icon: '@',
                iconText: '@',
                bgImage: '@',
                path: '@'
            },
            templateUrl: 'action-card.tpl.html',
            controller: ActionCardController,
            controllerAs: 'vm'
        });

    ActionCardController.$inject = ['$element', '$location'];

    function ActionCardController($element, $location) {
        var vm = this;

        vm.$onInit = function() {

        };

        vm.navigate = function() {
            $location.path(vm.path);
        }
    }
})();