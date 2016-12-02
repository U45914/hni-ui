(function(){
    angular
        .module('app')
        .controller('NewOrgController', NewOrgController);

    NewOrgController.$inject = ['$mdDialog', 'userService', 'orgService'];

    function NewOrgController($mdDialog, userService, orgService) {
        let vm = this;

        vm.org = {};

        vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function (state) { return { abbrev: state }; });

        vm.dismiss = function () {
            $mdDialog.cancel();
        };

        vm.saveNewOrganization = function() {
            let postData = {
                name: vm.org.name,
                phone: vm.org.phone,
                email: vm.org.email,
                website: vm.org.website,
                addresses: vm.org.addresses || [],
                created:  (new Date).getTime(),
                createdById : userService.getUser().id,
                logo: null
            };

            orgService.postOrg(postData, newOrgSaved, newOrgError);

            function newOrgSaved() {
                $mdDialog.hide();
            }

            function newOrgError() {
                console.log("Error");
            }
        };
    }
})();