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

        let button = angular.element($element[0].querySelector('button.button-primary'));

        vm.spinnerShown = false;
        vm.buttonDisabled = false;

        vm.clickFunction = function() {
            let t0 = $window.performance.now();
            let width = button.prop('offsetWidth');
            let otherCss = $element.css('cssText');

            vm.buttonDisabled = true;
            button.attr('style', `width: ${width}px; ${otherCss}`);

            try {
                vm.clickFn().then((response) => {
                    let time = $window.performance.now() - t0;

                    if(time > 100) {
                        vm.spinnerShown = true;

                        $timeout(() => {
                            finishAction(response);
                        }, 1000);
                    }
                    else {
                        finishAction(response);
                    }
                });
            } catch(error) {

            }
        };

        function finishAction(response) {
            $element.removeAttr('style');
            vm.spinnerShown = false;
            vm.buttonDisabled = false;
            vm.stopFn()(response);
        }
    }
})();