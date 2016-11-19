(function() {
    angular
        .module('app')
        .component('loadingEntity', {
            bindings: {
                items: '='
            },
            template: `<md-progress-circular md-mode="indeterminate" ng-if="vm.loading"></md-progress-circular>`,
            controller: controller,
            controllerAs: 'vm'
        });

    controller.$inject = ['$scope', '$timeout'];

    function controller($scope, $timeout) {
        let vm = this;

        vm.loading = false;

        let startLoading = $timeout(() => {
            vm.loading = true;
        }, 100);

        $scope.$watch('vm.items', (newVal, oldVal) => {
            if(newVal !== oldVal && vm.items.length > 0) {
                $timeout.cancel(startLoading);
                vm.loading = false;
            }
        })
    }
})();