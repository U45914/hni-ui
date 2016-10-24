(function() {
    angular
        .module('app')
        .config(routing);

    routing.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routing($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('base', {
                url: '',
                templateUrl: 'app/views/base.html'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/views/dashboard.html'
            })
    }
})();