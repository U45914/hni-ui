(function(){
    angular
        .module('app')
        .controller('DeleteClientController', DeleteClientController);

    DeleteClientController.$inject = ['$mdDialog', 'clientService', 'client'];

    function DeleteClientController($mdDialog, clientService, client) {
        let vm = this;

        vm.client = client;

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        vm.deleteClient = function() {
            clientService.removeClient(vm.client.id, clientDeletedSuccess, clientDeletedError);

            function clientDeletedSuccess() {
                $mdDialog.hide();
            }

            function clientDeletedError() {
                console.log("Error");
            }
        };
    }
})();