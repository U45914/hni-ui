(function(){
    angular
        .module('app')
        .controller('DeleteOrgController', DeleteOrgController);

    DeleteOrgController.$inject = ['$mdDialog', 'orgService'];

    function DeleteOrgController($mdDialog, orgService) {
        let vm = this;

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        vm.deleteOrg = function() {
            orgService.removeOrg("1", newOrgSaved, newOrgError);

            function newOrgSaved() {
                $mdDialog.hide();
            }

            function newOrgError() {
                console.log("Error");
            }
        };
    }
})();