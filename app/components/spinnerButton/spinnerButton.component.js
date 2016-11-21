(function() {
    angular
        .module('app')
        .component('spinnerButton', {
            bindings: {
                text: '@',
                clickFn: '&',
                stopFn: '&'
            },
            template: `<md-button class="md-raised button-primary" ng-click="vm.clickFunction()">{{::vm.text}}</md-button>`,
            controller: controller,
            controllerAs: 'vm'
        });

    controller.$inject = ['$timeout', '$window'];

    function controller($timeout, $window) {
        let vm = this;

        vm.clickFunction = function() {
            let t0 = $window.performance.now();

            vm.clickFn().then(() => {
                let time = $window.performance.now() - t0;

                if(time > 50) {
                    $timeout(() => {
                        vm.stopFn();
                    }, 1000);
                }
            });
        }
    }
})();