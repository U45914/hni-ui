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

    LoginController.$inject = ['$http', '$auth', '$state', 'authService'];

    function LoginController($http, $auth, $state, authService) {
        var vm = this;
        vm.togglePassword = togglePassword;
        vm.inputType = 'password';
        vm.isActive = false;
        vm.signIn = signIn;
        vm.authenticate = authenticate;

        function authenticate(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    getEmail(response["access_token"]);
                });
        }

        function getEmail(token) {
            $http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + token).then(function(response) {
                console.log(response);
            })
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