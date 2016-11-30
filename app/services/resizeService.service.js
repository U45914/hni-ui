(function() {
    angular
        .module('app')
        .factory('resizeService', resizeService);

    resizeService.$inject = ['$window'];

    function resizeService($window) {
        let callbackList = [];

        angular.element($window).on('resize', ()=> {
            angular.forEach(callbackList, (callback) => {
                callback();
            })
        });

        return {
            registerCallback
        };

        function registerCallback(callback) {
            callbackList.push(callback);
        }
    }
})();