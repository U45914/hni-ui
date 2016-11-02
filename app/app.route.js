(function () {
    angular
        .module('app')
        .config(routing);

    routing.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routing($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>'
            })
            .state('login', {
                url: '/login',
                template: '<login></login>'
            })

            .state('order-detail', {
                url: '/order-detail',
                template: '<order-detail></order-detail>'
            })
            .state('user-profile', {
                url: '/user-profile',
                template: '<user-profile></user-profile>'
            })
            .state('clients', {
                url: '/clients',
                template: '<clients></clients>'
            })
            .state('organizations', {
                url: '/organizations',
                template: '<organizations></organizations>'
            })
            .state('volunteers', {
                url: '/volunteers',
                template: '<volunteers></volunteers>'
            });
    }
})();
