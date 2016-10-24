(function() {
    angular
        .module('app')
        .component('actionCard', {
            bindings: {
                icon: '@',
                iconText: '@',
                bgImage: '@'
            },
            templateUrl: 'action-card.tpl.html',
            controller: ActionCardController,
            controllerAs: 'vm'
        });

    ActionCardController.$inject = ['$element'];

    function ActionCardController($element) {
        var vm = this;

        //var imageDiv = $element[0].querySelector('.action-card-bg');
        //imageDiv.style.backgroundImage = "url(" + vm.bgImage + ")";

        vm.$onInit = function() {

        };
    }
})();