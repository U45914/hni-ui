(function() {
    angular
        .module('app')
        .component('actionCard', {
            bindings: {
                icon: '@',
                iconText: '@',
                bgImage: '@',
                reportType: '=reportType'
            },
            templateUrl: 'action-card.tpl.html',
            controller: ActionCardController,
            controllerAs: 'vm'
        });

    ActionCardController.$inject = ['$rootScope', '$scope'];

    function ActionCardController($rootScope, $scope) {
        var vm = this;
       
        vm.$onInit = function() {

        };
    }
})();