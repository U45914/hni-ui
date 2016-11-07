(function () {
    angular
        .module('app')
        .component('orderDetail', {
            bindings: {

            },
            templateUrl: 'order-detail.tpl.html',
            controller: OrderDetailController,
            controllerAs: 'vm'
        });

    OrderDetailController.$inject = ['$mdDialog', '$state', '$window', '$element'];

    function OrderDetailController($mdDialog, $state, $window, $element) {
        DialogController.$inject = ['$mdDialog', '$state'];

        let vm = this;

        vm.currentStep = 1;
        vm.mealAmount = null;

        vm.$onInit = function () {
            vm.user = {
                name: "Veronica Bagwell",
                phone: "(479) 313-5606",
                email: "veronica.bagwell@walmart.com",
                organization: "7 Hills Homeless Center"
            };

            vm.orderInfo = {
                name: "Subway",
                foodItem: "Turkey Sandwich",
                time: "12:30pm",
                address: "2301 W Walnut St",
                city: "Rogers",
                state: "AR",
                phone: "(479) 636-6699",
                website: "http://www.subway.com/en-us"
            };

            vm.paymentInfo = [
                {
                    code: "1234 4567 9874 5489",
                    amount: "2.75"
                },
                {
                    code: "1234 4567 9874 5489",
                    amount: "2.75"
                }
            ]
        };

        vm.placeOrder = function() {
            vm.currentStep++;
            $window.open(vm.orderInfo.website, '_blank');
        };

        vm.continueOrder = function() {
            if(vm.mealAmount.replace('$', '') > 0) {
                vm.currentStep++;
            }
        };

        vm.leaveOrders = function() {
            $state.go('dashboard');
        };

        vm.completeOrder = function () {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'order-complete.tpl.html'
            });
        };

        function DialogController($mdDialog, $state) {
            let vm = this;

            vm.hide = function () {
                $mdDialog.hide();
            };

            vm.leaveOrders = function() {
                $mdDialog.hide();
                $state.go('dashboard');
            };

            vm.getNextOrder = function() {
                $mdDialog.hide();
                location.reload();
            }
        }
    }
})();