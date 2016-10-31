(function() {
    angular
        .module('app')
        .component('actionsSection', {
            bindings: {},
            templateUrl: 'actions-section.tpl.html',
            controller: ActionSectionController,
            controllerAs: 'vm'
        });

    ActionSectionController.$inject = ['userService'];

    function ActionSectionController(userService) {
        var vm = this;

        vm.$onInit = function() {
            vm.userRole = 1;
        };
    }
})();