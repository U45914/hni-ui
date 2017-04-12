(function () {
    angular
        .module('app')
        .config(routing);

    routing.$inject = ['$stateProvider', '$urlRouterProvider', 'rolesConstant'];

    function routing($stateProvider, $urlRouterProvider, rolesConstant) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>'
            })
            .state('landing', {
                url: '/',
                template: '<landing></landing>'
            })
            .state('login', {
                url: '/login',
                template: '<login></login>'
            })
            .state('join-user', {
                url: '/join-user/{type}/{activationCode}',
                template: '<join-user></join-user>'
            })
            .state('workspace-base', {
                abstract: false,
                template: '<workspace-base></workspace-base>'
            })
            .state('volunteer-landing', {
                parent: 'workspace-base',
                url: '/volunteer-landing',
                template: '<volunteer-landing></volunteer-landing>'
            })
            .state('order-detail', {
                parent: 'workspace-base',
                url: '/order-detail',
                template: '<order-detail></order-detail>'
            })
            .state('user-profile', {
                url: '/user-profile',
                template: '<user-profile></user-profile>'
            })
            .state('clients', {
                parent: 'workspace-base',
                url: '/clients',
                template: '<clients></clients>',
                data: {
                    authorizedRoles: [rolesConstant.superAdmin, rolesConstant.ngoAdmin]
                }
            })
            .state('organizations', {
                parent: 'workspace-base',
                url: '/organizations',
                template: '<organizations></organizations>',
                data: {
                    authorizedRoles: [rolesConstant.superAdmin]
                }
            })
            .state('volunteers', {
                parent: 'workspace-base',
                url: '/volunteers',
                template: '<volunteers></volunteers>',
                data: {
                    authorizedRoles: [rolesConstant.superAdmin]
                }
            })
            .state('ngoInvitation', {
                url: '/ngoInvitation',
                template: '<ngo-invitation></ngo-invitation>'
            })
              .state('ngoEnrollment', {
                url: '/ngoEnrollment',
                template: '<ngo-enrollment></ngo-enrollment>'
            })
           
            .state('ngoEnrollmentTab', {
                url: '/ngoEnrollmentTab',
                template: '<ngo-enrollment-tab></ngo-enrollment-tab>'
            });
             
    }
})();
