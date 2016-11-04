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

    ClientsController.$inject = ['$mdDialog'];

    function ClientsController($mdDialog) {
        let vm = this;

        vm.$onInit = function () {
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
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    ngo: 'Samaritan Community'
                },
                {
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    ngo: 'Samaritan Community'
                },
                {
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
                controller: DialogController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-client.tpl.html'
            });
        };

        DialogController.$inject = ['$mdDialog'];

        function DialogController($mdDialog) {
            let vm = this;

            vm.dismiss = function () {
                $mdDialog.hide();
            };
        }
    }
})();