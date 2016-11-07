(function () {
    angular
        .module('app')
        .component('volunteers', {
            bindings: {

            },
            templateUrl: 'volunteers.tpl.html',
            controller: VolunteersController,
            controllerAs: 'vm'
        });

    VolunteersController.$inject = ['$mdDialog'];

    function VolunteersController($mdDialog) {
        let vm = this;

        vm.$onInit = function () {
            vm.headerFields = [
                {
                    key: 'name',
                    displayName: 'Name',
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
                    key: 'org',
                    displayName: 'ORG',
                    sortable: true
                }
            ];

            vm.items = [
                {
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    org: 'The Manna Center'
                }
            ];

            vm.user = {};
        };

        vm.newVolunteer = function () {
            $mdDialog.show({
                controller: NewVolunteerController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-volunteer.tpl.html',
                fullscreen: true
            });
        };

        vm.editVolunteer = function () {
            $mdDialog.show({
                controller: EditVolunteerController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'edit-volunteer.tpl.html',
                fullscreen: true
            });
        };


        NewVolunteerController.$inject = ['$mdDialog'];

        function NewVolunteerController($mdDialog) {
            let vm = this;

            vm.dismiss = function () {
                $mdDialog.hide();
            };
        }

        EditVolunteerController.$inject = ['$mdDialog', 'userService'];

        function EditVolunteerController($mdDialog, userService) {
            let vm = this;

            vm.isSelected = isSelected;
            vm.toggleSelection = toggleSelection;
            vm.selectedOrgs = [];
            vm.querySearch = querySearch;
            vm.orgAdminChecked = false;

            vm.organizations = userService.getOrganizations();
            vm.user = userService.getUser();
            vm.editingUser = {
                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                mobilePhone: vm.user.mobilePhone,
                email: vm.user.email
            };

            vm.dismiss = function () {
                $mdDialog.hide();
            };

            function querySearch (query) {
                var results = query ? vm.organizations.filter( createFilterFor(query) ) : vm.organizations;

                return results;
            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(organization) {
                    return (organization.name.toLowerCase().indexOf(lowercaseQuery) === 0);
                };

            }

            function isSelected(org) {
                return vm.selectedOrgs.indexOf(org) > -1;
            }

            function toggleSelection(org) {
                if (isSelected(org)) {
                    var index = vm.selectedOrgs.indexOf(org);
                    vm.selectedOrgs.splice(index, 1);
                } else {
                    vm.selectedOrgs.push(org);
                }
            }
        }
    }
})();