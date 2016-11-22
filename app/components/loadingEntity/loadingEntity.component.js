(function() {
    angular
        .module('app')
        .component('loadingEntity', {
            bindings: {
                items: '=',
                contentHidden: '=?'
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
            vm.contentHidden = true;

            $timeout(() => {
                vm.loading = false;
                vm.contentHidden = false;
            }, 1500)
        }, 100);

        $scope.$watchCollection('vm.items', (newVal, oldVal) => {
            if(newVal !== oldVal) {
                if(angular.isArray(vm.items)) {
                    if(vm.items.length > 0 && !vm.contentHidden) {
                        $timeout.cancel(startLoading);
                        vm.loading = false;
                    }
                    else {
                        vm.loading = true;
                    }
                }
                else {
                    if(Object.keys(vm.items).length > 0 && !vm.contentHidden) {
                        $timeout.cancel(startLoading);
                        vm.loading = false;
                    }
                    else {
                        vm.loading = true;
                    }
                }
            }
        })
    }
})();