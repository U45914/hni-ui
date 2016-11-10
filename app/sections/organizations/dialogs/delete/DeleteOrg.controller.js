(function(){
    angular
        .module('app')
        .controller('DeleteOrgController', DeleteOrgController);

    DeleteOrgController.$inject = ['$mdDialog', 'orgService', 'item'];

    function DeleteOrgController($mdDialog, orgService, item) {
        let vm = this;

        vm.item = item;

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        vm.deleteOrg = function() {
            orgService.removeOrg(vm.item.id, orgDeletedSuccess, orgDeletedError);

            function orgDeletedSuccess() {
                $mdDialog.hide();
            }

            function orgDeletedError() {
                console.log("Error");
            }
        };
    }
})();