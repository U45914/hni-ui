(function () {
    angular
        .module('app')
        .component('organizations', {
            bindings: {
            },
            templateUrl: 'organizations.tpl.html',
            controller: OrganizationsController,
            controllerAs: 'vm'
        });

    OrganizationsController.$inject = ['$mdDialog', 'topNavService'];

    function OrganizationsController($mdDialog, topNavService) {
        let vm = this;

        vm.$onInit = function () {
            topNavService.setSelectedItem("organizations");

            vm.headerFields = [
                {
                    key: 'org',
                    displayName: 'Org',
                    sortable: true
                },
                {
                    key: 'phone',
                    displayName: 'Phone',
                    sortable: false
                },
                {
                    key: 'email',
                    displayName: 'Email',
                    sortable: true
                },
                {
                    key: 'website',
                    displayName: 'Website',
                    sortable: true
                }
            ];

            vm.items = [
                {
                    id: '3',
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    id: '4',
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    id: '5',
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    id: '6',
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    id: '7',
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    id: '8',
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    id: '9',
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    org: 'The Manna Center'
                }
            ];

            vm.user = {};
        };


        vm.newOrganization = function () {
            $mdDialog.show({
                controller: 'NewOrgController',
                controllerAs: 'vm',
                fullscreen: true,
                parent: angular.element(document.body),
                templateUrl: 'new-organization.tpl.html'
            });
        };

        vm.editClient = function () {
            $mdDialog.show({
                controller: 'EditOrgController',
                controllerAs: 'vm',
                fullscreen: true,
                parent: angular.element(document.body),
                templateUrl: 'edit-organization.tpl.html'
            });
        };

        vm.deleteOrganization = function (item) {
            $mdDialog.show({
                controller: 'DeleteOrgController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'delete-organization.tpl.html',
                locals : {
                    item : item
                }
            });
        };
    }
})();