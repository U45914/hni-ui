(function() {
    angular
        .module('app')
        .directive('popDown', popDown);

    popDown.$inject = ['$timeout', '$document', '$state', 'authService'];

    function popDown($timeout, $document, $state, authService) {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                popupShown: '='
            },
            template: `<div>
                            <div class="pop-down-container" ng-show="popupShown">
                                <div class="pop-down-triangle"></div>
                                <div class="pop-down-content">
                                    <div class="pop-down-item" md-ink-ripple ng-click="logout()">
                                        <span class="material-icons">&#xE879;</span>
                                        <span>Log Out</span>
                                    </div>
                                </div>
                            </div>
                            <span ng-transclude></span>
                        </div>`,
            link: link
        };

        function link(scope, element, attrs) {
            let triangleHeight = 24;
            let elementHeight = element[0].offsetHeight;
            let top = triangleHeight/2 + elementHeight;
            let body = angular.element($document[0].body);


            element[0].querySelector('.pop-down-container').style.top = `${top}px`;

            scope.closePopup = function() {
                scope.popupShown = false;
            };

            scope.logout = function() {
                $state.go('login');

                $timeout(() => {
                    authService.logout();
                }, 300);
            };

            scope.$watch('popupShown', (newVal, oldVal) => {
                if(newVal !== oldVal) {

                    if(scope.popupShown) {
                        setTimeout(() => {
                            body.on('click', closePopup);
                        }, 10);
                    }
                    else {
                        setTimeout(() => {
                            body.off('click', closePopup);
                        }, 10);
                    }
                }
            });

            function closePopup() {
                scope.$evalAsync(() => {
                    scope.popupShown = false;
                })
            }
        }
    }
})();