(function(){
    angular
        .module('app')
        .controller('NewOrgController', NewOrgController);

    NewOrgController.$inject = ['$mdDialog', 'orgService'];

    function NewOrgController($mdDialog, orgService) {
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
                contact_person: vm.org.contactPerson,
                website: vm.org.website,
                addresses: [
                    {
                        address1: vm.org.address,
                        state: vm.org.state,
                        zip: vm.org.zip
                    }
                ]
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