(function() {
    angular
        .module('app')
        .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        //$httpProvider.interceptors.push(function() {
        //    return {
        //        'request': function(configuration) {
        //
        //            configuration.headers['Token'] = "Some Token";
        //            return configuration;
        //        }
        //    };
        //});
    }
})();