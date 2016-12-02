(function() {
    angular
        .module('app')
        .factory('timeoutService', timeoutService);

    timeoutService.$inject = ['$interval', '$mdDialog'];

    function timeoutService($interval, $mdDialog) {
        DialogController.$inject = ['$timeout', '$mdDialog', '$state', 'moreTime', 'moreTimeClicked'];

        let timeout = null;
        let moreTimeClicked = false;

        return {
            startTimeout,
            cancelTimeout
        };

        function startTimeout(time) {
            if(timeout === null) {
                timeout = $interval(() => {
                    showPopup();
                }, time);
            }
        }

        function cancelTimeout() {
            $interval.cancel(timeout);
            timeout = null;
        }

        function moreTime(time) {
            cancelTimeout();
            startTimeout(time);
        }

        function showPopup() {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                template: `
                        <md-dialog class="small-prompt">
                            <md-dialog-content>
                                <div layout="row" layout-wrap>
                                    <i class="material-icons" flex="100">&#xE425;</i>
                                    <div class="small-prompt-text" ng-hide="vm.moreTimeClicked" flex="100">Need more time to complete an order?</div>
                                    <div class="small-prompt-text" ng-hide="!vm.moreTimeClicked" flex="100">Order timed out. Click the exit button to navigate to the landing page.</div>
                                </div>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <div ng-hide="vm.moreTimeClicked">
                                    <md-button class="button-primary" md-ink-ripple="#D65439" ng-click="vm.exitOrders()">No, Exit Orders</md-button>
                                    <md-button class="md-raised button-primary" ng-click="vm.moreTime()">Yes</md-button>
                                </div>
                                <div ng-hide="!vm.moreTimeClicked">
                                    <md-button class="md-raised button-primary" ng-click="vm.exitOrders()">Exit</md-button>
                                </div>
                            </md-dialog-actions>
                        </md-dialog>`,
                locals : {
                    moreTime: moreTime,
                    moreTimeClicked: moreTimeClicked
                }
            }).then((timeClicked) => { moreTimeClicked = timeClicked });
        }

        function DialogController($timeout, $mdDialog, $state, moreTime, moreTimeClicked) {
            let vm = this;

            let exitTimeout = $timeout(() => {
                exit();
            }, 60000);

            vm.moreTimeClicked = moreTimeClicked;

            vm.exitOrders = function() {
                $timeout.cancel(exitTimeout);
                exit();
            };

            vm.moreTime = function() {
                $timeout.cancel(exitTimeout);
                moreTime(300000);
                $mdDialog.hide(true);
            };

            function exit() {
                $mdDialog.cancel();
                $state.go('volunteer-landing');
            }
        }
    }
})();