(function(){
    angular
        .module('app')
        .controller('DeleteOrgController', DeleteOrgController);

    DeleteOrgController.$inject = ['$mdDialog', 'orgService', 'id'];

    function DeleteOrgController($mdDialog, orgService, id) {
        let vm = this;

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        vm.deleteOrg = function() {
            orgService.removeOrg(id, orgDeletedSuccess, orgDeletedError);

            function orgDeletedSuccess() {
                $mdDialog.hide();
            }

            function orgDeletedError() {
                console.log("Error");
            }
        };
    }
})();