(function () {
    angular
        .module('app')
        .component('organizations', {
            bindings: {

            },
            templateUrl: 'organizations.tpl.html',
            controller: OrganizationsController,
            controllerAs: 'vm'
        });

    OrganizationsController.$inject = ['$mdDialog', 'topNavService'];

    function OrganizationsController($mdDialog, topNavService) {
        let vm = this;

        vm.$onInit = function () {
            topNavService.setSelectedItem("organizations");

            vm.headerFields = [
                {
                    key: 'org',
                    displayName: 'Org',
                    sortable: true
                },
                {
                    key: 'phone',
                    displayName: 'Phone',
                    sortable: false
                },
                {
                    key: 'email',
                    displayName: 'Email',
                    sortable: true
                },
                {
                    key: 'website',
                    displayName: 'Website',
                    sortable: true
                }
            ];

            vm.items = [
                {
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    website: '7hillscenter.org',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    org: 'The Manna Center'
                }
            ];

            vm.user = {};
        };


        vm.newOrganization = function () {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-organization.tpl.html'
            });
        };

        DialogController.$inject = ['$mdDialog', 'orgService'];

        function DialogController($mdDialog, orgService) {
            let vm = this;

            vm.org = {};

            vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; });

            vm.dismiss = function () {
                $mdDialog.hide();
            };

            vm.saveNewOrganization = function() {
                let postData = {
                    name: vm.org.name,
                    phone: vm.org.phone,
                    email: vm.org.email,
                    contact_person: vm.org.contactPerson,
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
                    vm.org = {};
                    $mdDialog.hide();
                }

                function newOrgError() {
                    console.log("Error");
                }
            };
        }
    }
})();