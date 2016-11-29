(function(){
    angular
        .module('app')
        .controller('DeleteClientController', DeleteClientController);

    DeleteClientController.$inject = ['$mdDialog', 'personService', 'client'];

    function DeleteClientController($mdDialog, personService, client) {
        let vm = this;

        vm.client = client;

        vm.dismiss = function () {
            $mdDialog.cancel();
        };

        vm.deleteClient = function() {
            return personService.removePerson(vm.client.id, vm.client.organizationId);
        };

        vm.clientDeletedSuccess = function() {
            $mdDialog.hide(vm.client);
        }
    }
})();