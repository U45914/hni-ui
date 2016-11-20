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

    LoginController.$inject = ['$auth', '$state', 'authService', 'userService'];

    function LoginController($auth, $state, authService, userService) {
        var vm = this;
        vm.togglePassword = togglePassword;
        vm.inputType = 'password';
        vm.isActive = false;
        vm.signIn = signIn;
        vm.authenticate = authenticate;

        function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    authService.loginExternal(provider, response["access_token"], loginSuccess, loginFailed);
                });
        }

        function loginSuccess(response) {
            userService.setUser(response.data.user);
            $state.go('order-detail');
        }

        function loginFailed(error) {
            console.log(error);
        }

        function togglePassword(){
            vm.isActive = !vm.isActive;
            vm.inputType = vm.isActive ? 'text' : 'password';
        }

        function signIn() {
            authService.login(vm.username, vm.password).then(function() {
                $state.go('dashboard', {}, {reload: true});
            });
        }
    }
})();