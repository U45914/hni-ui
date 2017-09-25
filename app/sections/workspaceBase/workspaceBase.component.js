(function() {
    angular
        .module('app')
        .component('workspaceBase', {
            bindings: {},
            templateUrl: 'workspace-base.tpl.html',
            controller: controller,
            controllerAs: 'vm'
        });

    controller.$inject = ['$element', '$window', '$document', 'selectedNavItemService', 'authService', 'rolesConstant'];

    function controller($element, $window, $document, selectedNavItemService, authService, rolesConstant) {
        let vm = this;

        let topNav = null;
        let collapsedNav = null;

        vm.role = authService.getRole();
        vm.selectedNavItem = selectedNavItemService.getSelectedItem();
        vm.rolesConstant = rolesConstant;
        vm.toggleCollapsedNav = toggleCollapsedNav;

        vm.resolveValues = {
            role: vm.role,
            rolesConstant: vm.rolesConstant,
            selectedNavItem: vm.selectedNavItem,
            toggleCollapsedNav: vm.toggleCollapsedNav
        };

        $document.ready(() => {
            topNav = $document[0].getElementById('top-nav');
            collapsedNav = $element[0].getElementsByClassName('collapsed-nav-menu')[0];
            updateOffset();
        });

        angular.element($window).on('resize', ()=> {
            updateOffset();
        });

        function toggleCollapsedNav() {
            if(collapsedNav) {
                angular.element(collapsedNav).toggleClass('collapsed-nav-menu-shown');
            }
        }

        function updateOffset() {
            let navHeight = topNav.clientHeight;

            if(collapsedNav) {
                collapsedNav.style.top = navHeight + 'px';
            }
        }
    }
})();