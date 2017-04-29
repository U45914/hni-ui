(function() {
    angular
        .module('app')
        .component('profile', {
        bindings: {},
        templateUrl: 'profile.tpl.html',
        controller: ProfileController,
        controllerAs: 'vm'
    });

    ProfileController.$inject = ['userService', '$state'];

    function ProfileController(userService, $state) {
        var vm = this;

        vm.$onInit = function() {
        	vm.userRole = window.localStorage.getItem("userRole");
        	if("NGOAdmin" == vm.userRole || "NGO" == vm.userRole) {
    			$state.go("ngoProfile")
    		}else if("Volunteer" == vm.userRole) {
    			$state.go("volunteerProfile")
    		} else if("Client" == vm.userRole) {
    			$state.go("clientProfile")
    		}
        };

    }
})();