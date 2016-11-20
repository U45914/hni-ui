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

    OrganizationsController.$inject = ['$mdDialog', 'topNavService', 'userService', 'orgService'];

    function OrganizationsController($mdDialog, topNavService, userService, orgService) {
        let vm = this;

        vm.$onInit = function () {
            vm.items = '';

            topNavService.setSelectedItem("organizations");
            orgService.getOrgs(userService.getUser().id, getOrgSuccess, getOrgFailure);

            vm.headerFields = [
                {
                    key: 'name',
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

        vm.editClient = function (item) {
            $mdDialog.show({
                controller: 'EditOrgController',
                controllerAs: 'vm',
                fullscreen: true,
                parent: angular.element(document.body),
                templateUrl: 'edit-organization.tpl.html',
                locals : {
                    item : item
                }
            }).then((editedItem) => { replaceItem(editedItem) })
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

        function getOrgSuccess(response) {
            vm.items = response.data;
        }

        function getOrgFailure(error) {
            console.log(error);
        }

        function replaceItem(editedItem) {
            let index = vm.items.map((item) => item.id).indexOf(editedItem.id);
            vm.items[index] = editedItem;
        }
    }
})();