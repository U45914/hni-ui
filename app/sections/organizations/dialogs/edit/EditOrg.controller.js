(function(){
    angular
        .module('app')
        .controller('EditOrgController', EditOrgController);

    EditOrgController.$inject = ['$mdDialog', 'orgService', 'item'];

    function EditOrgController($mdDialog, orgService, item) {
        let vm = this;

        vm.org = angular.copy(item);

        vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (state) {
            return {abbrev: state};
        });

        vm.dismiss = function () {
            $mdDialog.cancel();
        };

        vm.saveOrganization = function () {
            orgService.postOrg(vm.org, editOrgSaved, editOrgError);

            function editOrgSaved() {
                $mdDialog.hide(vm.org);
            }

            function editOrgError() {
                console.log("Error");
            }
        };
    }
})();