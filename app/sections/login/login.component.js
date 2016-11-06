(function() {
    angular
        .module('app')
        .component('login', {
            bindings: {

            },
            templateUrl: 'login.tpl.html',
            controller: LoginController,
            controllerAs: 'vm'
        });

    LoginController.$inject = ['$state', 'authService'];

    function LoginController($state, authService) {
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
            authService.login(vm.username, vm.password).then(function(authenticated) {
                $state.go('dashboard', {}, {reload: true});
            });
        }
    }
})();