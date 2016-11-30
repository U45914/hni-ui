(function() {
    angular
        .module('app')
        .factory('resizeService', resizeService);

    resizeService.$inject = ['$window', '$timeout'];

    function resizeService($window, $timeout) {
        let callbackList = [];

        let timeoutPending = false;

        angular.element($window).on('resize', ()=> {
            if(!timeoutPending) {
                timeoutPending = true;

                $timeout(() => {
                    angular.forEach(callbackList, (callback) => {
                        callback();
                    });

                    timeoutPending = false;
                }, 500);
            }
        });

        return {
            registerCallback
        };

        function registerCallback(callback) {
            callbackList.push(callback);
        }
    }
})();