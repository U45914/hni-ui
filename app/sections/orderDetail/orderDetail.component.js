(function() {
    angular
        .module('app')
        .component('orderDetail', {
            bindings: {

            },
            templateUrl: 'order-detail.tpl.html',
            controller: OrderDetailController,
            controllerAs: 'vm'
        });

    OrderDetailController.$inject = ['timeoutService'];

    function OrderDetailController(timeoutService) {
        let vm = this;

        vm.showPopup = timeoutService.showPopup;

        vm.$onInit = function() {
            vm.user = {
                name: "Veronica Bagwell",
                phone: "(479) 313-5606",
                email: "veronica.bagwell@walmart.com",
                organization: "7 Hills Homeless Center"
            };

            vm.orderInfo = {
                name: "Subway",
                foodItems: ["Turkey Sandwich", "Turkey Sandwich"],
                time: "12:30pm",
                address: "2301 W Walnut St",
                phone: "(479) 636-6699",
                website: "http://www.subway.com/en-us"
            }
        };
    }
})();