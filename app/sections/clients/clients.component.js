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

    ClientsController.$inject = ['$mdDialog', 'topNavService'];

    function ClientsController($mdDialog, topNavService) {
        let vm = this;

        vm.$onInit = function () {
            topNavService.setSelectedItem("clients");

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

            vm.items = [
                {
                    id: 3,
                    firstName: 'Veronica',
                    lastName: 'Bagwell',
                    mobilePhone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    organization: 'The Manna Center'
                },
                {
                    id: 4,
                    firstName: 'Justin',
                    lastName: 'Palmer',
                    mobilePhone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    organization: 'Samaritan Community Center0'
                },
                {
                    id: 5,
                    firstName: 'Kayleigh',
                    lastName: 'Cooper',
                    mobilePhone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    organization: 'The Manna Center'
                },
                {
                    id: 6,
                    firstName: 'Veronica',
                    lastName: 'Bagwell',
                    mobilePhone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    organization: 'The Manna Center'
                },
                {
                    id: 7,
                    firstName: 'Justin',
                    lastName: 'Palmer',
                    mobilePhone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    organization: 'Samaritan Community'
                },
                {
                    id: 8,
                    firstName: 'Kayleigh',
                    lastName: 'Cooper',
                    mobilePhone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    organization: 'The Manna Center'
                }
            ];

            angular.forEach(vm.items, (item) => {
                item = angular.extend(item, {name: `${item.firstName} ${item.lastName}`});
            });
        };

        vm.newClient = function () {
            $mdDialog.show({
                controller: 'NewClientController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-client.tpl.html'
            });
        };

        vm.editClient = function (client) {
            $mdDialog.show({
                controller: 'EditClientController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'edit-client.tpl.html',
                locals : {
                    client : client
                }
            });
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
            });
        };
    }
})();