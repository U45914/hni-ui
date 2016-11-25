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

    LoginController.$inject = ['authService', 'externalAuthService'];

    function LoginController(authService, externalAuthService) {
        var vm = this;
        vm.togglePassword = togglePassword;
        vm.inputType = 'password';
        vm.isActive = false;
        vm.signIn = signIn;
        vm.authenticate = authenticate;

        function authenticate(provider) {
            externalAuthService.googleAuthenticate()
                .then((response) => {
                    authService.loginExternal(provider, response["access_token"]);
                });
        }

        function togglePassword(){
            vm.isActive = !vm.isActive;
            vm.inputType = vm.isActive ? 'text' : 'password';
        }

        function signIn() {
            //authService.login(vm.username, vm.password).then(function() {
            //    $state.go('dashboard', {}, {reload: true});
            //});
        }
    }
})();