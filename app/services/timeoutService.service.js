(function() {
    angular
        .module('app')
        .factory('timeoutService', timeoutService);

    timeoutService.$inject = ['$mdDialog'];

    function timeoutService($mdDialog) {

        return {
            showPopup: showPopup
        };

        function showPopup() {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                template: `
                        <md-dialog class="timeout-popup">
                            <md-dialog-content>
                                <div layout="row" layout-wrap>
                                    <i class="material-icons" flex="100">&#xE425;</i>
                                    <div class="timeout-popup-text" flex="100">Need more time to complete an order?</div>
                                </div>
                            </md-dialog-content>
                            <md-dialog-actions>
                                <md-button md-ink-ripple="#D65439">No, Exit Orders</md-button>
                                <md-button class="md-raised button-primary" ng-click="vm.hide()">Yes</md-button>
                            </md-dialog-actions>
                        </md-dialog>`
            });
        }

        function DialogController($mdDialog) {
            let vm = this;

            vm.hide = function () {
                $mdDialog.hide();
            };
        }
    }
})();