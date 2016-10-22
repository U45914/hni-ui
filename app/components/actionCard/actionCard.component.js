(function() {
    angular
        .module('app')
        .component('actionCard', {
            bindings: {
                icon: '@',
                iconText: '@'
            },
            templateUrl: 'app/components/actionCard/action-card.tpl.html',
            controller: ActionCardController,
            controllerAs: 'vm'
        });

    function ActionCardController() {
        var vm = this;

        vm.$onInit = function() {

        };
    }
})();