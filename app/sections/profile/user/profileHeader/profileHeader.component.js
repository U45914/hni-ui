(function() {
    angular
        .module('app')
        .component('profileHeader', {
        bindings: {},
        templateUrl: 'profile-header.tpl.html',
        controller: ProfileHeaderController,
        controllerAs: 'vm'
    });

    ProfileHeaderController.$inject = ['userService'];

    function ProfileHeaderController(userService) {
        var vm = this;
        vm.editInfo = editInfo;

        vm.$onInit = function() {
            vm.user = userService.getUser();
        };

        function editInfo() {
            
        }
    }
})();
