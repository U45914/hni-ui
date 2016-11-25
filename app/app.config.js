(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('interceptorService');
    }
})();