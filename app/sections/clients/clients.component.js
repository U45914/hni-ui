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
                    key: 'ngo',
                    displayName: 'NGO',
                    sortable: true
                }
            ];

            vm.items = [
                {
                    id: 3,
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    id: 4,
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    ngo: 'Samaritan Community'
                },
                {
                    id: 5,
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    id: 6,
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    id: 7,
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    ngo: 'Samaritan Community'
                },
                {
                    id: 8,
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    ngo: 'The Manna Center'
                }
            ];

            vm.user = {};
        };

        vm.newClient = function () {
            $mdDialog.show({
                controller: 'NewClientController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-client.tpl.html'
            });
        };

        vm.editClient = function () {
            $mdDialog.show({
                controller: 'EditClientController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'edit-client.tpl.html'
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