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

    LoginController.$inject = ['$location'];

    function LoginController($location) {
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
            $location.path('/dashboard');
        }
    }
})();