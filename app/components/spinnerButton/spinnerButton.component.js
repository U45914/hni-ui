(function() {
    angular
        .module('app')
        .component('spinnerButton', {
            bindings: {
                text: '@',
                clickFn: '&',
                stopFn: '&'
            },
            template: `<md-button class="spinner-button md-raised button-primary" ng-click="vm.clickFunction()" ng-disabled="vm.buttonDisabled">
                            <span ng-show="!vm.spinnerShown">{{::vm.text}}</span>
                            <md-progress-circular md-mode="indeterminate" md-diameter="20" ng-show="vm.spinnerShown"></md-progress-circular>
                        </md-button>`,
            controller: controller,
            controllerAs: 'vm'
        });

    controller.$inject = ['$element', '$attrs', '$window', '$timeout'];

    function controller($element, $attrs, $window, $timeout) {
        let vm = this;

        vm.spinnerShown = false;
        vm.buttonDisabled = false;

        vm.clickFunction = function() {
            let t0 = $window.performance.now();
            let width = $element.prop('offsetWidth');
            let otherCss = $element.css('cssText');

            vm.buttonDisabled = true;
            $attrs.$set('style', `width: ${width}px; ${otherCss}`);

            vm.clickFn().then(() => {
                let time = $window.performance.now() - t0;

                if(time > 100) {
                    vm.spinnerShown = true;

                    $timeout(() => {
                        vm.stopFn();
                    }, 1000);
                }
            });
        }
    }
})();