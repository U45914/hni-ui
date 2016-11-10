(function(){
    angular
        .module('app')
        .controller('NewClientController', NewClientController);

    NewClientController.$inject = ['$mdDialog'];

    function NewClientController($mdDialog) {
        let vm = this;

        vm.dismiss = function () {
            $mdDialog.hide();
        };
    }
})();