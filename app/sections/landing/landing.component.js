(function() {
    angular
        .module('app')
        .component('landing', {
            bindings: {

            },
            templateUrl: 'landing.tpl.html',
            controller: LandingController,
            controllerAs: 'vm'
        });

    LandingController.$inject = ['$state', 'authService'];

    function LandingController($state, authService) {
        var vm = this;
        vm.togglePassword = togglePassword;
        vm.inputType = 'password';
        vm.isActive = false;
        vm.signIn = signIn;

        function togglePassword(){
            vm.isActive = !vm.isActive;
            vm.inputType = vm.isActive ? 'text' : 'password';
        }

        function signIn() {
            authService.landing(vm.username, vm.password).then(function(authenticated) {
                $state.go('dashboard', {}, {reload: true});
            });
        }
    }
})();