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
                url: '/ngo-invitation',
                template: '<ngo-invitation></ngo-invitation>'
            })
            .state('inviteVolunteer', {
                url: '/volunteer-invite',
                template: '<volunteer-invitation></volunteer-invitation>'
            })
            .state('addNgo', {
                url: '/addNgo',
                template: '<add-ngo></add-ngo>'
            })
            .state('credential-setup', {
                url: '/credential-setup',
                template: '<credential-setup></credential-setup>'
            })
            .state('ngoProfile', {
                url: '/ngoProfile',
                template: '<ngo-profile></ngo-profile>'
            })
        	.state('volunteerProfile', {
        		url: '/volunteerProfile',
        		template: '<volunteer-profile></volunteer-profile>'
        	})
        	 .state('clientProfile', {
                url: '/clientProfile',
                template: '<client-profile></client-profile>'
            })
            .state('volunteerTimeAvailability', {
                url: '/volunteerTimeAvailability',
                template: '<volunteer-time-availability></volunteer-time-availability>'
            })
            .state('clientInvitation', {
                url: '/clientInvitation',
                template: '<client-invitation></client-invitation>'
            })
            .state('profile', {
            	url: '/profile',
            	template: '<profile></profile>'
            })
            .state('superUserProfile', {
            	url: '/superUserProfile',
            	template: '<super-user-profile></super-user-profile>'
            })
            .state('profileConfiguration', {
            	url: '/profileConfiguration',
            	template: '<profile-configuration></profile-configuration>'
            })
            .state('volunteerEnrollment', {
                url: '/volunteerEnrollment',
                template: '<volunteer-enrollment></volunteer-enrollment>'
            })
             .state('change-password', {
                url: '/change-password',
                template: '<change-password></change-password>'
            })
            .state('agreement-policy', {
                url: '/agreement-policy',
                template: '<agreement-policy></agreement-policy>',
                params: {'data': null}
            })
            .state('profile-detail', {
                url: '/profile-detail',
                template: '<profile-detail></profile-detail>',
                params: {'data':null}
            })
            .state('provider-detail', {
                url: '/provider-detail',
                template: '<provider-detail></provider-detail>',
                params: {'data':null}
            })
            .state('providerCreate', {
            	url: '/providerCreate',
            	template: '<new-provider></new-provider>'
            })
            .state('menuManagement', {
            	url: '/menuManagement',
            	template: '<menu-management></menu-management>'
            })
            .state('giftCard', {
            	url: '/giftCard',
            	template: '<gift-card></gift-card>'
            })
            ;        
    }
})();
