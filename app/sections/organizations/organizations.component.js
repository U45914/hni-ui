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

    OrganizationsController.$inject = ['$mdDialog'];

    function OrganizationsController($mdDialog) {
        let vm = this;

        vm.$onInit = function () {
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

        DialogController.$inject = ['$mdDialog'];

        function DialogController($mdDialog) {
            let vm = this;

            vm.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; });

            vm.dismiss = function () {
                $mdDialog.hide();
            };
        }
    }
})();