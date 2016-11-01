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

    ClientsController.$inject = [];

    function ClientsController() {
        let vm = this;

        vm.$onInit = function () {
            vm.headerFields = ['name', 'phone', 'email', 'ngo'];
            
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
        };
    }
})();