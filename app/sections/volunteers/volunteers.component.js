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

    VolunteersController.$inject = ['$q', '$mdDialog', 'selectedNavItemService', 'personService', 'orgService', 'rolesConstant'];

    function VolunteersController($q, $mdDialog, selectedNavItemService, personService, orgService, rolesConstant) {
        let vm = this;

        let tempItems = [];

        vm.$onInit = function () {
            let getAllOrgUsers = [];

            selectedNavItemService.setSelectedItem("volunteers");

            $q.all([
                personService.getAllPersons(rolesConstant.volunteer, getVolunteersSuccess),
                personService.getAllPersons(rolesConstant.superAdmin, getSuperAdminsSuccess),
                personService.getAllPersons(rolesConstant.ngoAdmin, getNgoAdminsSuccess)
            ]).then(() => {
                angular.forEach(tempItems, (item) => {
                    item = angular.extend(item, {name: `${item.firstName} ${item.lastName}`});

                    getAllOrgUsers.push(
                        orgService.getOrgUser(item.id)
                            .then((response) => {
                                if(response.data[0]) {
                                    item.organization = response.data[0].name;
                                    item.organizationId = response.data[0].id;
                                }
                            })
                    )
                });
            }).then(() => {
                $q.all(getAllOrgUsers)
                    .then(() => {
                        vm.items = tempItems;
                    })
            });

            vm.headerFields = [
                {
                    key: 'name',
                    displayName: 'Name',
                    sortable: true
                },
                {
                    key: 'mobilePhone',
                    displayName: 'Phone',
                    sortable: false
                },
                {
                    key: 'email',
                    displayName: 'Email',
                    sortable: true
                },
                {
                    key: 'organization',
                    displayName: 'ORG',
                    sortable: true
                }
            ];
        };

        vm.newVolunteer = function () {
            $mdDialog.show({
                controller: 'NewVolunteerController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-volunteer.tpl.html',
                fullscreen: true
            });
        };

        vm.editVolunteer = function (volunteer) {
            $mdDialog.show({
                controller: 'EditVolunteerController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'edit-volunteer-superadmin.tpl.html',
                fullscreen: true,
                locals : {
                    volunteer : volunteer
                }
            }).then((volunteer) => { replaceVolunteer(volunteer) });
        };

        vm.deleteVolunteer = function (volunteer) {
            $mdDialog.show({
                controller: 'DeleteVolunteerController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'delete-volunteer.tpl.html',
                locals : {
                    volunteer : volunteer
                }
            }).then((volunteer) => { removeVolunteer(volunteer) });
        };

        function getVolunteersSuccess(response) {
            getPersonSuccess(response.data, rolesConstant.volunteer);
        }

        function getSuperAdminsSuccess(response) {
            getPersonSuccess(response.data, rolesConstant.superAdmin);
        }

        function getNgoAdminsSuccess(response) {
            getPersonSuccess(response.data, rolesConstant.ngoAdmin);
        }

        function getPersonSuccess(data, role) {
            angular.forEach(data, (item) => {
                if(item !== null) {
                    angular.extend(item, {role: role});
                    tempItems.push(item);
                }
            });
        }

        function replaceVolunteer(volunteer) {
            let index = vm.items.map((item) => item.id).indexOf(volunteer.id);
            vm.items[index] = volunteer;
        }

        function removeVolunteer(volunteer) {
            let index = vm.items.map((item) => item.id).indexOf(volunteer.id);
            vm.items.splice(index, 1);
        }
    }
})();