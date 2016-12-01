(function () {
    angular
        .module('app')
        .component('clients', {
            bindings: {

            },
            templateUrl: 'clients.tpl.html',
            controller: ClientsController,
            controllerAs: 'vm'
        });

    ClientsController.$inject = ['$mdDialog', 'selectedNavItemService', 'authService', 'personService', 'orgService', 'rolesConstant'];

    function ClientsController($mdDialog, selectedNavItemService, authService, personService, orgService, rolesConstant) {
        let vm = this;

        vm.$onInit = function () {
            selectedNavItemService.setSelectedItem("clients");

            if(authService.getRole().toString() === rolesConstant.superAdmin) {
                personService.getAllPersons(4, setItemsSuccess);
            }
            else if(authService.getRole().toString() === rolesConstant.ngoAdmin) {
                //personService.getPerson(4, setItemsSuccess);
                authService.getNgoAdminOrg();
            }

            vm.headerFields = [
                {
                    key: 'name',
                    displayName: 'Name',
                    sortable: true
                },
                {
                    key: 'mobilePhone',
                    displayName: 'Phone',
                    sortable: false
                },
                {
                    key: 'email',
                    displayName: 'Email',
                    sortable: true
                },
                {
                    key: 'organization',
                    displayName: 'NGO',
                    sortable: true
                }
            ];
        };

        vm.newClient = function () {
            $mdDialog.show({
                controller: 'NewClientController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-client.tpl.html',
                fullscreen: true
            });
        };

        vm.editClient = function (client) {
            $mdDialog.show({
                controller: 'EditClientController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'edit-client.tpl.html',
                fullscreen: true,
                locals : {
                    client : client
                }
            }).then((client) => { replaceClient(client) });
        };

        vm.deleteClient = function (client) {
            $mdDialog.show({
                controller: 'DeleteClientController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'delete-client.tpl.html',
                locals : {
                    client : client
                }
            }).then((client) => { removeClient(client) });
        };

        function setItemsSuccess(response) {
            vm.items = response.data;

            angular.forEach(vm.items, (item) => {
                item = angular.extend(item, {name: `${item.firstName} ${item.lastName}`});
                orgService.getOrgUser(item.id)
                    .then((response) => {
                        item.organization = response.data[0].name;
                        item.organizationId = response.data[0].id;
                    });
            });
        }

        function replaceClient(client) {
            let index = vm.items.map((item) => item.id).indexOf(client.id);
            vm.items[index] = client;
        }

        function removeClient(client) {
            let index = vm.items.map((item) => item.id).indexOf(client.id);
            vm.items.splice(index, 1);
        }
    }
})();