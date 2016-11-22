(function() {
    angular
        .module('app')
        .factory('timeoutService', timeoutService);

    timeoutService.$inject = ['$interval', '$mdDialog'];

    function timeoutService($interval, $mdDialog) {
        DialogController.$inject = ['$timeout', '$mdDialog', '$state', 'moreTime'];

        let timeout = null;

        return {
            startTimeout,
            cancelTimeout
        };

        function startTimeout() {
            if(timeout === null) {
                timeout = $interval(() => {
                    showPopup();
                }, 900000);
            }
        }

        function cancelTimeout() {
            $interval.cancel(timeout);
            timeout = null;
        }

        function moreTime() {
            cancelTimeout();
            startTimeout();
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
                                    <div class="small-prompt-text" flex="100">Need more time to complete an order?</div>
                                </div>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button class="button-primary" md-ink-ripple="#D65439" ng-click="vm.exitOrders()">No, Exit Orders</md-button>
                                <md-button class="md-raised button-primary" ng-click="vm.moreTime()">Yes</md-button>
                            </md-dialog-actions>
                        </md-dialog>`,
                locals : {
                    moreTime: moreTime
                }
            });
        }

        function DialogController($timeout, $mdDialog, $state, moreTime) {
            let vm = this;

            let exitTimeout = $timeout(() => {
                exit();
            }, 60000);

            vm.exitOrders = function() {
                $timeout.cancel(exitTimeout);
                exit();
            };

            vm.moreTime = function() {
                moreTime();
                $mdDialog.hide();
            };

            function exit() {
                $mdDialog.hide();
                $state.go('login');
            }
        }
    }
})();