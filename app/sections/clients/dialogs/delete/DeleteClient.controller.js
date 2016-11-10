(function(){
    angular
        .module('app')
        .controller('DeleteClientController', DeleteClientController);

    DeleteClientController.$inject = ['$mdDialog', 'personService', 'client'];

    function DeleteClientController($mdDialog, personService, client) {
        let vm = this;

        vm.client = client;

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        vm.deleteClient = function() {
            personService.removeClient(vm.client.id, clientDeletedSuccess, clientDeletedError);

            function clientDeletedSuccess() {
                $mdDialog.hide();
            }

            function clientDeletedError() {
                console.log("Error");
            }
        };
    }
})();