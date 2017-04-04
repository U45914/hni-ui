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
           // vm.userRole = 1;
            vm.user=[
                {
                    "serviceName": "NGO Onboarding",
                    "servicePath": "ngoInvitation",
                    "enabled": "true"
                },
                {
                    "serviceName": "Customer Onboarding",
                    "servicePath": "custOnboard",
                    "enabled": "true"
                },
                {
                    "serviceName": "Clients",
                    "servicePath": "clients",
                    "enabled": "true"
                }
                
            ]
        };
    }
})();