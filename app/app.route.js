(function() {
    angular
        .module('app')
        .config(routing);

    routing.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routing($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('base', {
                url: '',
                templateUrl: 'app/views/base.html'
            })
            .state('getting-started', {
                //parent: 'base',
                url: '/home',
                templateUrl: 'app/views/home.html'
            })
    }
})();