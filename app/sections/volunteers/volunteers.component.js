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
                    key: 'ngo',
                    displayName: 'NGO',
                    sortable: true
                }
            ];

            vm.items = [
                {
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    ngo: 'Samaritan Community'
                },
                {
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    ngo: 'The Manna Center'
                },
                {
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    ngo: 'Samaritan Community'
                },
                {
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    ngo: 'The Manna Center'
                }
            ];

            vm.user = {};
        };

        vm.newVolunteer = function () {
            $mdDialog.show({
                controller: NewVolunteerController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-volunteer.tpl.html'
            });
        };

        vm.editVolunteer = function () {
            $mdDialog.show({
                controller: EditVolunteerController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'edit-volunteer.tpl.html'
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
            vm.ngoAdminChecked = false;

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

            function isSelected(ngo) {
                return vm.selectedOrgs.indexOf(ngo) > -1;
            }

            function toggleSelection(ngo) {
                if (isSelected(ngo)) {
                    var index = vm.selectedOrgs.indexOf(ngo);
                    vm.selectedOrgs.splice(index, 1);
                } else {
                    vm.selectedOrgs.push(ngo);
                }
            }
        }
    }
})();