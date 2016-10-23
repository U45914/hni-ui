(function() {
    angular
        .module('app')
        .component('actionCard', {
            bindings: {
                icon: '@',
                iconText: '@',
                bgImage: '@'
            },
            templateUrl: 'app/components/actionCard/action-card.tpl.html',
            controller: ActionCardController,
            controllerAs: 'vm'
        });

    function ActionCardController($element) {
        var vm = this;

        var imageDiv = $element[0].querySelector('.action-card-bg');

        vm.$onInit = function() {

        };

        imageDiv.style.backgroundImage = "url(" + vm.bgImage + ")";
    }
})();