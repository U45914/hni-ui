(function() {
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
            .state('clients', {
                url: '/clients',
                template: '<clients></clients>'
            })
            .state('viewedit', {
                url: '/viewedit',
                template: '<client-view-edit></client-view-edit>'
            })
    }
})();